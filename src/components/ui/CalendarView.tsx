interface CalendarViewProps {
    highlightDay: number;
}

export default function CalendarView({ highlightDay }: CalendarViewProps) {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    return (
        <div className="mt-6 border-t pt-4 border-dashed border-gray-300">
            <p className="font-bold uppercase text-xs mb-3 text-gray-500 tracking-widest">Tháng 10 - Năm 2025</p>
            <div className="grid grid-cols-7 gap-2 text-xs font-serif text-gray-600">
                <div>T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div>T7</div><div className="text-red-500">CN</div>
                {/* Placeholder cho ngày trống đầu tháng (Giả sử T10/2025 bắt đầu Thứ 4) */}
                <div></div><div></div><div></div>

                {days.map(d => (
                    <div key={d} className={`aspect-square flex items-center justify-center relative ${d === highlightDay ? 'text-white font-bold' : ''}`}>
                        {d === highlightDay && (
                            <div className="absolute inset-0 bg-[#8B1E29] rounded-full z-0 shadow-md"></div>
                        )}
                        <span className="z-10 relative">{d}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}