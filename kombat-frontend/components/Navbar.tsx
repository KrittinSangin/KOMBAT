

interface NavbarProps {
    title: string;
}

export default function Navbar({title}: NavbarProps){
    return(
        <>
            <div className="z-0 w-[1500px] h-[80px] bg-[#A9B6FF] absolute top-[-418px] left-[-760px]">
                <h1 className="text-[50px] font-bold pl-15 pt-2">{title}</h1>
            </div>
        </>
    )
}