import SpriteView from "./SpriteView";
import {Transform2} from "../type/Transform";
import {GameDTO} from "../../../ttypes/type";
import HexMapView from "./HexMapView";

export default function GameView(game:GameDTO)
{
    return(
        <HexMapView></HexMapView>
    )
}