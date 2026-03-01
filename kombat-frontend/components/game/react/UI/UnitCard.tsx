import {Minion} from "../../type/gameStates";
import SpriteView from "../Renderer/SpriteView";
import {Vec2} from "../../type/Primitive";
import {Sprite, Transform2} from "../../type/Rendering";
import {c_Sprite, c_Transform2, c_Transform2Empty, c_Vec2} from "../../utils/utility";
import {card_BG_T, card_FG_T} from "../../resources/textureResource";
import SpriteViewRelative from "../Renderer/SpriteViewRelative";

interface Props {
    minion: Minion
    transform: Transform2
}


export default function UnitCard({minion, transform}: Props)
{
    const spriteDownScaleFactor = 0.8;
    const foreGroundOffsetConstX = 80;
    const foreGroundOffsetConstY = 80;

    const foregroundTexture = card_FG_T;
    const backgroundTexture = card_BG_T;

    const pos = transform.pos;
    const scale = transform.scale;

    const cardSize = c_Vec2(
        backgroundTexture.size.x * scale.x,
        backgroundTexture.size.y * scale.y);


    const foreGroundOffset = c_Vec2(
        foreGroundOffsetConstX * scale.y,
        (backgroundTexture.size.y - foregroundTexture.size.y - foreGroundOffsetConstY) * scale.y
    )

    const cardForeground :Sprite = c_Sprite(
        foregroundTexture,
        c_Transform2(
            foreGroundOffset,
            c_Vec2(scale.x,scale.y)
        )
    )

    const cardBackground :Sprite = c_Sprite(
        backgroundTexture,
        c_Transform2(
            c_Vec2(0,0),
            c_Vec2(scale.x,scale.y)
        )
    )

    const cardSpriteScale =  backgroundTexture.size.y * scale.y / minion.sprite.texture.size.y * spriteDownScaleFactor;

    const spriteSize = c_Vec2(
        cardSpriteScale * minion.sprite.texture.size.x,
        cardSpriteScale * minion.sprite.texture.size.y,
    )

    const spriteOffset = c_Vec2(
        (cardSize.x - spriteSize.x) / 2,
        (cardSize.y - spriteSize.y) / 2
    )

    const cardSprite: Sprite = c_Sprite(
        minion.sprite.texture,
        c_Transform2(
            spriteOffset,
            c_Vec2(cardSpriteScale,cardSpriteScale)
        )
    )

    return <div style={{
        position: "relative",
        width: cardSize.x,
        height: cardSize.y,
    }}>
        <SpriteViewRelative sprite={cardBackground}></SpriteViewRelative>
        <SpriteViewRelative sprite={cardSprite}></SpriteViewRelative>
        <SpriteViewRelative sprite={cardForeground}></SpriteViewRelative>
    </div>
}