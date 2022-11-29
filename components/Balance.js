//import styles from "../styles/Footer.module.css"

import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { ethers } from "ethers"

import tokenAbi from "../lib/tokenAbi.json"
import TransactionModal from "./TransactionModal"

const defaultState = {
    status: 0,
    title: "default",
    data: [],
    type: 0,
}

export default function Balance({ tokenAddress, nftBalances, tokenBalance, runUpdateUI }) {
    const { error, runContractFunction, isLoading } = useWeb3Contract()
    const { isWeb3Enabled, account } = useMoralis()

    const [modalState, setModalState] = useState(defaultState)

    async function runMintTokenTo(address) {
        setModalState((prevObj) => {
            return {
                ...prevObj,
                status: 1,
                title: "Confirm transaction",
            }
        })
        const mintAmount = ethers.utils.parseUnits("40", 18)
        const mintParam = {
            abi: tokenAbi,
            contractAddress: tokenAddress,
            functionName: "mint",
            params: {
                to: address,
                amount: mintAmount,
            },
        }
        await runContractFunction({
            params: mintParam,
            onSuccess: handleMint,
            onError: (error) => {
                console.log(error)
                handleModalError(error)
            },
        })
    }

    async function handleMint(tx) {
        try {
            setModalState((prevObj) => {
                return {
                    ...prevObj,
                    status: 2,
                    title: `Receive confirmations`, //txEvent.args.requestId.toString(),
                }
            })
            const txReceipt = await tx.wait(1)
            console.log(txReceipt)
            await tx.wait(1)
            setModalState((prevObj) => {
                return {
                    ...prevObj,
                    status: 3,
                    title: `Success!`, //txEvent.args.requestId.toString(),
                }
            })
        } catch (error) {
            console.error(error)
            handleModalError(error)
        }
    }

    function resetModalOnClose() {
        setModalState((prevObj) => {
            return defaultState
        })
        runUpdateUI()
    }

    function handleModalError(error) {
        setModalState((prevObj) => {
            return {
                ...prevObj,
                status: 3,
                title: error.message,
            }
        })
    }

    const nftListElem =
        nftBalances.map((value, i) => {
            return (
                <div className="px-2 flex justify-center font-semibold text-xl" key={i}>
                    {value}
                </div>
            )
        }) || null

    return (
        <div className="w-screen flex items-center justify-center mt-8 px-1">
            <div className="bg-gray-900 text-gray-100 w-[40rem] rounded-2xl p-2 sm:w-[40rem] sm:p-4">
                <div className="px-2 flex items-center justify-between font-semibold text-xl ">
                    <h1>Balances</h1>
                    <button
                        className="bg-blue-800 rounded-xl py-1 px-4 cursor-pointer ease-in-out duration-150 hover:bg-blue-700"
                        onClick={() => runMintTokenTo(account)}
                        disabled={isLoading}
                    >
                        <span className="text-lg font-semibold sm:text-xl">Get free tokens</span>
                    </button>
                </div>
                {nftBalances && <div>{nftListElem}</div>}
                {tokenBalance && <div>{`${tokenBalance} EXT`}</div>}
            </div>
            {modalState.status !== 0 && (
                <TransactionModal state={modalState} close={resetModalOnClose} />
            )}
        </div>
    )
}
