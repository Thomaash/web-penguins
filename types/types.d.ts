export declare enum SpecimenGroup {
    Clicked = "clicked",
    Dead = "dead",
    Entering = "entering",
    FallingDying = "falling-dying",
    FallingGliding = "falling-gliding",
    Gliding = "gliding",
    GroundDwelling = "ground-dwelling",
    Hidden = "hidden"
}
export declare type RoBCRs = Readonly<Array<Readonly<ClientRect>>>;
export interface SpecimenPosition {
    x: number;
    y: number;
}
export interface SpecimenOffset {
    x: number;
    y: number;
}
export interface PenguinStep {
    promise: Promise<SpecimenPosition>;
    stop: () => void;
}
export interface SpecimenType {
    readonly margin: string;
    readonly nextGroup: string;
    readonly reloadImage: boolean;
    readonly src: string;
    readonly step: (element: HTMLElement, bcrs: RoBCRs, x: number, y: number) => PenguinStep;
    readonly zIndex: number;
}
export declare type SpecimenStepBuilder = (offset: SpecimenOffset) => SpecimenType['step'];
