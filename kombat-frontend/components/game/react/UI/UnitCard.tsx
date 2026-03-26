import {Minion} from "../../type/GameTypes";
import SpriteView from "../Renderer/SpriteView";
import {Sprite, Transform2} from "../../type/Rendering";
import {c_Sprite, c_Transform2, c_Vec2} from "../../utils/utility";
import {card_BG_T, card_FG_T} from "../../resources/textureResource";
import {useState} from "react";
import {useIntent} from "../../model/useIntent";
import {PlayerIntentEnum} from "../../../../ttypes/enums";

interface Props {
    minion: Minion
    index: number
    transform: Transform2
}


export default function UnitCard({minion, index, transform}: Props) {
    const [hover, setHover] = useState(false)
    const {intent, setMinion, setIntent} = useIntent();

    //Data
    const minionName = minion.name;
    const minionDef = minion.def;

    //View
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

    const cardForeground: Sprite = c_Sprite(foregroundTexture)

    const cardForgroundTransform = c_Transform2(
        foreGroundOffset,
        c_Vec2(scale.x, scale.y)
    )

    const cardBackground: Sprite = c_Sprite(backgroundTexture)

    const cardBackgroundTransform = c_Transform2(
        c_Vec2(0, 0),
        c_Vec2(scale.x, scale.y)
    )

    const cardSpriteScale = backgroundTexture.size.y * scale.y / minion.sprite.texture.size.y * spriteDownScaleFactor;

    const spriteSize = c_Vec2(
        cardSpriteScale * minion.sprite.texture.size.x,
        cardSpriteScale * minion.sprite.texture.size.y,
    )

    const spriteOffset = c_Vec2(
        (cardSize.x - spriteSize.x) / 2,
        (cardSize.y - spriteSize.y) / 2
    )

    const cardSprite: Sprite = c_Sprite(minion.sprite.texture)

    const cardSpriteTransform = c_Transform2(
        spriteOffset,
        c_Vec2(cardSpriteScale, cardSpriteScale)
    )

    return <div style={{
        position: "relative",
        width: cardSize.x,
        height: cardSize.y,
        color: "red"
    }}
                onMouseEnter={() => {
                    setHover(true)
                }}
                onMouseLeave={() => {
                    setHover(false);
                }}
                onClick={() => {
                    console.log(`selected ${minion.name}`);
                    setMinion(index);
                    setIntent(PlayerIntentEnum.buyMinion);
                }}
    >
        <SpriteView sprite={cardBackground} transform={cardBackgroundTransform}></SpriteView>
        <SpriteView sprite={cardSprite} transform={cardSpriteTransform}></SpriteView>
        <SpriteView sprite={cardForeground} transform={cardForgroundTransform}></SpriteView>
        <div
            className="absolute flex flex-col justify-center-safe translate-x-3 translate-y-19
                        text-white text-xs">
            <span> {minionName} </span>
            <span> {minionDef} </span>

        </div>
    </div>
}