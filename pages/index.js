import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import Pull from "../components/Pull"
import Balance from "../components/Balance"
import History from "../components/History"

import tokenAbi from "../lib/tokenAbi.json"
import nftAbi from "../lib/nftAbi.json"
import contractAddresses from "../lib/contractAddresses.json"

import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { ethers } from "ethers"

export default function Home() {
    const { error, runContractFunction } = useWeb3Contract()
    const { isWeb3Enabled, chainId: chainIdHex, web3, account } = useMoralis()
    const chainId = parseInt(chainIdHex).toString() || "31337"

    const tokenAddress =
        chainId in contractAddresses ? contractAddresses[chainId]["ExoticToken"][0] : null
    const nftAddress =
        chainId in contractAddresses ? contractAddresses[chainId]["ExoticNFT"][0] : null
    const gachaAddress =
        chainId in contractAddresses ? contractAddresses[chainId]["Gachapon"][0] : null

    const [nftBalances, setNftBalances] = useState([])
    const [tokenBalance, setTokenBalance] = useState("0")

    async function getTokenBalanceOf(address) {
        const txResponse = await runContractFunction({
            params: {
                abi: tokenAbi,
                contractAddress: tokenAddress,
                functionName: "balanceOf",
                params: {
                    account: address,
                },
            },
            onSuccess: (res) => console.log(`token balance ${res.toString()}`),
            onError: (error) => {
                console.log(error)
            },
        })
        return txResponse
    }

    async function getNftBalancesOf(address) {
        const addrArray = [...Array(3)].map((_) => address)
        const idArray = [...Array(3)].map((_, i) => i)
        const txResponse = await runContractFunction({
            params: {
                abi: nftAbi,
                contractAddress: nftAddress,
                functionName: "balanceOfBatch",
                params: {
                    accounts: addrArray,
                    ids: idArray,
                },
            },
            onSuccess: (res) => console.log(`nft balance ${res}`),
            onError: (error) => {
                console.log(error)
            },
        })
        return txResponse
    }

    async function updateTokenBalance(address) {
        const tokenBalance = await getTokenBalanceOf(address)
        if (!tokenBalance) return
        setTokenBalance((prev) => {
            const formatedBalance = ethers.utils.formatUnits(tokenBalance, 18)
            return formatedBalance
        })
    }

    async function updateNftBalances(address) {
        const nftBalances = await getNftBalancesOf(address)
        if (!nftBalances) return
        setNftBalances((prev) => {
            const formatedBalances = nftBalances.map((value) => value.toString())
            return formatedBalances
        })
    }

    function updateUI() {
        updateNftBalances(gachaAddress)
        updateTokenBalance(account)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateNftBalances(gachaAddress)
            updateTokenBalance(account)
        }
    }, [isWeb3Enabled, account])

    return (
        <div className="">
            <Navbar />
            <Balance
                tokenAddress={tokenAddress}
                nftBalances={nftBalances}
                tokenBalance={tokenBalance}
                runUpdateUI={updateUI}
            />
            <Pull gachaAddress={gachaAddress} runUpdateUI={updateUI} />
            <History />
            <Footer />
        </div>
    )
}
