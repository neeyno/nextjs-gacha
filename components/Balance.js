//import styles from "../styles/Footer.module.css"

import { useWeb3Contract, useMoralis } from "react-moralis"

export default function Balance() {
    const { runContractFunction, isFetching, isLoading } = useWeb3Contract()
    return (
        <div className="w-screen flex items-center justify-center mt-8 px-1">
            <div className="bg-gray-900 text-gray-100 w-[40rem] rounded-2xl p-2 sm:w-[40rem] sm:p-4">
                <div className="px-2 flex items-center justify-between font-semibold text-xl ">
                    <h1>Balances</h1>
                    <button
                        className="bg-blue-800 rounded-xl py-1 px-4 cursor-pointer ease-in-out duration-150 hover:bg-blue-700"
                        onClick={() => console.log("Got free tokens")}
                        disabled={isLoading}
                    >
                        <span className="text-lg font-semibold sm:text-xl">Get free tokens</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
