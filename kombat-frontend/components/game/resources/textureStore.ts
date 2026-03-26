import {Texture} from "../type/Rendering";
import {knight_T, madoka_T, medicine_T, ryuu_T, scarlet_T} from "./textureResource";

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
    ])[textureName]
}