import Image from "next/image";

export enum TeamSide {
    Blue="blue",
    Red="red"
}

interface NavbarProps {
    title: string;
    minionCount:number;
    team:TeamSide;
}

export default function Navbar({title,minionCount,team}: NavbarProps){
    return(
        <>
            <div className="z-20 absolute w-[1469px] h-[80px] bg-[#A9B6FF] top-0 left-0 flex items-center justify-between px-6">
                <h1 className="text-[50px] font-bold">{title}</h1>
                            <button >
                                <Image src={team===TeamSide.Blue?"/blue_btn.PNG":"/red_btn.PNG"} alt="Minion Bar" width={150} height={60}></Image>
                            </button>
            </div>
        </>
    )
}