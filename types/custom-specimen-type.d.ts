import { SpecimenStepBuilder, SpecimenType } from './types';
export declare class CustomSpecimenType implements SpecimenType {
    readonly margin: SpecimenType['margin'];
    readonly nextGroup: SpecimenType['nextGroup'];
    readonly reloadImage: SpecimenType['reloadImage'];
    readonly src: SpecimenType['src'];
    readonly step: SpecimenType['step'];
    readonly zIndex: SpecimenType['zIndex'];
    constructor({ nextGroup, offset, reloadImage, src, stepBuilder, zIndex }: {
        nextGroup: SpecimenType['nextGroup'];
        offset: {
            x: number;
            y: number;
        };
        reloadImage?: boolean;
        src: string;
        stepBuilder: SpecimenStepBuilder;
        zIndex: number;
    });
}
