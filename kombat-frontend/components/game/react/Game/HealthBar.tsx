import {c_Vec2} from "../../utils/utility";

interface Props{
    hp:number
    hpMax:number
    team:number
}

export default function HealthBar({hp,hpMax,team}:Props)
{
    const TEAM_COLOR = ["red","blue"]
    const offset = c_Vec2(10,-50);

    return <div
                style={{
                    position:"absolute",
                    top:offset.y,
                    left:offset.x,
                    width:100,
                    backgroundColor:TEAM_COLOR[team]
                }}
    >
        {hp}/{hpMax} ({team})
    </div>
}