type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    variant?: "primary" | "secondary" | "danger"
    disabled?: boolean
    className?: string
}

export default function GenericButton({
    children,
    onClick,
    variant = "primary",
    disabled = false,
    className = ""
}: ButtonProps) {

    const base =
        "px-4 py-2 rounded-xl font-medium transition active:scale-95"

    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600"
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]} ${className} ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
            {children}
        </button>
    )
}