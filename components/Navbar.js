import React from "react"
import { useState } from "react"

import Link from "next/link"
import { ConnectButton } from "web3uikit"
import styles from "../styles/Navbar.module.css"

export default function Navbar() {
    const [menuOpen, SetMenuOpen] = useState(false)

    const closeMenu = () => {
        if (!menuOpen) {
            SetMenuOpen(menuOpen)
            //menuOpen = true
        } else {
            SetMenuOpen(!menuOpen)
            //menuOpen = false
        }
    }

    return (
        <header
            className={`max-w-6xl border-b border-gray-700 m-auto py-3 px-2 flex justify-between items-center flex-wrap ${
                styles.header
            } ${menuOpen ? `${styles.open}` : ""}`}
        >
            <div className="z-30">
                <h2 className="text-3xl text-gray-100 font-bold sm:px-4">
                    <a href="/" title="gacha">
                        NFT gacha
                    </a>
                </h2>
            </div>
            <nav>
                <ul
                    className={`z-20 menu hidden absolute left-0 top-0 m-0 py-20 pt-16 px-4 bg-[#0a0f18] w-full h-52 sm:w-unset sm:h-auto sm:bg-transparent sm:flex sm:py-0 sm:static sm:left-unset sm:top-unset ${
                        styles.menu
                    } ${menuOpen ? `${styles.open}` : ""}`}
                >
                    <li className="mb-5 mx-0 sm:my-auto sm:mx-5" title="info">
                        <Link href="/">
                            <div
                                className="text-1xs text-gray-100 font-semibold ease-in-out duration-150 hover:text-blue-400"
                                onClick={() => closeMenu()}
                            >
                                button?
                            </div>
                        </Link>
                    </li>

                    <li className="mb-0 mt-0 mx-0 sm:my-auto sm:mx-2" title="ConnectButton">
                        <ConnectButton moralisAuth={false} />
                    </li>
                </ul>
            </nav>
            <div
                className={`z-30 flex flex-col justify-center items-center sm:hidden ${
                    styles.hamburger
                } ${menuOpen ? `${styles.open}` : ""}`}
                onClick={() => SetMenuOpen(!menuOpen)}
            >
                <span className="h-0.5 w-7 mb-1.5 bg-gray-100"></span>
                <span className="h-0.5 w-7 mb-1.5 bg-gray-100"></span>
                <span className="h-0.5 w-7 mb-1.5 bg-gray-100"></span>
            </div>
        </header>
    )
}
