import React, {useEffect, useState} from 'react';
import {rollDice} from '../utility/diceUtils';

export enum RefractionType {
    LooseBall = 'Loose ball',
    RightBar = 'Right bar',
    LeftBar = 'Left bar',
    TopBar = 'Top bar',
}
type RefractionProps = {
    refractionDistance?: number;
    refractionType?: RefractionType;
};

const REFRACTION_OUTCOMES: Record<RefractionType, Record<number, string>>  = {
    [RefractionType.LooseBall]: {
        1: 'Out of closest line', //is corner?
        2: 'Out of closest line',
        3: 'Top Left',
        4: 'Top',
        5: 'Top Right',
        6: 'Left',
        7: 'No refraction',
        8: 'Right',
        9: 'Bottom Left',
        10: 'Bottom',
        11: 'Bottom Right',
        12: 'No refraction'
    },
    [RefractionType.RightBar]: { //corner
        1: 'Corner',
        2: 'Corner',
        3: 'Goal',
        4: 'Top',
        5: 'Top Right',
        6: 'Corner',
        7: 'No refraction (distance 0)',
        8: 'Right',
        9: 'Corner',
        10: 'Bottom',
        11: 'Bottom Right',
        12: 'Goal'
    },
    [RefractionType.LeftBar]: { //corner
        1: 'Corner',
        2: 'Corner',
        3: 'Corner',
        4: 'Top',
        5: 'Top Right',
        6: 'Corner',
        7: 'No refraction (distance 0)',
        8: 'Right',
        9: 'Goal',
        10: 'Bottom',
        11: 'Bottom Right',
        12: 'Goal'
    },
    [RefractionType.TopBar]: { //corner
        1: 'Corner',
        2: 'Corner',
        3: 'Corner',
        4: 'Top',
        5: 'Top Right',
        6: 'Corner',
        7: 'Goal',
        8: 'Right',
        9: 'Corner',
        10: 'Bottom',
        11: 'No refraction (distance 0)',
        12: 'Goal'
    }
};

export const RefractionComponent: React.FC<RefractionProps> = ({ refractionDistance, refractionType }) => {
    const [localRefractionType, setLocalRefractionType] = useState<RefractionType>(refractionType || RefractionType.LooseBall);
    const [refractionDirection, setRefractionDirection] = useState<number | null>(null);
    const [distanceRoll, setDistanceRoll] = useState<number | null>(null);
    const [outcome, setOutcome] = useState<string | null>(null);

    const handleRollDiceRefraction = () => {
        const directionRoll = rollDice();
        setRefractionDirection(directionRoll);

        const result = REFRACTION_OUTCOMES[localRefractionType][directionRoll];

        if (directionRoll === 1 || directionRoll === 2 || result.includes('No refraction') || result.includes('stays in spot')
            || result.includes('Corner') || result.includes('Out of closest line')) {
            setOutcome(result);
            setDistanceRoll(null);
        } else {
            if(!refractionDistance) {
                const distanceRoll = rollDice();
                setDistanceRoll(distanceRoll);
            }
            setOutcome(result);
        }
    };

    useEffect(() => {
        if (refractionDistance && refractionType && !refractionDirection) {
            handleRollDiceRefraction();
        }
    }, [refractionDistance, refractionType, refractionDirection])

    return (
        <div>
            {!refractionDistance && !refractionType && ( //todo check this
                <>
                    <h2>Refraction Component</h2>
                    <label>
                        Refraction Type:
                        <select value={localRefractionType} onChange={(e) => setLocalRefractionType(e.target.value as RefractionType)}>
                            <option value={RefractionType.LooseBall}>Loose Ball</option>
                            <option value={RefractionType.RightBar}>Right Bar</option>
                            <option value={RefractionType.LeftBar}>Left Bar</option>
                            <option value={RefractionType.TopBar}>Top Bar</option>
                        </select>
                    </label>
                    <br />
                    <button onClick={handleRollDiceRefraction}>Roll Dice</button>
                </>
            )}
            {refractionDirection && (
                <div>
                    {refractionDistance && (<p>{localRefractionType} :</p>)}
                    <p>Refraction Direction Dice Roll: {refractionDirection} </p>
                    <p>Outcome: {outcome}</p>
                    {distanceRoll && (
                        <p>Refraction Distance Roll: {distanceRoll}</p>
                    )}
                    {refractionDistance  && (
                        <p>Refraction Calculated Distance: {refractionDistance}</p>
                    )}
                </div>
            )}
        </div>
    );
};
