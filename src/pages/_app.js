import * as T from "prop-types"
import "@/styles/index.css"

function AppRoot({ Component, pageProps }) {
	return <Component {...pageProps} />
}

AppRoot.propTypes = {
	Component: T.node.isRequired,
	pageProps: T.objectOf(T.any),
}

export default AppRoot
