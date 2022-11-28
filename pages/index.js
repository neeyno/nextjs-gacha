import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

import Pull from "../components/Pull"
import Balance from "../components/Balance"
import History from "../components/History"

export default function Home() {
    return (
        <div className="">
            <Navbar />
            <Balance />
            <Pull />
            <History />
            <Footer />
        </div>
    )
}
