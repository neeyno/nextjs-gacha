//import styles from "../styles/Footer.module.css"

export default function TransactionModal({ state, reset }) {
    return (
        <div className="w-screen flex items-center justify-center mt-2 px-1">
            <div className="bg-gray-900 text-gray-100 w-[40rem] rounded-2xl p-2 sm:w-[40rem] sm:p-4">
                {state.status} - Modal - {state.title}
                <button
                    className="bg-blue-800 rounded-xl py-1 mx-2 cursor-pointer ease-in-out duration-150 hover:bg-blue-700"
                    onClick={() => reset()}
                >
                    <span className="text-lg font-semibold sm:text-xl">close</span>
                </button>
            </div>
        </div>
    )
}
