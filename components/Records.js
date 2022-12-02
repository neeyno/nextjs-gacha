//import styles from "../styles/Footer.module.css"

export default function Records({ events }) {
    const style = {
        wrapper: `w-screen flex items-center justify-center mt-16 px-1 `,
        box: `group bg-stone-900 border border-stone-700 text-stone-100 w-[40rem] rounded hover:border-stone-600 ease-in-out duration-150`,
        titleClass: `p-2 flex items-center justify-between font-semibold text-xl border-b border-stone-900 group-hover:border-stone-600 ease-in-out duration-150`,
        tokenBox: `rounded-sm px-2 bg-stone-900 outline-1 outline-stone-700 outline hover:bg-stone-100 hover:text-stone-900 cursor-pointer ease-in-out duration-150`,
        recordsClass: ``,
        element: `list-none rounded-sm outline-yellow-500 outline-1 hover:outline ease-in-out duration-150 delay-150`,
        title: `p-2 flex items-center justify-between text-base`,
    }

    //const recordsElem =

    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <div className={style.titleClass}>
                    <p>Order history</p>
                    <button
                        className={style.tokenBox}
                        onClick={() => console.log("Not implemented!!")}
                    >
                        <span className={""}>Refresh</span>
                    </button>
                </div>
                <div className={"p-2 divide-y divide-stone-800"}>
                    {events ? (
                        events.map((value, i) => {
                            return (
                                <li className={style.element} key={i}>
                                    <div className={style.title}>
                                        <span>{value.args.requestId.value.toString()}</span>
                                        <span>{value.event}</span>
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
        </div>
    )
}
