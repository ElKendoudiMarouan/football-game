import React, { useEffect, useState } from 'react';
import { PlayerSelector } from './PlayerSelector';
import {
    MAX_DICE_VALUE,
    MIN_DICE_VALUE,
    rollDice, SECOND_DICE_VALUE,
} from '../utility/diceUtils';
import { RefractionComponent, RefractionType } from './RefractionComponent';
import { Player, players } from '../types/types';
import { clamp } from '../utility/sharedFunctions';
import { ShotResult } from '../utility/enums';

const MIN_SUCCESS_RESULT = 8;
const TOP_BAR_RESULT = 3;
const MAX_INSIDE_ZONE_DISTANCE = 12;
const SHOT_TURN_PENALTY = 1;
const HEADER_TURN_PENALTY = 2;
const SHOT_DISTANCE_UNIT = 3;

const INSIDE_ZONE_COEFFICIENTS = [1, 2, 3, 4, 5, 6];
const OUTSIDE_ZONE_COEFFICIENTS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const GOAL_MOUTH_CELL_NUMBERS = [
    { label: 'A', number: 8 },
    { label: 'B', number: 9 },
    { label: 'C', number: 10 },
    { label: 'D', number: 11 },
    { label: 'E', number: 12 },
    { label: 'F', number: 13 },
];
const RIGHT_BAR_NUMBER_CELL = 7;
const LEFT_BAR_NUMBER_CELL = 14;

const adjustDistance = (distance: number, isHeader: boolean, isInsideGoalZone: boolean, didTurn: boolean) => {
    const newDistance = distance + (didTurn ? (isHeader ? HEADER_TURN_PENALTY : SHOT_TURN_PENALTY) : 0);
    return (isInsideGoalZone || isHeader) ? Math.min(newDistance, MAX_INSIDE_ZONE_DISTANCE) : newDistance;
}

const getDistanceCoefficient = (distance: number, isHeader: boolean, isInsideGoalZone: boolean, didTurn: boolean): number => {
    const coefficients = (isInsideGoalZone && !isHeader) ? INSIDE_ZONE_COEFFICIENTS : OUTSIDE_ZONE_COEFFICIENTS;
    const adjustedDistance = adjustDistance(distance, isHeader, isInsideGoalZone, didTurn);
    const index = Math.min(Math.floor(adjustedDistance / SHOT_DISTANCE_UNIT), coefficients.length - 1);
    return coefficients[index] || coefficients[coefficients.length - 1];
};

const calculateShootingResult = (
    player: Player,
    distance: number,
    isHeader: boolean,
    isInsideGoalZone: boolean,
    didTurn: boolean,
    goalCell: string,
    diceRoll: number
) => {
    const distanceCoeff = getDistanceCoefficient(distance, isHeader, isInsideGoalZone, didTurn);
    const skillValue = isHeader ? player.Head : player.Shooting;
    const result = clamp(diceRoll + skillValue - distanceCoeff, MIN_DICE_VALUE, MAX_DICE_VALUE);
    const shotResult = checkOnTarget(diceRoll, goalCell);

    return {
        result,
        diceRoll,
        shotResult,
        distanceCoeff,
        formula: `Dice Roll (${diceRoll}) + ${isHeader ? 'Head' : 'Shooting'} Skill (${skillValue}) - Coefficient (${distanceCoeff})`,
        coeffFormula: `Distance (${distance})`
    };
};

const handleDeviation = (goalCellNumber: number, deviation: number): ShotResult => {
    const newCellNumber = goalCellNumber + (goalCellNumber >= 11 ? deviation : -deviation);
    if (newCellNumber < RIGHT_BAR_NUMBER_CELL || newCellNumber > LEFT_BAR_NUMBER_CELL) {
        return ShotResult.GoalKick;
    } else if (newCellNumber === RIGHT_BAR_NUMBER_CELL) {
        return ShotResult.RightBar;
    } else if (newCellNumber === LEFT_BAR_NUMBER_CELL) {
        return ShotResult.LeftBar;
    } else {
        return ShotResult.OnTarget;
    }
};

function checkOnTarget(diceRoll: number, goalCell: string) {
    let shotResult;
    if (diceRoll < TOP_BAR_RESULT ) {
        shotResult = ShotResult.GoalKick;
    } else if (diceRoll == TOP_BAR_RESULT) {
        shotResult = ShotResult.TopBar;
    } else if (diceRoll > TOP_BAR_RESULT && diceRoll < MIN_SUCCESS_RESULT) {
        const deviation = MIN_SUCCESS_RESULT - diceRoll;
        const goalCellNumber = GOAL_MOUTH_CELL_NUMBERS.find(cell => cell.label === goalCell)!.number;
        shotResult = handleDeviation(goalCellNumber, deviation);
    } else {
        shotResult = ShotResult.OnTarget;
    }
    return shotResult;
}

