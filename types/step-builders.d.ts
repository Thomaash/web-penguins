import { SpecimenStepBuilder } from './types';
interface Point {
    x: number;
    y: number;
}
export declare function excavating(direction?: number, speed?: number): SpecimenStepBuilder;
export declare function ghostMoving(direction?: number, speed?: number, distance?: number, easing?: KeyframeAnimationOptions['easing']): SpecimenStepBuilder;
export declare function falling(speed?: number, easing?: KeyframeAnimationOptions['easing'], maxDistance?: number, bellowGroundDistance?: number): SpecimenStepBuilder;
export declare function walking(speed?: number, easing?: KeyframeAnimationOptions['easing'], edgeDistance?: number): SpecimenStepBuilder;
export declare function edgeToEdgeWalking(speed?: number, easing?: KeyframeAnimationOptions['easing'], edgeDistance?: number, ground?: boolean, elements?: boolean): SpecimenStepBuilder;
export declare function waiting(minimal?: number, variable?: number, visible?: boolean): SpecimenStepBuilder;
export declare function teleporting(position: Point): SpecimenStepBuilder;
export {};
