import React, { useState } from 'react';
import { PlayerSelector } from './PlayerSelector';
import {RefractionComponent, RefractionType} from './RefractionComponent';
import {Player, players} from '../types/types';
import { MAX_DICE_VALUE, MIN_DICE_VALUE, rollDice} from '../utility/diceUtils';
import {clamp} from '../utility/sharedFunctions';


const MIN_SUCCESS_RESULT = 6;
const NORMAL_PASS_DISTANCE_UNIT = 6;
const HEADER_PASS_DISTANCE_UNIT = 3;
const MAX_HEADER_PASS_DISTANCE = 12;
const PASS_TURN_PENALTY = 1;
const HEADER_TURN_PENALTY = 2;

const NORMAL_PASS_DISTANCE_COEFFICIENTS = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const HEADER_PASS_DISTANCE_COEFFICIENTS = [2, 3, 4, 5, 6];

const adjustDistance = (distance: number, isHeader: boolean, didTurn: boolean) => {
    const newDistance = distance  + (didTurn ? (isHeader ? PASS_TURN_PENALTY : HEADER_TURN_PENALTY) : 0);
    return isHeader ? Math.min(newDistance, MAX_HEADER_PASS_DISTANCE): newDistance;
}

const getDistanceCoefficient = (distance: number, isHeader: boolean, didTurn: boolean): number => {
    const coefficients = isHeader ? NORMAL_PASS_DISTANCE_COEFFICIENTS : HEADER_PASS_DISTANCE_COEFFICIENTS;
    const adjustedDistance = adjustDistance(distance, isHeader, didTurn);
    const unit = isHeader ? HEADER_PASS_DISTANCE_UNIT : NORMAL_PASS_DISTANCE_UNIT;
    const index = Math.min(Math.floor(adjustedDistance / unit), coefficients.length-1);
    return coefficients[index];
};

type CalculationResult = {
    result: number;
    diceRoll: number;
    distanceCoeff: number;
    passSuccessful: boolean;
    refractionDistance: number;
    formula: string;
    coeffFormula: string;
};

const calculateResult = (
    player: Player,
    distance: number,
    isHeader: boolean,
    didTurn: boolean,
    diceRoll: number
): CalculationResult => {
    let passSuccessful: boolean;
    let refractionDistance = 0;

    const distanceCoeff = getDistanceCoefficient(distance, isHeader, didTurn);
    const skillValue = isHeader ? player.Head : player.Passing;

    const result = clamp(diceRoll + skillValue - distanceCoeff, MIN_DICE_VALUE, MAX_DICE_VALUE);

    if (diceRoll === MIN_DICE_VALUE) { //todo out of closest line
        passSuccessful = false;
    } else if (diceRoll === MAX_DICE_VALUE || (!isHeader && distance <= 6)) {
        passSuccessful = true;
    } else {
        passSuccessful = result > MIN_SUCCESS_RESULT;
        if (!passSuccessful) {
            refractionDistance = MIN_SUCCESS_RESULT - result;
        }
    }

    return {
        result,
        diceRoll,
        distanceCoeff,
        passSuccessful,
        refractionDistance,
        formula: `Dice Roll (${diceRoll}) +  ${isHeader ? 'Head' : 'Passing'} Skill (${skillValue}) - Distance Coefficient (${distanceCoeff})`,
        coeffFormula: `Distance (${distance})  ${ didTurn ? `+ Changed Direction (${(isHeader ? HEADER_TURN_PENALTY : HEADER_TURN_PENALTY)})` : ''}`,
    };
};

export const PassingComponent: React.FC = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(players[0]);
    const [distance, setDistance] = useState<number>(1);
    const [isHeader, setIsHeader] = useState<boolean>(false);
    const [didTurn, setDidTurn] = useState<boolean>(false);
    const [diceRoll, setDiceRoll] = useState<number | null>(null);
    const [calculation, setCalculation] = useState<CalculationResult | null>(null);

    const handleRollDice = () => {
        const roll = rollDice();
        setDiceRoll(roll);
        setCalculation(null);
    };

    const handleCalculate = () => {
        if (diceRoll !== null && selectedPlayer !== null) {
            const result = calculateResult(selectedPlayer, distance, isHeader, didTurn, diceRoll);
            setCalculation(result);
        }
    };

    return (
        <div>
            <h2>Passing Component</h2>
            <button onClick={handleRollDice}>Roll Dice</button>
            {diceRoll !== null && (
                <>
                    <p>Dice Roll: {diceRoll}</p>
                    {diceRoll === MIN_DICE_VALUE ? (
                        <p>Pass Failed</p>
                    ) : diceRoll === MAX_DICE_VALUE ? (
                        <p>Pass Successful</p>
                    ) : (
                        <>
                            <PlayerSelector players={players}  disabled={calculation !== null} selectedPlayer={selectedPlayer} onSelect={setSelectedPlayer} />
                            <br />
                            <label>
                                Distance:
                                <input
                                    type="number"
                                    value={distance}
                                    disabled={calculation !== null}
                                    onChange={(e) => setDistance(parseInt(e.target.value))}
                                />
                            </label>
                            <br />
                            <label>
                                Header:
                                <input
                                    type="checkbox"
                                    checked={isHeader}
                                    disabled={calculation !== null}
                                    onChange={(e) => setIsHeader(e.target.checked)}
                                />
                            </label>
                            <br />
                            <label>
                                Changed Direction:
                                <input
                                    type="checkbox"
                                    checked={didTurn}
                                    disabled={calculation !== null}
                                    onChange={(e) => setDidTurn(e.target.checked)}
                                />
                            </label>
                            <br />
                            <button onClick={handleCalculate} disabled={calculation !== null}>Calculate</button>
                            {calculation && (
                                <div>
                                    <h3>Result</h3>
                                    <p>Distance coefficient: {calculation.coeffFormula} =  {adjustDistance(distance, isHeader, didTurn)} → {calculation.distanceCoeff}</p>
                                    <p>Formula: {calculation.formula} = {calculation.result} {calculation.passSuccessful ? '>' : ' ≤'} {MIN_SUCCESS_RESULT}</p>
                                    <p>Pass Successful: {calculation.passSuccessful ? 'Yes' : 'No'}</p>
                                    {!calculation.passSuccessful && (
                                        <RefractionComponent
                                            refractionDistance={calculation.refractionDistance}
                                            refractionType={RefractionType.LooseBall}
                                        />
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default PassingComponent;
