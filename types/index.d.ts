import 'web-animations-js/web-animations.min.js';
import { Species } from './species';
import { SpecimenType } from './types';
export * from './step-builders';
export { CustomSpecimenType } from './custom-specimen-type';
export { Species } from './species';
export { SpecimenType };
export { createDefaultSpecies, PenguinZIndex } from './penguins';
export interface WebPenguinsOptions {
    baseZIndex?: number;
    customPenguinTypes?: SpecimenType[];
    obstacles?: HTMLElement[];
    root?: HTMLElement;
    species: Species[];
}
export declare class WebPenguins {
    private readonly cleanup;
    private penguins;
    private readonly baseZIndex;
    private readonly species;
    private readonly obstacles;
    private readonly root;
    constructor({ baseZIndex, obstacles, root, species }: WebPenguinsOptions);
    start(): void;
    stop(): void;
    private getBCRs;
    private keypressListener;
    private resizeListener;
}
