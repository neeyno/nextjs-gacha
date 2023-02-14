const style = {
    wrapper: `w-screen flex items-center justify-center mt-16 px-1 `,
    box: `group bg-stone-900 border border-stone-700 text-stone-100 w-[40rem] rounded hover:border-stone-600 ease-in-out duration-150`,
    titleClass: `p-2 flex items-center justify-between font-semibold text-xl border-b border-stone-900 group-hover:border-stone-600 ease-in-out duration-150`,
    textContainer: ` p-2 divide-y divide-stone-800 text-stone-100 `,
    //tokenBox: `rounded-sm px-2 bg-stone-900 outline-1 outline-stone-700 outline hover:bg-stone-100 hover:text-stone-900 cursor-pointer ease-in-out duration-150`,
    nftBalances: `pb-2 grid grid-cols-4 gap-0 text-sm font-normal`,
    element: `cursor-pointer list-none rounded-sm outline-yellow-500 outline-1 hover:outline ease-in-out duration-150 delay-50`,
    title: `p-2 grid grid-cols-3 flex items-center justify-between text-sm`,
}

export default function GameInfo({ events, refresh }) {
    const items = [...Array(12)].map((_, i) => i)
    return (
        <div className={style.wrapper}>
            <div className={style.box}>
                <div className={style.titleClass}>
                    <p>Information</p>
                </div>
                <div className={style.textContainer + " "}>
                    <h1 className="font-bold">Description</h1>
                    <span className="text-sm">
                        {`   The NFT game is built on ERC-1155, Chainlink VRF, and "gacha"-mechanics.
                    It features many collectible NFT items that can be obtained only through making "pulls". To make a pull, the player has to spend some in-game tokens
                    to get a random NFT. These NFTs are only available for a limited time and have
                    tiers of rarity based on chance, with some appearing less frequently than
                    others.`}
                    </span>
                </div>
                <div className={style.textContainer + " "}>
                    Base probability of getting{" "}
                    <span className=" text-yellow-500 ">Legendary NFT (gold)</span> = 1 %
                </div>
                <div className={style.textContainer}>
                    Base probability of getting{" "}
                    <span className=" text-purple-500">Epic NFT (purple)</span> = 10 %
                </div>

                <div className={style.textContainer + " "}>
                    <h1>List of available NFTs</h1>
                    <div>
                        <ul className={style.nftBalances}>
                            {items.map((i) => {
                                return (
                                    <li
                                        className="relative mt-1 mx-auto rounded-sm  border-stone-800 overflow-clip"
                                        key={i}
                                    >
                                        <img
                                            className="p-1"
                                            src={`./images/items/item-${i}.png`}
                                            height="50"
                                            width="50"
                                        />
                                        <p className="text-stone-200 absolute bottom-0 right-0">{`id ${i}`}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
