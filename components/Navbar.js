import React from "react"
import { useState } from "react"
import { useRouter } from "next/router"

import Link from "next/link"
import { ConnectButton } from "web3uikit"
import styles from "../styles/Navbar.module.css"

export default function Navbar() {
    const router = useRouter()

    const [menuOpen, SetMenuOpen] = useState(false)
    //const [activeTab, setActiveTab] = useState("")

    // router.pathname == "/"

    const closeMenu = () => {
        if (!menuOpen) {
            SetMenuOpen(menuOpen)
            //menuOpen = true
        } else {
            SetMenuOpen(!menuOpen)
            //menuOpen = false
        }
    }

    const active = "rounded outline outline-1 outline-stone-600"
    const notActive = "delay-50 rounded hover:outline outline-1 outline-stone-100"

    return (
        <header
            className={`max-w-6xl border-b border-stone-600 m-auto py-2 px-2 flex justify-between items-center flex-wrap ${
                styles.header
            } ${menuOpen ? `${styles.open}` : ""}`}
        >
            <div className="z-30" title="NFT gacha">
                <Link href="/">
                    <a
                        className={`tracking-widest text-xl font-bold my-auto px-3 py-1 ease-in-out duration-150 text-stone-100 ${
                            router.asPath == "/" ? active : notActive
                        }`}
                        onClick={() => {
                            if (router.asPath == "/") router.reload("/")
                            closeMenu()
                        }}
                    >
                        NFT gacha
                    </a>
                </Link>
            </div>
            <nav>
                <ul
                    className={`z-20 menu hidden absolute left-0 top-0 m-0 py-20 pt-16 px-4 bg-stone-900/[.95] w-full h-56 sm:w-unset sm:h-auto sm:bg-transparent sm:flex sm:py-0 sm:static sm:left-unset sm:top-unset ${
                        styles.menu
                    } ${menuOpen ? `${styles.open}` : ""}`}
                >
                    <li className="text-center w-24 mb-5 mx-0 sm:my-auto sm:mx-5" title="history">
                        <Link href="/history">
                            <a
                                className={`text-base py-1 px-2 font-semibold ease-in-out duration-150 text-stone-100 ${
                                    router.asPath == "/history" ? active : notActive
                                }`}
                                onClick={() => closeMenu()}
                            >
                                History
                            </a>
                        </Link>
                    </li>
                    <li className=" text-center w-16 mb-5 mx-0 sm:my-auto sm:mx-5" title="info">
                        <Link href="/info">
                            <a
                                className={`text-base py-1 px-2 font-semibold ease-in-out duration-150 text-stone-100 ${
                                    router.asPath == "/info" ? active : notActive
                                }`}
                                onClick={() => closeMenu()}
                            >
                                Info
                            </a>
                        </Link>
                    </li>

                    <li className="mb-0 mt-0 mx-0 sm:my-auto sm:mx-2" title="ConnectButton">
                        <ConnectButton moralisAuth={false} />
                    </li>
                </ul>
            </nav>
            <div
                className={`z-30 my-auto flex flex-col justify-center items-center sm:hidden ${
                    styles.hamburger
                } ${menuOpen ? `${styles.open}` : ""}`}
                onClick={() => SetMenuOpen(!menuOpen)}
            >
                <span className="h-0.5 w-7 mb-1.5 bg-stone-100"></span>
                <span className="h-0.5 w-7 mb-1.5 bg-stone-100"></span>
                <span className="h-0.5 w-7 mb-1 bg-stone-100"></span>
            </div>
        </header>
    )
}
