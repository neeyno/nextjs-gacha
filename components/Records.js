import TransactionModal from "./TransactionModal"
import { useState } from "react"

const defaultState = {
    status: 0,
    title: "default",
    data: [],
    message: "",
}

export default function Records({ events, refresh }) {
    const [modalState, setModalState] = useState(defaultState)

    const style = {
        wrapper: `w-screen flex items-center justify-center mt-16 px-1 `,
        box: `group bg-stone-900 border border-stone-700 text-stone-100 w-[40rem] rounded hover:border-stone-600 ease-in-out duration-150`,
        titleClass: `p-2 flex items-center justify-between font-semibold text-xl border-b border-stone-900 group-hover:border-stone-600 ease-in-out duration-150`,
        tokenBox: `rounded-sm px-2 bg-stone-900 outline-1 outline-stone-700 outline hover:bg-stone-100 hover:text-stone-900 cursor-pointer ease-in-out duration-150`,
        recordsClass: ``,
        element: `cursor-pointer list-none rounded-sm outline-yellow-500 outline-1 hover:outline ease-in-out duration-150 delay-50`,
        title: `p-2 grid grid-cols-3 flex items-center justify-between text-sm`,
    }

    //const recordsElem =
    //console.log(events)

    function openEventModal(eventId) {
        if (!events) return
        const eventById = events[eventId]
        const eventProps = {
            status: 5,
            title: eventById.event,
            data: eventById.args.nftId.value,
            message: "",
        }
        setModalState(eventProps)
    }

    function resetModalOnClose() {
        setModalState((prevObj) => {
            return defaultState
        })
        // update UI
        //runUpdateUI()
    }

    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <div className={style.titleClass}>
                    <p>Pull history</p>
                    <button className={style.tokenBox} onClick={refresh}>
                        <span className={""}>Refresh</span>
                    </button>
                </div>
                <div className={"p-2 divide-y divide-stone-800"}>
                    {events ? (
                        events.map((value, i) => {
                            return (
                                <li
                                    className={style.element}
                                    key={i}
                                    onClick={() => openEventModal(i)}
                                >
                                    <div className={style.title}>
                                        <span>{value.event}</span>
                                        <span className="col-span-2 pl-4 text-xs text-ellipsis overflow-hidden">
                                            {value.args.requestId.value.toString()}
                                        </span>
                                    </div>
                                    {/* <div>{value.args.nftId.value.toString()}</div> */}
                                    {/* <div>{value.transactionHash}</div> */}
                                </li>
                            )
                        })
                    ) : (
                        <li className="flex items-center justify-center" key={0}>
                            No records
                        </li>
                    )}
                </div>
            </div>

            {modalState.status !== 0 && (
                <TransactionModal state={modalState} close={resetModalOnClose} />
            )}
        </div>
    )
}
