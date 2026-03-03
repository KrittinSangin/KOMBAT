export default function GameInfoBar() {
    return <nav>
        {/*turn triangle*/}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 ">
            <div
                className="bg-white w-32 h-32 drop-shadow-2xl
                        flex flex-col items-center"
            >
                <span className="font-bold text-3xl">Turn</span>
                <span className="font-bold text-3xl">xx/xx</span>
            </div>
        </div>

        {/*budget*/}
        <div
            className=" absolute top-0 left-1/2 -translate-x-48 - translate-y-10
                    h-10 w-24 flex flex-col justify-center items-center drop-shadow-2xl
                    bg-yellow-300
                    text-2xl"
        >
            1000$
        </div>

        {/*give up button*/}
        <div
            className=" absolute top-0 left-1/2 translate-x-24 translate-y-10 rounded-md
                    h-10 w-28 flex flex-col justify-center items-center drop-shadow-2xl
                    bg-red-800 text-white
                    text-2xl"
        >
            Surrender
        </div>
    </nav>
}