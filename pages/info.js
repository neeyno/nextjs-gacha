//import { useState, useEffect } from "react"
//import { useWeb3Contract, useMoralis } from "react-moralis"
//import { ethers } from "ethers"

//import contractAddresses from "../lib/contractAddresses.json"

export default function Info() {
    // const { error, runContractFunction } = useWeb3Contract()
    // const { isWeb3Enabled, chainId: chainIdHex, web3, account } = useMoralis()
    // const chainId = parseInt(chainIdHex).toString() || "31337"

    // const tokenAddress =
    //     chainId in contractAddresses ? contractAddresses[chainId]["ExoticToken"][0] : null
    // const nftAddress =
    //     chainId in contractAddresses ? contractAddresses[chainId]["ExoticNFT"][0] : null
    // const gachaAddress =
    //     chainId in contractAddresses ? contractAddresses[chainId]["Gachapon"][0] : null

    return (
        <div>
            <div className="text-stone-100">{"No info..."}</div>
        </div>
    )
}
