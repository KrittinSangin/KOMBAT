import SpriteView from "./SpriteView";
import Image from "next/image"
import HexMapView from "./HexMapView";
import {Game} from "../type/gameStates";

export default function GameView(game:Game) {
    const bg = "/game-bg.png";

    const background = () => {
        return <div style={{
            left: 0,
            top: 0,
            width: "100vw",
            height: "100vh",
        }} >
            <Image
                src={bg}
                fill
                alt={""}/>

            <div style={{
                width: "100%",
                height: "100%",
                backgroundColor: "grey",
                mixBlendMode: "multiply",
                pointerEvents: "none",
            }}>

            </div>
        </div>
    }

    return (
        <div>
            {background()}
            {HexMapView(game.map)}
        </div>

    )
}