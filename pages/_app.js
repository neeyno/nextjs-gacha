import "../styles/globals.css"
import Head from "next/head"
import { MoralisProvider } from "react-moralis"
//import { NotificationProvider } from "web3uikit"

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Decentralized NFT gacha App</title>
                <meta name="description" content="Decentralized NFT gacha App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <Component {...pageProps} />
            </MoralisProvider>
        </>
    )
}

export default MyApp
