require('dotenv/config');
const app = require('./src/server');
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Server listening: http://${host}:${port}`)
});