interface CodeHostProps {
    number_: string;
}
export default function CodeHost({number_}: CodeHostProps) {

    
    return(
        <>
            <div className="fixed left-[900px] top-[200px] w-[400px] h-[90px]" style={{ backgroundColor: "#B8B8B8" }}>
              <div className="absolute left-41 top-3.5 w-[220px] h-[60px] bg-white">
                <p className = "py-2 text-center text-5xl font-mono">{number_}</p>
              </div>
              <p className="absolute left-10 text-[50px] top-2 text-black font-jersey25">Code</p>
            </div>
        </>
    )
}