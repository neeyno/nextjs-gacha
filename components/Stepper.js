export default function Stepper({ status }) {
    const steps = ["Confirm transaction", "Receive confirmation", "Transaction completed"]

    function assignStatus(i) {
        if (i + 1 == status) return "active"
        if (i + 1 < status) return "completed"
        return "default"
    }

    const style = {
        default: "outline outline-stone-700",
        active: "outline outline-stone-100",
        completed: "bg-stone-100  text-stone-900",
    }

    const line = {
        default: "border-stone-700",
        active: "border-stone-100",
        completed: "border-stone-100",
    }

    return (
        <div className="pt-2 flex justify-between text-xs">
            {steps.map((val, i) => (
                <div
                    key={i}
                    className="relative w-full flex flex-col justify-center items-center text-center"
                >
                    <div
                        className={`w-5 h-5 flex justify-center items-center text-center z-10 relative bg-stone-900 outline-1 rounded-full ${
                            style[assignStatus(i)]
                        }`}
                    >
                        {i + 1}
                    </div>
                    <span
                        className={`translate-x-2/4 absolute w-full top-2 border ${
                            line[assignStatus(i + 1)]
                        } ${i == 2 ? "hidden" : ""}`}
                    ></span>
                    <p className="pt-1">{val}</p>
                </div>
            ))}
        </div>
    )
}
