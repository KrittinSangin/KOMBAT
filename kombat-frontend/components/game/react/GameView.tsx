import SpriteView from "./SpriteView";
import {Transform2} from "../type/Transform";
import Image from "next/image"
import HexMapView from "./HexMapView";
import {Game} from "../model/Game";

export default function GameView(game:Game) {
    const bg = "/game-bg.png";
    return (
        <div>
            <div style={{
                left: 0,
                top: 0,
                width: "100vw",
                height: "100vh",
            }} >
            <Image
                src={bg}
                width={1000}
                height={1000}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%"
                }} alt={""}/>

                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "grey",
                    mixBlendMode: "multiply",
                    pointerEvents: "none",
                }}>

                </div>
            </div>
            {HexMapView(game.map)}
        </div>

    )
}