import React, {useEffect, useState} from 'react';
import {MIN_DICE_VALUE, rollDice, SECOND_DICE_VALUE} from '../../utility/diceUtils';
import {DeflectionResult, DeflectionType} from '../../types/enums';
import {DEFLECTION_OUTCOMES} from '../../records/deflectionOutcomes';

type DeflectionProps = {
    deflectionDistance?: number;
    deflectionType?: DeflectionType;
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
                    {deflectionDistance && (<h4>{localDeflectionType} :</h4>)}
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
