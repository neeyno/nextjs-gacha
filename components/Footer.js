import styles from "../styles/Footer.module.css"

import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import Link from "next/link"
import contractAddresses from "../lib/contractAddresses.json"
//import { networkConfigs } from "web3uikit"
import networkConfig from "../lib/networkConfig.json"
import { WalletModal } from "web3uikit"

export default function Footer() {
    const { isWeb3Enabled, chainId: chainIdHex, web3, Moralis } = useMoralis()
    const chainId = parseInt(chainIdHex).toString() || "0"

    const [walletModal, setWalletModal] = useState(false)

    useEffect(() => {
        if (isWeb3Enabled) {
            setWalletModal(false)
        }
    }, [isWeb3Enabled])

    const btnElement = isWeb3Enabled ? (
        <button
            className="p-1 outline outline-1 outline-stone-600 rounded ease-in-out duration-150 hover:outline-stone-500 hover:text-stone-100"
            onClick={() => addNetwork("web3")}
        >
            Add Network
        </button>
    ) : (
        <button
            className="p-1 outline outline-1 outline-stone-600 rounded ease-in-out duration-150 hover:outline-stone-500 hover:text-stone-100"
            onClick={() => {
                // if (typeof window == "undefined") return
                // if (typeof window.ethereum == "undefined" && provider == "metamask") {
                //     return alert("Please install web3 wallet first")
                // }
                setWalletModal(true)
            }}
        >
            Connect Wallet
        </button>
    )

    const gachaAddress =
        chainId in contractAddresses ? contractAddresses[chainId]["Gachapon"][0] : null

    const networkElement = gachaAddress ? networkConfig[chainId].chainName : btnElement
    //gachaAddress && chainId !== "31337" ? networkConfigs[chainIdHex].chainName : btnElement

    async function addNetwork(type) {
        //if(isWeb3Enabled)
        // let eth = "undefined"
        // if (type === "web3") {
        //     if (typeof window.ethereum !== "undefined") {
        //         eth = web3
        //     }
        // }
        if (typeof web3 !== "undefined") {
            let params

            //if (isTestnet == "false") {
            // if (chainId == "137") {
            //     alert("Polygon Network has already been added to Metamask.")
            //     return
            // } else {
            //     params = [
            //         {
            //             chainId: "0x89",
            //             chainName: "Polygon Mainnet",
            //             nativeCurrency: {
            //                 name: "MATIC",
            //                 symbol: "MATIC",
            //                 decimals: 18,
            //             },
            //             rpcUrls: ["https://polygon-rpc.com/"],
            //             blockExplorerUrls: ["https://polygonscan.com/"],
            //         },
            //     ]
            // }
            //} else {
            if (chainId == "80001") {
                alert("Polygon Mumbai Network has already been added to Metamask.")
                return
            } else {
                params = [
                    {
                        chainId: "0x13881",
                        chainName: "Mumbai",
                        nativeCurrency: {
                            name: "MATIC",
                            symbol: "MATIC",
                            decimals: 18,
                        },
                        rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                    },
                ]
            }
            //}

            window.ethereum
                .request({ method: "wallet_addEthereumChain", params })
                .then(() => console.log("Success"))
                .catch((error) => console.log("Error", error.message))
        } else {
            alert("Unable to locate a compatible web3 browser!")
        }
    }

    return (
        <footer className={`fixed h-12 bottom-0 w-screen ${styles.footer}`}>
            <div className="py-1 px-2 h-full border-t border-stone-700 flex justify-between items-center max-w-6xl m-auto flex-row">
                <ul className="flex justify-center items-center gap-4">
                    <li className="text-stone-400 text-sm" title="Swap">
                        <Link href="/">
                            <a className="font-semibold ease-in-out duration-150 hover:text-stone-100">
                                NFT
                            </a>
                        </Link>
                    </li>

                    <li className="text-stone-400 text-sm" title="Pool">
                        <Link href="/history">
                            <a className="font-semibold ease-in-out duration-150 hover:text-stone-100">
                                History
                            </a>
                        </Link>
                    </li>

                    <li className="text-stone-400 text-sm" title="Pool">
                        <Link href="/info">
                            <a className="font-semibold ease-in-out duration-150 hover:text-stone-100">
                                Info
                            </a>
                        </Link>
                    </li>

                    {/* <li className="flex text-gray-400 text-sm" title="Info">
                        <button
                            className="my-auto ease-in-out duration-150 hover:text-white"
                            onClick={() => setShowInfo(true)}
                        >
                            <span>info</span>
                        </button>
                    </li> */}
                </ul>
                <div>
                    <div title="Network" className="flex">
                        <div className="my-auto mx-2">
                            <div
                                className={`p-1 rounded ${
                                    gachaAddress ? "bg-green-500" : "bg-red-500"
                                }`}
                            ></div>
                        </div>
                        <div className="my-auto text-stone-400 font-initial text-sm ">
                            {networkElement}
                        </div>
                    </div>
                </div>
            </div>
            <WalletModal isOpened={walletModal} setIsOpened={() => setWalletModal(false)} />
        </footer>
    )
}
