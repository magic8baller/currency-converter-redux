import {css} from '@emotion/core';
import ThemeButton from 'styles/ThemeButton';
import React from 'react'
import {Icon} from 'antd';
// const toggleTheme = () => {
// return (
// 	<Switch checkedChildren={<Icon type="bulb" />}
// )
// }
const Main = ({children, setIsDark, isDark}) => (
	<div css={theme => css`
				padding: 20px;
				background-color: ${theme.background};
				color: ${theme.text};
				height: 100vh;
				transition-duration: 0.2s;
				transition-property: background-color, color;
			`}>
		<ThemeButton css={theme => css`
			border: 2px solid ${theme.buttonBorder};
			background-color: ${theme.buttonBg};
			color: ${theme.buttonText};
			:hover {
				background-color: ${theme.buttonBgHover};
				color: ${theme.buttonTextHover};
			}
		`} onClick={() => setIsDark()}>
			Change to {isDark ? <Icon type="bulb" /> : <Icon type="bulb" theme="filled" />} mode
		</ThemeButton>
		<div css={css`
			text-align: center;
		`}>
			{children}
		</div>
	</div>
)

export default Main