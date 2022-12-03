import "../styles/globals.css"
import Head from "next/head"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { MoralisProvider } from "react-moralis"
//import { NotificationProvider } from "web3uikit"

function MyApp({ Component, pageProps }) {
    return (
        <>
            <MoralisProvider initializeOnMount={false}>
                <Head>
                    <title>Decentralized NFT gacha App</title>
                    <meta name="description" content="Decentralized NFT gacha App" />
                    <link rel="icon" href="./nft-icon.png" />
                    {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap"
                        rel="stylesheet"
                    /> */}
                </Head>
                <Navbar />
                <Component {...pageProps} />
                <Footer />
            </MoralisProvider>
        </>
    )
}

export default MyApp
