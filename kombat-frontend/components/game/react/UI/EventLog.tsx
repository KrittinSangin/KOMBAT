


export default function EventLog() {



    return <div className="absolute top-0 right-0 h-screen w-96
                flex flex-col
                bg-black"
    >
        <div
            className="top-0 left-0
                    w-full h-16
                    flex justify-start items-center
                    text-gray-700 text-3xl
                    bg-gray-400
                ">
            <span className="px-8">{"<<"} Event Log</span>
        </div>
        <ul className="list-none pl-6 text-white">
            <li>sample line</li>
            <li>sample line</li>
            <li>sample line</li>
            <li>sample line</li>
            <li>sample line</li>
            <li>sample line</li>
            <li>sample line</li>
            <li>sample line</li>
            <li>sample line</li>
        </ul>
    </div>
}