interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
    return (
        <input
            {...props}
            className="w-full p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B1E29] focus:border-transparent bg-gray-50 text-gray-800 placeholder:text-gray-400"
        />
    );
}