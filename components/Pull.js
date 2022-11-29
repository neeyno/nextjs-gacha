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

    return (
        <div className="w-screen flex items-center justify-center mt-2 px-1">
            <div className="bg-gray-900 text-gray-100 w-[40rem] rounded-2xl p-2 sm:w-[40rem] sm:p-4">
                <div className="px-2 flex items-center justify-between font-semibold text-xl ">
                    <h1>Pull Order</h1>
                    <button
                        className="bg-blue-800 rounded-xl py-1 px-4 cursor-pointer ease-in-out duration-150 hover:bg-blue-700"
                        onClick={() => console.log("Got info")}
                        disabled={isLoading}
                    >
                        <span className="text-lg font-semibold sm:text-xl">Info</span>
                    </button>
                </div>
                <div className="mb-2 mt-4 mx-auto">
                    <div className="grid grid-cols-2 gap-2 text-center text-base">
                        <label className="text-gray-300">x1 pull</label>
                        <label className="text-gray-300">x10 pull</label>
                        {/* <label>Withdraw</label> */}
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-2 text-center text-xl sm:text-2xl rounded-2xl border border-gray-700 ease-in-out duration-150 hover:border-gray-500">
                        {/* <span className="my-auto">name</span> */}
                        {/* <span className="my-auto  text-base sm:text-2xl">0</span> */}

                        <button
                            className="bg-blue-800 rounded-xl py-1 mx-2 cursor-pointer ease-in-out duration-150 hover:bg-blue-700"
                            onClick={() => runPullFunc("pullSingle")}
                            disabled={isLoading}
                        >
                            <span className="text-lg font-semibold sm:text-xl">x1</span>
                        </button>

                        <button
                            className="bg-blue-800 rounded-xl py-1 mx-2 cursor-pointer ease-in-out duration-150 hover:bg-blue-700"
                            onClick={() => runPullFunc("pullMulti")}
                            disabled={isLoading}
                        >
                            <span className="text-lg font-semibold sm:text-xl">x10</span>
                        </button>
                    </div>
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
