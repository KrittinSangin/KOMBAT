import {Texture} from "../type/Rendering";
import {archer_gif, knight_T, madoka_T, mage_gif, medicine_T, ryuu_T, scarlet_T, warrior_gif} from "./textureResource";

function createTextureMap(entries: [string, Texture][]) {
    const map: Record<string, Texture> = {};

    for (const [key, texture] of entries) {
        map[key] = texture;
    }

    return map;
}

export const textureStore = (textureName:string) => {
    return createTextureMap([
        ["Madoka", madoka_T],
        ["Medicine", medicine_T],
        ["Knight", knight_T],
        ["Scarlet", scarlet_T],
        ["Ryuu-chan", ryuu_T],
        ["Warrior", warrior_gif],
        ["Mage", mage_gif],
        ["Archer", archer_gif],
    ])[textureName]
}