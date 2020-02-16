import {css, jsx} from '@emotion/core';
import ThemeButton from 'styles/ThemeButton';
import React from 'react'

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
			Change to {isDark ? "light" : "dark"} mode
		</ThemeButton>
		<div css={css`
			text-align: center;
		`}>
			{children}
		</div>
	</div>
)

export default Main