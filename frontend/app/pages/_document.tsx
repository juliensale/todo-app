import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core'

class MyDocument extends Document {
	// static async getInitialProps(ctx: any) {
	// 	const sheets = new ServerStyleSheets();
	// 	const originalRenderPage = ctx.renderPage;

	// 	ctx.renderPage = () =>
	// 		originalRenderPage({
	// 			enhanceApp: (App: any) => (props: any) => sheets.collect(<App {...props} />)
	// 		});

	// 	const initialProps = await Document.getInitialProps(ctx);

	// 	return {
	// 		...initialProps,
	// 		// Styles fragment is rendered after the app and page rendering finish.
	// 		styles: [
	// 			...React.Children.toArray(initialProps.styles),
	// 			sheets.getStyleElement()
	// 		]
	// 	};
	// }

	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="stylesheet" href="/fonts/fonts.css" />

					<link rel="preload" as="font" href="/fonts/catamaran-v8-latin-300.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/catamaran-v8-latin-500.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/catamaran-v8-latin-600.woff2" crossOrigin="anonymous" />

					<link rel="preload" as="font" href="/fonts/oxygen-v10-latin-300.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/oxygen-v10-latin-regular.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/oxygen-v10-latin-700.woff2" crossOrigin="anonymous" />

					<link rel="preload" as="font" href="/fonts/montserrat-v18-latin-600.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/montserrat-v18-latin-700.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/montserrat-v18-latin-800.woff2" crossOrigin="anonymous" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument