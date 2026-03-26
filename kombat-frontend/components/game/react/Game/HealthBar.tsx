import {c_Sprite, c_Transform2, c_Vec2} from "../../utils/utility";
import SpriteView from "../Renderer/SpriteView";
import FillGauge from "../Renderer/FillGauge";
import {heart_T} from "../../resources/textureResource";

interface Props {
    hp: number
    hpMax: number
    team: number
}

export default function HealthBar({hp, hpMax, team}: Props) {
    const TEAM_COLOR = ["red", "blue"]
    const offset = c_Vec2(10, -50);
    const width = 80;

    const heartScaleFactor = 0.35;
    const heartOffset = c_Vec2(-12,-8);

    return <div className="flex justify-center text-white text-xs"
                style={{
                    position: "absolute",
                    top: offset.y,
                    left: offset.x,
                    width: width,
                }}
    >
        {/*<SpriteView sprite={}>*/}
        <FillGauge dim={c_Vec2(width, 16)} percent={hp / hpMax} bgColor="black" fillColor={TEAM_COLOR[team]}>
            <SpriteView sprite={c_Sprite(heart_T)} transform={c_Transform2(heartOffset,c_Vec2(heartScaleFactor,heartScaleFactor))}></SpriteView>
            <div className="flex justify-center z-1">
                {hp}/{hpMax}
            </div>
        </FillGauge>
        {/*</SpriteView>*/}
    </div>
}