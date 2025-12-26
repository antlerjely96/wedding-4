interface DateBoxProps {
    day: number;
    month: number;
    year: number;
    weekday: string;
    time: string;
}

export default function DateBox({ day, month, year, weekday, time }: DateBoxProps) {
    return (
        <div className="flex justify-center items-center gap-4 mb-6 py-4">
            <div className="text-right border-r pr-6 border-gray-300 min-w-[90px]">
                <p className="font-bold text-gray-800 text-xl">{time}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Giờ</p>
            </div>

            <div className="text-center px-4">
                <p className="text-6xl font-serif font-bold text-[#8B1E29] leading-none mb-1">{day}</p>
                <p className="uppercase text-xs tracking-[0.2em] text-gray-500">Tháng {month}</p>
            </div>

            <div className="text-left border-l pl-6 border-gray-300 min-w-[90px]">
                <p className="font-bold text-gray-800 text-xl">{year}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{weekday}</p>
            </div>
        </div>
    );
}