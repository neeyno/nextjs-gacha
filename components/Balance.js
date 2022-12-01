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
    const { isWeb3Enabled, account, Moralis } = useMoralis()

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
            msgValue: ethers.utils.parseUnits("0.01", 18),
        }
        await runContractFunction({
            params: mintParam,
            onSuccess: handleMint,
            onError: (error) => {
                if (!isWeb3Enabled) {
                    Moralis.enableWeb3()
                }
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
                    title: `Success!`,
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
                <li className="flex items-center justify-center" key={i}>
                    {value}
                </li>
            )
        }) || null

    const imgArray = ["nft-0.png", "nft-1.png", "nft-2.png"]
    const nftImgElem = imgArray.map((value, i) => {
        return (
            <li
                className="mx-auto h-20 w-20 border border-stone-700 rounded-full overflow-clip"
                key={i}
            >
                <img id="img" src={`./images/${value}`} height="100" width="100" />
            </li>
        )
    })

    const style = {
        wrapper: `w-screen flex items-center justify-center mt-16 px-1`,
        box: `group bg-stone-900 border border-stone-700 text-stone-100 w-[40rem] rounded hover:border-stone-600 ease-in-out duration-150`,
        titleClass: `p-2 flex items-center justify-between font-semibold text-xl border-b border-stone-900 group-hover:border-stone-600 ease-in-out duration-150`,
        tokenBox: `bg-stone-100 rounded-sm outline-1 outline-stone-100 outline`,
        tokenBalance: `px-2 py-1 text-stone-900`,
        tokenButton: `bg-stone-900 text-stone-100 rounded-sm px-2 cursor-pointer ease-in-out duration-150 hover:bg-yellow-500`,
        nftClass: `p-2 text-center  font-semibold text-xl`,
        nftImages: `pt-4 mb-2 grid grid-cols-3 gap-0 items-center justify-center`,
        nftBalances: `pb-2 grid grid-cols-3 gap-0 text-sm`,
    }

    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <div className={style.titleClass}>
                    <h1>Balance</h1>
                    <div className={style.tokenBox}>
                        <span className={style.tokenBalance}>{`${tokenBalance} EXT`}</span>
                        <button
                            className={style.tokenButton}
                            onClick={() => runMintTokenTo(account)}
                            disabled={isLoading}
                        >
                            <span className="text-lg font-semibold sm:text-xl">{"+"}</span>
                        </button>
                    </div>
                </div>
                <div className={style.nftClass}>
                    <h1>NFT avaliable</h1>
                    <ul className={style.nftImages}>{nftImgElem}</ul>
                    {nftBalances && <ul className={style.nftBalances}>{nftListElem}</ul>}
                </div>
            </div>
            {modalState.status !== 0 && (
                <TransactionModal state={modalState} close={resetModalOnClose} />
            )}
        </div>
    )
}
