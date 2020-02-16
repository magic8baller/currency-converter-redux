export const SET_IS_DARK = 'SET_IS_DARK';
export const SET_THEME = 'SET_THEME';

export const setTheme = theme => dispatch => {
	dispatch({type: SET_THEME, payload: theme})
}

export const setIsDark = () => dispatch => {
	dispatch({type: SET_IS_DARK})
}

const initialState = {
	isDark: window.matchMedia("(prefers-color-scheme: dark)").matches
}

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_IS_DARK:
			return {...state, isDark: !state.isDark}
		default:
			return state
	}
}