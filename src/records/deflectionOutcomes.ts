import {DeflectionResult, DeflectionType} from '../types/enums';

export const DEFLECTION_OUTCOMES: Record<DeflectionType, Record<number, DeflectionResult>> = {
    [DeflectionType.LooseBall]: {
        1: DeflectionResult.Out,
        2: DeflectionResult.Out,
        3: DeflectionResult.TopLeft,
        4: DeflectionResult.Top,
        5: DeflectionResult.TopRight,
        6: DeflectionResult.Left,
        7: DeflectionResult.NoDeflection,
        8: DeflectionResult.Right,
        9: DeflectionResult.BottomLeft,
        10: DeflectionResult.Bottom,
        11: DeflectionResult.BottomRight,
        12: DeflectionResult.NoDeflection
    },
    [DeflectionType.RightBar]: {
        1: DeflectionResult.Out,
        2: DeflectionResult.Out,
        3: DeflectionResult.Goal,
        4: DeflectionResult.Top,
        5: DeflectionResult.TopRight,
        6: DeflectionResult.Out,
        7: DeflectionResult.NoDeflection,
        8: DeflectionResult.Right,
        9: DeflectionResult.Out,
        10: DeflectionResult.Bottom,
        11: DeflectionResult.BottomRight,
        12: DeflectionResult.Goal
    },
    [DeflectionType.LeftBar]: {
        1: DeflectionResult.Out,
        2: DeflectionResult.Out,
        3: DeflectionResult.Out,
        4: DeflectionResult.Top,
        5: DeflectionResult.TopRight,
        6: DeflectionResult.Out,
        7: DeflectionResult.NoDeflection,
        8: DeflectionResult.Right,
        9: DeflectionResult.Goal,
        10: DeflectionResult.Bottom,
        11: DeflectionResult.BottomRight,
        12: DeflectionResult.Goal
    },
    [DeflectionType.TopBar]: {
        1: DeflectionResult.Out,
        2: DeflectionResult.Out,
        3: DeflectionResult.Out,
        4: DeflectionResult.Top,
        5: DeflectionResult.TopRight,
        6: DeflectionResult.Out,
        7: DeflectionResult.Goal,
        8: DeflectionResult.Right,
        9: DeflectionResult.Out,
        10: DeflectionResult.Bottom,
        11: DeflectionResult.NoDeflection,
        12: DeflectionResult.Goal
    }
};