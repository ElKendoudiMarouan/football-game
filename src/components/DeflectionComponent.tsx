import React, {useEffect, useState} from 'react';
import {MIN_DICE_VALUE, rollDice, SECOND_DICE_VALUE} from '../utility/diceUtils';
import {DeflectionResult, DeflectionType} from '../utility/enums';

type DeflectionProps = {
    deflectionDistance?: number;
    deflectionType?: DeflectionType;
};

const DEFLECTION_OUTCOMES: Record<DeflectionType, Record<number, DeflectionResult>> = {
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

export const DeflectionComponent: React.FC<DeflectionProps> = ({ deflectionDistance, deflectionType }) => {
    const [localDeflectionType, setLocalDeflectionType] = useState<DeflectionType>(deflectionType || DeflectionType.LooseBall);
    const [deflectionDirection, setDeflectionDirection] = useState<number | null>(null);
    const [distanceRoll, setDistanceRoll] = useState<number | null>(null);
    const [outcome, setOutcome] = useState<string | null>(null);

    const handleRollDiceDeflection = () => {
        const directionRoll = rollDice();
        setDeflectionDirection(directionRoll);

        const result = DEFLECTION_OUTCOMES[localDeflectionType][directionRoll];

        if (directionRoll === MIN_DICE_VALUE || directionRoll === SECOND_DICE_VALUE || result.includes(DeflectionResult.NoDeflection)
            || result.includes(DeflectionResult.Corner) || result.includes(DeflectionResult.Out)) {
            setOutcome(result);
            setDistanceRoll(null);
        } else {
            if(!deflectionDistance) {
                const distanceRoll = rollDice();
                setDistanceRoll(distanceRoll);
            }
            setOutcome(result);
        }
    };

    useEffect(() => {
        if (deflectionType && !deflectionDirection) {
            handleRollDiceDeflection();
        }
    }, [deflectionDistance, deflectionType, deflectionDirection])

    return (
        <div>
            { !deflectionType && (
                <>
                    <h2>Deflection Component</h2>
                    <label>
                        Deflection Type:
                        <select value={localDeflectionType} onChange={(e) => setLocalDeflectionType(e.target.value as DeflectionType)}>
                            <option value={DeflectionType.LooseBall}>Loose Ball</option>
                            <option value={DeflectionType.RightBar}>Right Bar</option>
                            <option value={DeflectionType.LeftBar}>Left Bar</option>
                            <option value={DeflectionType.TopBar}>Top Bar</option>
                        </select>
                    </label>
                    <br />
                    <button onClick={handleRollDiceDeflection}>Roll Dice</button>
                </>
            )}
            {deflectionDirection && (
                <div>
                    {deflectionDistance && (<p>{localDeflectionType} :</p>)}
                    <p>Deflection Direction Dice Roll: {deflectionDirection} </p>
                    <p>Outcome: {outcome}</p>
                    {distanceRoll && (
                        <p>Deflection Distance Roll: {distanceRoll}</p>
                    )}
                    {deflectionDistance  && (
                        <p>Deflection Calculated Distance: {deflectionDistance}</p>
                    )}
                </div>
            )}
        </div>
    );
};
