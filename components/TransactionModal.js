//import styles from "../styles/Footer.module.css"

import Stepper from "./Stepper"

export default function TransactionModal({ state, close }) {
    const listItems =
        state.data.map((value, i) => {
            return (
                <li
                    className="mx-auto my-2 h-10 w-10 border border-stone-700 rounded-full overflow-clip"
                    key={i}
                >
                    <img id="img" src={`./images/nft-${value}.png`} height="50" width="50" />
                </li>
            )
        }) || null

    const style = {
        wrapper: `absolute inset-0 bg-stone-600/[.5] flex p-1`,
        modalClass: `group mx-auto mt-52 mb-auto bg-stone-900 text-stone-100 w-full rounded sm:w-[40rem] border border-stone-700 hover:border-stone-600 ease-in-out duration-150`,
        box: ` bg-stone-900 border border-stone-700 text-stone-100 rounded `,
        titleClass: `p-2 flex items-center justify-between font-semibold text-xl border-b border-stone-900 group-hover:border-stone-600 ease-in-out duration-150`,
    }

    return (
        <div className={style.wrapper}>
            <div className={style.modalClass}>
                <div className={style.titleClass}>
                    <p>{state.title}</p>
                </div>

                {state.status != 5 && (
                    <div className="p-2">
                        <Stepper status={state.status} />
                    </div>
                )}
                {/* <div className="p-2 flex justify-center ">{state.status} Loading...</div> */}
                {state.data && (
                    <ul className="list-none p-2 grid grid-cols-5 sm:flex">{listItems}</ul>
                )}
                <div className="p-2 justify-center text-center">
                    <p
                        id={state.status === 5 ? "error" : ""}
                        className="font-medium tracking-wider text-base text-ellipsis overflow-hidden "
                    >
                        {state.message}
                    </p>
                </div>
                <div className="p-2 my-2 flex justify-center font-semibold text-xl  ">
                    <button
                        className={`rounded  py-1 px-4 border border-stone-600  ${
                            state.status < 4
                                ? "bg-stone-700 text-stone-400"
                                : "text-stone-900 bg-stone-100 cursor-pointer ease-in-out duration-150 hover:bg-yellow-500"
                        }`}
                        onClick={() => close()}
                        disabled={state.status < 4}
                    >
                        <span className="text-lg font-semibold sm:text-xl">Close</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
