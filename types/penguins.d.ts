import { Species } from './species';
export declare enum PenguinZIndex {
    Normal = 0,
    Explosion = 10,
    Miner = 20,
    Flier = 30
}
export declare function createDefaultSpecies(assetsPath: string, amount?: number): Species;
