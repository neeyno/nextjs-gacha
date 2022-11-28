import styles from "../styles/Footer.module.css"

export default function Footer() {
    return (
        <footer className={`fixed h-9 bottom-0 w-screen ${styles.footer}`}>
            <div className="py-4 border-b border-b-gray-800 flex justify-between items-center max-w-6xl m-auto">
                <p className="text-gray-300">text from footer</p>
            </div>
        </footer>
    )
}