export const ShootingComponent: React.FC = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(players[0]);
    const [distance, setDistance] = useState<number>(10);
    const [isHeader, setIsHeader] = useState<boolean>(false);
    const [isInsideGoalZone, setIsInsideGoalZone] = useState<boolean>(false);
    const [didTurn, setDidTurn] = useState<boolean>(false);
    const [goalCell, setGoalCell] = useState<string>('A');
    const [diceRoll, setDiceRoll] = useState<number | null>(null);
    const [calculation, setCalculation] = useState<any | null>(null);

    const handleRollDice = () => {
        const roll = rollDice();
        setDiceRoll(roll);
        setCalculation(null);
    };

    useEffect(() => {
        if (isInsideGoalZone && distance > MAX_INSIDE_ZONE_DISTANCE) {
            setDistance(MAX_INSIDE_ZONE_DISTANCE);
        }
    }, [isInsideGoalZone, distance]);

    const handleCalculate = () => {
        if (diceRoll !== null && selectedPlayer !== null) {
            if (diceRoll === MIN_DICE_VALUE || diceRoll === SECOND_DICE_VALUE || diceRoll === MAX_DICE_VALUE) {
                setCalculation({
                    result: diceRoll,
                    diceRoll,
                    coeff: 0,
                    shotResult: diceRoll === MAX_DICE_VALUE ? ShotResult.OnTarget : ShotResult.GoalKick,
                    formula: `Dice Roll (${diceRoll})`,
                    coeffFormula: ''
                });
            } else {
                const result = calculateShootingResult(selectedPlayer, distance, isHeader, isInsideGoalZone, didTurn, goalCell, diceRoll);
                setCalculation(result);
            }
        }
    };

    return (
        <div>
            <h2>Shooting Component</h2>
            <button onClick={handleRollDice}>Roll Dice</button>
            {diceRoll !== null && (
                <>
                    <p>Dice Roll: {diceRoll}</p>
                    {diceRoll < TOP_BAR_RESULT ? (
                        <p>Shot Failed ({calculation.shotResult})</p>
                    ) : diceRoll === MAX_DICE_VALUE ? (
                        <p>Shot on target : ({calculation.shotResult})</p>
                    ) : (
                        <>
                            <PlayerSelector players={players} disabled={calculation !== null} selectedPlayer={selectedPlayer} onSelect={setSelectedPlayer} />
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
                                    onChange={(e) => {
                                        setIsHeader(e.target.checked);
                                        if (e.target.checked) setIsInsideGoalZone(true);
                                    }}
                                />
                            </label>
                            {!isHeader && (
                                <>
                                    <br />
                                    <label>
                                        Inside Goal Zone:
                                        <input
                                            type="checkbox"
                                            checked={isInsideGoalZone}
                                            disabled={calculation !== null}
                                            onChange={(e) => setIsInsideGoalZone(e.target.checked)}
                                        />
                                    </label>
                                </>
                            )}
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
                            <label>
                                Goal Mouth Cell:
                                <select value={goalCell} onChange={(e) => setGoalCell(e.target.value)} disabled={calculation !== null}>
                                    {GOAL_MOUTH_CELL_NUMBERS.map(cell => (
                                        <option key={cell.label} value={cell.label}>
                                            {cell.label} ({cell.number})
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <button onClick={handleCalculate} disabled={calculation !== null}>Calculate</button>
                            {calculation && (
                                <div>
                                    <h3>Result</h3>
                                    <p>Distance coefficient: {calculation.coeffFormula} = {calculation.distanceCoeff}</p>
                                    <p>Formula: {calculation.formula} = {calculation.result} {calculation.shotResult == ShotResult.OnTarget ? '≥' : '<'} {MIN_SUCCESS_RESULT}</p>
                                    <p>Shot On Target: {calculation.shotSuccesful ? 'Yes' : 'No' } : {calculation.shotResult}</p>
                                    { calculation.shotResult && (
                                        <>
                                            <p>Deviation Result: {calculation.shotResult}</p>
                                            {calculation.shotResult === ShotResult.RightBar && (
                                                <RefractionComponent
                                                    refractionType={RefractionType.RightBar}
                                                />
                                            )}
                                            {calculation.shotResult === ShotResult.LeftBar && (
                                                <RefractionComponent
                                                    refractionType={RefractionType.LeftBar}
                                                />
                                            )}
                                            {calculation.shotResult === ShotResult.TopBar && (
                                                <RefractionComponent
                                                    refractionType={RefractionType.TopBar}
                                                />
                                            )}
                                        </>
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

export default ShootingComponent;
