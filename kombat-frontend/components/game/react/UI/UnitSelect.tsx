import {Minion} from "../../type/gameStates";
import UnitCard from "./UnitCard";
import {c_Transform2, c_Vec2} from "../../utils/utility";
import useDeviceSize from "../../../CustomHook/useDeviceSize";

interface Props {
    deck: Minion[]
}

export default function UnitSelect({deck}: Props) {
    const scale= 0.13;

    return <div className="flex flex-col justify-evenly h-screen px-2">
        {
            Array.from({length: 5}, (_, i) => i).map((i) => {
                    if (deck[i]) return <UnitCard key={i} minion={deck[i]} transform={c_Transform2(c_Vec2(0,0), c_Vec2(scale,scale))}></UnitCard>
                }
            )
        }
    </div>
}