

interface NavbarProps {
    title: string;
}

export default function Navbar({title}: NavbarProps){
    return(
        <>
            <div className="z-10 absolute w-[1469px] h-[80px] bg-[#A9B6FF] top-[0px] left-[0px]">
                <h1 className="text-[50px] font-bold pl-15 pt-2">{title}</h1>
            </div>
        </>
    )
}