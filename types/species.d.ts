import { SpecimenType } from './types';
declare type Group = Array<Readonly<SpecimenType>> & {
    random: Readonly<SpecimenType>;
};
export declare class Species {
    amount: number;
    private readonly map;
    constructor(amount?: number);
    add(groups: string[], specimenType: SpecimenType): Species;
    getGroup(name: string): Group;
}
export {};
