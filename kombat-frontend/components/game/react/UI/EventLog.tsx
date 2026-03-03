import {useState} from "react";

interface Props {
    hidden: boolean
}


export default function EventLog() {
    const [hidden, setHidden] = useState(true);

    return <div>
        <button
            className="absolute top-0 left-5/6 translate-y-6/12
                    w-48 h-12
                    flex justify-center items-center
                    text-gray-700 text-3xl
                    bg-gray-400
                "
            onClick={() => setHidden(false)}
        >
            {">>"} Event Log
        </button>

        {(!hidden && <div className="absolute top-0 right-0 h-screen w-96
                            flex flex-col
                            bg-black"
        >
            <div
                className="top-0 left-0
                                w-full h-16
                                flex justify-start items-center
                                text-gray-700 text-3xl
                                bg-gray-400
                            "
                onClick={() => setHidden(true)}
            >
                <span className="px-8">{"<<"} Event Log</span>
            </div>
            <ul className="list-none pl-6 h-full
                        flex flex-col justify-end
                      text-white">
                <li>sample line</li>
                <li>sample line</li>
                <li>sample line</li>
                <li>sample line</li>
                <li>sample line</li>
                <li>sample line</li>
            </ul>
        </div>)}
    </div>
}