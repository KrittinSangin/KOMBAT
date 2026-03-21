import {Vec2} from "../../type/Primitive";
import {Hex, Minion} from "../../type/GameTypes";
import {Texture} from "../../type/Rendering";
import {c_Transform2, c_Vec2} from "../../utils/utility";
import {gamHexB_T, gamHexN_T, gamHexR_T} from "../../resources/textureResource";
import SpriteView from "../Renderer/SpriteView";
import MinionView from "./MinionView";
import {useState} from "react";
import {red} from "next/dist/lib/picocolors";
import {useIntent} from "../../model/useIntent";

interface Props {
    idx: number
    pos: Vec2,
    hex?: Hex
}

export default function HexView({
                                    idx,
                                    pos,
                                    hex
                                }: Props) {
    const [hover, setHover] = useState(false)
    const {setHex, submitIntent} = useIntent();
    const SIZE = 100;
    const MINION_SIZE = 50;

    //no hex, return empty
    if (!hex) return <></>

    //Hex Texture
    let texture: Texture;
    if (hex.team != null)
        texture = hex.team == 0 ? gamHexB_T : gamHexR_T
    else
        texture = gamHexN_T;

    //Hex Sprite
    const hexSprite = {
        texture: texture,
        color: hover ? "red" : "transparent",
    }

    //Hex Transform
    const size = hexSprite.texture.size;
    const factor = SIZE / size.x;
    const hexTransform = c_Transform2(
        c_Vec2(0, 0),
        c_Vec2(factor, factor)
    )

    //Minion Transform
    const minionTransform = (minion: Minion) => {
        const size = minion.sprite.texture.size;
        const sizeHex = hexSprite.texture.size;

        const m_factor = MINION_SIZE / size.x;
        const m_offsetX = (sizeHex.x * factor - size.x * m_factor) / 2;
        const m_offsetY = (size.y * m_factor - sizeHex.y * factor / 2) * -1;
        const t = c_Transform2(
            c_Vec2(m_offsetX, m_offsetY),
            c_Vec2(m_factor, m_factor)
        );

        return t;
    }

    const handleIntent = () => {
        setHex(hex.hexPos);
        submitIntent();
    }

    return <div style={{
        position: "absolute",
        top: pos.y,
        left: pos.x,
        zIndex: 10,
    }}>
        <div style={{
            position: "absolute",
            backgroundColor: "red",
        }}
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}
             onClick={() => handleIntent()}
        >
            <SpriteView sprite={hexSprite} transform={hexTransform}/>
        </div>

        <div style={{ pointerEvents:"none"}}>
            {hex.minion && <MinionView minion={hex.minion} transform={minionTransform(hex.minion)}/>}
        </div>

        {/*debug*/}
        {/*<Marker pos={c_Vec2(0,0)} scale={0.1} color={"red"}></Marker>*/}
        {/*<RectView rect={hexRect} c={"lightblue"}/>*/}
        {/*{hex.minion && <RectView rect={} c={"green"}/>}*/}
        {/*{hex.minion && <MinionView minion = {hex.minion} pos = {{x: 0, y: 0}}/>}*/}
    </div>
}