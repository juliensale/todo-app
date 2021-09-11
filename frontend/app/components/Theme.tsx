import { ThemeOptions } from "@material-ui/core"

const getTheme: (darkMode: boolean) => ThemeOptions = (darkMode: boolean) => ({
	palette: {
		type: darkMode ? 'dark' : 'light',
		primary: {
			light: '#A7C5EA',
			main: '#2C87F3',
			dark: '#00234B',
			contrastText: '#fff'
		},
		background: {
			default: darkMode ? '#131A22' : "#fff",
			paper: darkMode ? '#131A22' : "#fff"
		}
	},
	typography: {
		fontFamily: [
			'Catamaran',
			'sans-serif'
		].join(','),
		h1: {
			fontFamily: 'Montserrat, Verdana',
			fontWeight: 700,
			fontSize: '2.3em',

		},
		h2: {
			fontFamily: 'Montserrat, Verdana',
			fontWeight: 600,
			fontSize: '2.0em',
		},
		h3: {
			fontFamily: 'Montserrat, Verdana',
			fontWeight: 500,
			fontSize: '1.7em',
		},
		h4: {
			fontFamily: 'Oxygen,sans-serif',
			fontWeight: 700,
			fontSize: '1.5em',
		},
		h5: {
			fontFamily: 'Oxygen, sans-serif',
			fontSize: '1.2em',
		},
		h6: {
			fontFamily: 'Oxygen, sans-serif',
			fontWeight: 300,
			fontSize: '1em',
		},
		subtitle1: {
			fontFamily: 'Catamaran,sans-serif',
			fontSize: '1.2em',

		},
		subtitle2: {
			fontFamily: 'Catamaran, sans-serif',
			fontSize: '1.0em',
		},
		body1: {
			fontFamily: 'Catamaran, sans-serif',
			fontSize: '1.2em',
		},
		body2: {
			fontFamily: 'Catamaran, sans-serif',
			fontSize: '1.0em',
		},
		caption: {
			fontFamily: 'Catamaran, sans-serif',
			fontSize: '0.8em',
		},
		overline: {
			fontFamily: 'Catamaran, sans-serif',
		}
	},
	// shadows: [
	// 	"none",
	// 	'0px 3px 10px 1px rgba(0,0,0, 0.06)',
	// 	"0px 3px 10px 1px rgba(0,0,0,.1)",
	// 	"0px 3px 10px 1px rgba(0,0,0,.15)",
	// 	"0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
	// 	"0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
	// 	"0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
	// 	"0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
	// 	"0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
	// 	"0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
	// 	"0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
	// 	"0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
	// 	"0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
	// 	"0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
	// 	"0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
	// 	"0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
	// 	"0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
	// 	"0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
	// 	"0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
	// 	"0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
	// 	"0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
	// 	"0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
	// 	"0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
	// 	"0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
	// 	"0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"
	// ]
})

export { getTheme }