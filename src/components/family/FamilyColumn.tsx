interface FamilyColumnProps {
    side: "Nhà Gái" | "Nhà Trai";
    father: string;
    mother: string;
    addressLines: string[];
    align?: "left" | "right";
}

export default function FamilyColumn({ side, father, mother, addressLines, align = "left" }: FamilyColumnProps) {
    const alignClass = align === "right" ? "md:text-right" : "md:text-left";
    return (
        <div className={`text-center ${alignClass} space-y-2`}>
            <h3 className="font-script text-4xl text-[#8B1E29] mb-4">{side}</h3>
            <div className="font-serif text-gray-800">
                <p className="font-bold text-lg">Ông: {father}</p>
                <p className="font-bold text-lg">Bà: {mother}</p>
                <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {addressLines.map((line, index) => <p key={index}>{line}</p>)}
                </div>
            </div>
        </div>
    );
}