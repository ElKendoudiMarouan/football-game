import {MAX_DICE_VALUE, MIN_DICE_VALUE} from './diceUtils';

const clamp = (val: number, min: number, max: number) => {
    return val > max ? max : val < min ? min : val;
}

export const clampDiced = (val: number) => {
    return clamp(val, MIN_DICE_VALUE, MAX_DICE_VALUE);
}

export const expandRecord = (obj: Record<string, any>) => {
    const keys = Object.keys(obj);
    keys.forEach(key => {
        const subKeys = key.split(/,\s?/).map(subKey => parseInt(subKey));
        const target = obj[key];
        delete obj[key];
        subKeys.forEach(subKey => {
            obj[subKey] = target;
        });
    });
    return obj;
};