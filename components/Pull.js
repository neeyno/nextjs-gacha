import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
//import { useNotification } from "web3uikit"
import { ethers } from "ethers"

import gachaAbi from "../lib/gachaAbi.json"
import TransactionModal from "./TransactionModal"

const defaultState = {
    status: 0,
    title: "default",
    data: [],
    type: 0,
}

export default function Pull({ gachaAddress, runUpdateUI }) {
    const { error, runContractFunction, isFetching, isLoading } = useWeb3Contract()
    const { isWeb3Enabled, web3 } = useMoralis()
    const [modalState, setModalState] = useState(defaultState)

    async function runPullFunc(pullType) {
        setModalState((prevObj) => {
            return {
                ...prevObj,
                status: 1,
                title: "Confirm transaction",
            }
        })
        const pullParam = {
            abi: gachaAbi,
            contractAddress: gachaAddress,
            functionName: pullType,
            params: {},
        }
        await runContractFunction({
            params: pullParam,
            onSuccess: handlePullRequest,
            onError: (error) => {
                console.log(error)
                handleModalError(error)
            },
        })
    }

    async function handlePullRequest(tx) {
        try {
            const txReceipt = await tx.wait(1)
            const txEvent = txReceipt.events.find((element) => element.event === "PullRequested")
            console.log(txReceipt)
            // update modal
            setModalState((prevObj) => {
                return {
                    ...prevObj,
                    status: 2,
                    title: `Receive request confirmation`, //txEvent.args.requestId.toString(),
                }
            })
            handlePullFulfill(txEvent)
        } catch (error) {
            console.error(error)
            handleModalError(error)
        }
    }

    async function handlePullFulfill(txEvent) {
        const pullResult = async () =>
            await new Promise(async (resolve, reject) => {
                const contract = new ethers.Contract(gachaAddress, gachaAbi, web3)
                const filter = contract.filters.PullFulfilled(txEvent.args.requestId)

                contract.once(filter, async (requestId, owner, nftId) => {
                    //console.log([requestId.toString(), owner, nftId.toString()])
                    resolve([requestId, owner, nftId])
                })
                setTimeout(() => reject(new Error(`Request confirmation is timed out!`)), 180000)
            })
        pullResult()
            .then((result) => {
                console.log(result)
                setModalState((prevObj) => {
                    return {
                        ...prevObj,
                        status: 3,
                        title: "Randomness fulfilled!",
                        data: result[2],
                    }
                })
            })
            .catch((error) => {
                console.error(error)
                handleModalError(error)
            })
    }

    function resetModalOnClose() {
        setModalState((prevObj) => {
            return defaultState
        })
        // update UI
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

    useEffect(() => {
        if (isWeb3Enabled) {
            //updateUI
        }
    }, [isWeb3Enabled])

    const style = {
        wrapper: `w-screen flex items-center justify-center mt-4 px-1 `,
        box: `group bg-stone-900 border border-stone-700 text-stone-100 w-[40rem] rounded hover:border-stone-600 ease-in-out duration-150`,
        titleClass: `p-2 flex items-center justify-between font-semibold text-xl border-b border-stone-900 group-hover:border-stone-600 ease-in-out duration-150`,
        buttonClass: `p-4 grid grid-cols-2 gap-4 text-center mx-auto `,
        button: `text-stone-100 rounded-sm py-3 cursor-pointer ease-in-out duration-150 border border-stone-700 group-hover:border-stone-600 hover:bg-yellow-500`,
    }

    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <div className={style.titleClass}>
                    <p>Pull Order</p>
                    <p>1 pull costs 50 EXT</p>
                </div>
                <div className={style.buttonClass}>
                    <button
                        className={style.button}
                        onClick={() => runPullFunc("pullSingle")}
                        disabled={isLoading}
                    >
                        <span className="text-lg font-semibold sm:text-xl">x 1</span>
                    </button>

                    <button
                        className={style.button}
                        onClick={() => runPullFunc("pullMulti")}
                        disabled={isLoading}
                    >
                        <span className="text-lg font-semibold sm:text-xl">x 10</span>
                    </button>
                </div>
            </div>

            {modalState.status !== 0 && (
                <TransactionModal state={modalState} close={resetModalOnClose} />
            )}
        </div>
    )
}

//const provider = new ethers.providers.JsonRpcProvider()
// const contract = new ethers.Contract(gachaAddress, gachaAbi, web3)
// const filter = contract.filters.PullFulfilled(txEvent.args.requestId)

// const pullResult = async () =>
//     await new Promise(async (resolve, reject) => {
//         //try {
//         contract.once(filter, async (requestId, owner, nftId) => {
//             //console.log([requestId.toString(), owner, nftId.toString()])

//             resolve([requestId, owner, nftId])
//         })
//         setTimeout(
//             () =>
//                 reject(new Error(`Request ${txEvent.args.requestId.toString()} timed out`)),
//             180000
//         )
//         // } catch (error) {
//         //     //console.log(error)
//         //     reject(error)
//         // }
//     })

// pullResult()
//     .then((value) => console.log(value))
//     .catch((error) => console.error(error))

//const dispacth = useNotification()
//const { isWeb3Enabled, chainId: chainIdHex, account, Moralis, web3 } = useMoralis()
// const provider = window.localStorage.getItem("provider")
//const provider = new ethers.providers.JsonRpcProvider()
