import { RoBCRs } from './types';
import { Species } from './species';
export declare class Specimen {
    private element;
    private x;
    private y;
    private bcrs;
    private step;
    private nextType;
    private readonly baseZIndex;
    private readonly species;
    private _type;
    private get type();
    private set type(value);
    constructor(species: Species, baseZIndex: number);
    private run;
    private enter;
    setGroup(group: string): void;
    setBoundingClientRects(bcrs: RoBCRs): void;
    attach(element: HTMLElement): void;
    detach(): void;
}
