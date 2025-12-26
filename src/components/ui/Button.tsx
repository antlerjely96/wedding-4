interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
    const baseStyle = "w-full font-bold py-3 rounded transition duration-200 shadow-sm";
    const variants = {
        primary: "bg-[#8B1E29] border border-white/30 text-white hover:bg-[#a8323e]",
        secondary: "bg-[#ff4d4f] text-white hover:bg-[#ff7875]"
    };

    return (
        <button {...props} className={`${baseStyle} ${variants[variant]} ${className || ''}`}>
            {children}
        </button>
    );
}