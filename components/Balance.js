//import styles from "../styles/Footer.module.css"

import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { ethers } from "ethers"

import gachaAbi from "../lib/gachaAbi.json"
import TransactionModal from "./TransactionModal"

const defaultState = {
    status: 0,
    title: "default",
    data: [],
    message: "",
}

const style = {
    wrapper: `w-screen flex items-center justify-center mt-16 px-1`,
    box: `group bg-stone-900 border border-stone-700 text-stone-100 w-[40rem] rounded hover:border-stone-600 ease-in-out duration-150`,
    titleClass: `p-2 flex items-center justify-between font-semibold text-xl border-b border-stone-900 group-hover:border-stone-600 ease-in-out duration-150`,
    tokenBox: `bg-stone-100 rounded-sm outline-1 outline-stone-100 outline`,
    tokenBalance: `px-2 py-auto text-stone-900 text-base`,
    tokenButton: `bg-stone-900 text-stone-100 rounded-sm px-2 cursor-pointer ease-in-out duration-150 hover:bg-yellow-500 hover:text-stone-900`,
    nftClass: `p-2 text-center  font-semibold text-xl`,
    nftImages: `pt-4 mb-2 grid grid-cols-3 gap-0 items-center justify-center`,
    nftBalances: `pb-2 grid grid-cols-4 gap-0 text-sm font-normal`,
}

function showNftBalance(balances) {
    const items =
        balances.map((value, i) => {
            return value > 0 ? (
                <li
                    className="relative mt-1 mx-auto rounded-sm  border-stone-800 overflow-clip"
                    key={i}
                >
                    <img
                        className="p-1"
                        src={`./images/items/item-${i}.png`}
                        height="70"
                        width="70"
                    />
                    <p className=" absolute bottom-0 right-0">{value}</p>
                </li>
            ) : null
        }) || null
    return items
    // return (
    //     <li
    //         className="mx-auto h-20 w-20 border border-stone-700 rounded-full overflow-clip"
    //         key={1}
    //     >
    //         <img id="img" src={`./images/${0}`} height="100" width="100" />
    //     </li>
    // )
}

export default function Balance({
    gachaAddress,
    nftBalances,
    tokenBalance,
    runUpdateUI,
    isConnected,
}) {
    const { runContractFunction, isLoading } = useWeb3Contract()
    const { isWeb3Enabled, account, Moralis } = useMoralis()

    const [modalState, setModalState] = useState(defaultState)

    async function runBuyToken(addressTo) {
        if (!isWeb3Enabled) {
            return handleModalError(new Error(`Please Connect Wallet!`))
        }
        if (!isConnected()) {
            return handleModalError(
                new Error(
                    `Network not supported!\nPlease,change network to the: Mumbai, Goerli, Polygon mainnet`
                )
            )
        }

        setModalState((prevObj) => {
            return {
                ...prevObj,
                status: 1,
                title: "Confirm transaction",
                message: "Confirm buying 1421 EXT token pack",
            }
        })
        //const mintAmount = ethers.utils.parseUnits("1150", 18)
        const mintParam = {
            abi: gachaAbi,
            contractAddress: gachaAddress,
            functionName: "buyTokenPack",
            params: {},
            // to: addressTo,
            // amount: mintAmount,
            //},
            msgValue: ethers.utils.parseUnits("0.01", 18),
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
        setModalState((prevObj) => {
            return {
                ...prevObj,
                status: 3,
                title: `Receive confirmations`, //txEvent.args.requestId.toString(),
            }
        })
        try {
            const txReceipt = await tx.wait(1)
            console.log(txReceipt)
            await tx.wait(1)
            setModalState((prevObj) => {
                return {
                    ...prevObj,
                    status: 4,
                    title: `Success`,
                    message: `You've bought 1421 EXT!`,
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
                status: 5,
                title: "Error",
                message: error.message,
            }
        })
    }

    // const nftListElem =
    //     nftBalances.map((value, i) => {
    //         return (
    //             <li className="flex items-center justify-center" key={i}>
    //                 {value}
    //             </li>
    //         )
    //     }) || null

    // const imgArray = ["nft-0.png", "nft-1.png", "nft-2.png"]
    // const nftImgElem = imgArray.map((value, i) => {
    //     return (
    //         <li
    //             className="mx-auto h-20 w-20 border border-stone-700 rounded-full overflow-clip"
    //             key={i}
    //         >
    //             <img id="img" src={`./images/${value}`} height="100" width="100" />
    //         </li>
    //     )
    // })

    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <div className={style.titleClass}>
                    <h1>Balance</h1>
                    <div className={style.tokenBox}>
                        <span className={style.tokenBalance}>{`${tokenBalance} EXT`}</span>
                        <button
                            className={style.tokenButton}
                            onClick={() => runBuyToken(account)}
                            disabled={isLoading}
                        >
                            <span className="text-lg sm:text-xl">{"BUY"}</span>
                        </button>
                    </div>
                </div>
                <div className={style.nftClass}>
                    <h1 className="tracking-wider">Your NFT</h1>
                    {/* <ul className={style.nftImages}>{nftImgElem}</ul> */}
                    {nftBalances && (
                        <ul className={style.nftBalances}>{showNftBalance(nftBalances)}</ul>
                    )}
                </div>
            </div>
            {modalState.status !== 0 && (
                <TransactionModal state={modalState} close={resetModalOnClose} />
            )}
        </div>
    )
}
