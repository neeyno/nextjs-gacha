//import styles from "../styles/Footer.module.css"

export default function TransactionModal({ state, close }) {
    const listItems =
        state.data.map((value, i) => {
            return (
                <div className="px-2 flex justify-center font-semibold text-xl" key={i}>
                    {value.toString()}
                </div>
            )
        }) || null

    return (
        <div className="absolute inset-0 bg-gray-400/[.5] flex p-1">
            <div className="mx-auto mt-56 mb-auto bg-gray-900 text-gray-100 w-[40rem] rounded-sm p-2 sm:w-[40rem] sm:p-4">
                <div className="px-2 flex items-center justify-between font-semibold text-xl ">
                    {state.status}
                </div>
                <div className="px-2 flex justify-center font-semibold text-xl ">{state.title}</div>
                {listItems && (
                    <div className="px-2 flex justify-center font-semibold text-xl">
                        {listItems}
                    </div>
                )}
                <div className="px-2 flex justify-center font-semibold text-xl ">
                    <button
                        className={`rounded-sm py-1 px-2  ease-in-out duration-150 ${
                            state.status === 3
                                ? "cursor-pointer bg-blue-800 hover:bg-blue-700"
                                : "bg-gray-500 text-gray-300"
                        }`}
                        onClick={() => close()}
                        disabled={state.status !== 3}
                    >
                        <span className="text-lg font-semibold sm:text-xl">Close</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
