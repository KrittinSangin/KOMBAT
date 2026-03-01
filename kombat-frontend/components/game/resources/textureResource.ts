import {Texture} from "../type/Rendering";
import {Vec2} from "../type/Primitive";
import {c_Texture, c_Vec2} from "../utils/utility";

const madoka_T = c_Texture("/game/texture/minion/Madoka.png",c_Vec2(190,320))
const medicine_T = c_Texture("/game/texture/minion/Medicine.png",c_Vec2(240,320))
const knight_T = c_Texture("/game/texture/minion/Knight.png",c_Vec2(1398,1362))
const scarlet_T = c_Texture("/game/texture/minion/Scarlet.png",c_Vec2(260,410))
const ryuu_T = c_Texture("/game/texture/minion/Ryuu-chan.png",c_Vec2(340,460))

const gamHexN_T = c_Texture("/game/texture/hex/Gam-Hex.png",c_Vec2(3210,2090))
const gamHexB_T = c_Texture("/game/texture/hex/Gam-Hex-blue.png",c_Vec2(3330,2010))
const gamHexR_T = c_Texture("/game/texture/hex/Gam-Hex-red.png",c_Vec2(3250,1950))

const card_BG_T = c_Texture("/game/texture/ui/Card-background.png",c_Vec2(735,895))
const card_FG_T = c_Texture("/game/texture/ui/Card-foreground.png",c_Vec2(600,225))

export {madoka_T,medicine_T,knight_T,scarlet_T,ryuu_T,
    gamHexN_T,gamHexB_T,gamHexR_T,
    card_BG_T, card_FG_T
}