import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core'

class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const sheets = new ServerStyleSheets();
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () =>
			originalRenderPage({
				enhanceApp: (App: any) => (props: any) => sheets.collect(<App {...props} />)
			});

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			// Styles fragment is rendered after the app and page rendering finish.
			styles: [
				...React.Children.toArray(initialProps.styles),
				sheets.getStyleElement()
			]
		};
	}

	render() {
		return (
			<Html>
				<Head>

					<link rel="preload" as="font" href="/fonts/catamaran-v8-latin-300.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/catamaran-v8-latin-500.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/catamaran-v8-latin-600.woff2" crossOrigin="anonymous" />

					<link rel="preload" as="font" href="/fonts/oxygen-v10-latin-300.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/oxygen-v10-latin-regular.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/oxygen-v10-latin-700.woff2" crossOrigin="anonymous" />

					<link rel="preload" as="font" href="/fonts/montserrat-v18-latin-600.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/montserrat-v18-latin-700.woff2" crossOrigin="anonymous" />
					<link rel="preload" as="font" href="/fonts/montserrat-v18-latin-800.woff2" crossOrigin="anonymous" />

					<link rel="manifest" href="/PWA/manifest.json" />
					<link rel="apple-touch-icon" sizes="57x57" href="/PWA/apple-icon-57x57.png" />
					<link rel="apple-touch-icon" sizes="60x60" href="/PWA/apple-icon-60x60.png" />
					<link rel="apple-touch-icon" sizes="72x72" href="/PWA/apple-icon-72x72.png" />
					<link rel="apple-touch-icon" sizes="76x76" href="/PWA/apple-icon-76x76.png" />
					<link rel="apple-touch-icon" sizes="114x114" href="/PWA/apple-icon-114x114.png" />
					<link rel="apple-touch-icon" sizes="120x120" href="/PWA/apple-icon-120x120.png" />
					<link rel="apple-touch-icon" sizes="144x144" href="/PWA/apple-icon-144x144.png" />
					<link rel="apple-touch-icon" sizes="152x152" href="/PWA/apple-icon-152x152.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/PWA/apple-icon-180x180.png" />
					<link rel="icon" type="image/png" sizes="192x192" href="/PWA/android-icon-192x192.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/PWA/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="96x96" href="/PWA/favicon-96x96.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/PWA/favicon-16x16.png" />
					<link rel="icon" href="/PWA/favicon.ico" />
					<meta name="msapplication-TileImage" content="/PWA/ms-icon-144x144.png" />
					<meta name="theme-color" content="#fff" />
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