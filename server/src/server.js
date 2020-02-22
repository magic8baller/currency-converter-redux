require('dotenv/config');
const express = require('express');
const path = require('path');
const axios = require('axios');
const redis = require('redis');
const app = express();
const fs = require('fs');
// const bluebird = require("bluebird");
const morgan = require('morgan');
const winston = require('winston');

// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

const {REDIS_HOST, REDIS_PORT, REDIS_AUTH} = process.env
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
const logger = winston.createLogger({
	levels: winston.config.syslog.levels,
	transports: [
		new winston.transports.Console({level: 'error'}),
		new winston.transports.File({
			filename: 'combined.log',
			level: 'info'
		})
	]
});
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, X-Requested-With")
	next()
})

app.get('/', (req, res) => {
	res.status(200).json({message: 'api connected'})
})
const client = redis.createClient({
	port: REDIS_PORT,
	host: REDIS_HOST
});
client.auth(REDIS_AUTH, (err) => {
	if (err) throw err;
})
client.on('connect', () => {
	console.log(`connected to redis`);
});
client.on('error', err => {
	console.log(`Error: ${err}`);
});
let formattedDate = new Date().toISOString()

app.get('/rates', (req, res) => {

	client.exists('timestamp', (error, reply) => {
		if (reply === 1) {
			let timeNow = Date.now()
			client.get('timestamp', (error, object) => {
				if (timeNow - new Date(object).getTime() > 3600000) {
					logger.log('info', 'Expired data: refreshing now', {timestamp: formattedDate})
					axios.get(`https://openexchangerates.org/api/latest.json?app_id=${process.env.APP_ID}&show_alternative=1`)
						.then(result => {
							client.hmset('currentRates', result.data.rates)
							client.set('timestamp', formattedDate)
							res.send(result.data.rates)
							logger.log('info', 'Refreshed data success', `** Current time: ${formattedDate}`)

						})
				} else {
					logger.log('info', `Logs up to date. ** Last refresh: ${object} ** Current time: ${formattedDate}`)
					client.hgetall('currentRates', (error, object) => {
						res.send(object)
						logger.log('info', 'Current log unchanged', {timestamp: formattedDate})

					})
				}
			})
		} else {
			logger.log('info', 'No current logs', {timestamp: formattedDate})
			axios.get(`https://openexchangerates.org/api/latest.json?app_id=${process.env.APP_ID}&show_alternative=1`)
				.then(result => {
					client.set('timestamp', formattedDate)
					client.hmset('currentRates', result.data.rates)
					res.send(result.data.rates)
					logger.log('info', 'Fetched and filled empty log', {timestamp: formattedDate})

				})
		}
	})
})

app.get('/rates/:date', (req, res) => {
	const {date} = req.params;
	const url = `https://openexchangerates.org/api/historical/${date}.json?app_id=${process.env.APP_ID}&show_alternative=true&prettyprint=false`;
	const countKey = `USD:${date}:count`;
	const ratesKey = `USD:${date}:rates`;
	client.incr(countKey, (err, count) => {
		client.hgetall(ratesKey, (err, rates) => {
			if (rates) {
				return res.json({rates, count});
			}
			axios.get(url).then(response => {
				client.hmset(ratesKey, response.data.rates);
				res.send({count, rates: response.data.rates})
			})
		})
	})
})

module.exports = app;