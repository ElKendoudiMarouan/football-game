import React, { useState } from 'react';
import { PlayerSelector } from './PlayerSelector';
import { rollDice } from '../utility/diceUtils';
import {players, Player, BlockResultChartElement} from '../types/types';
import {blockResults} from '../utility/charts';

type BlockingComponentProps = {
    attacker: Player;
};

const calculateBlockResult = (defender: Player, attacker: Player, diceRoll: number): BlockResultChartElement => {
    if (diceRoll === 1 || diceRoll === 12) {
        return blockResults[diceRoll];
    }

    const defenseValue = defender.Defense;
    const shootingValue = attacker.Shooting;
    const resultValue = diceRoll + defenseValue - shootingValue;

    const closestResult = Object.keys(blockResults).reduce((prev, curr) => {
        return Math.abs(parseInt(curr) - resultValue) < Math.abs(parseInt(prev) - resultValue) ? curr : prev;
    });

    return blockResults[parseInt(closestResult)];
};

export const BlockingComponent: React.FC<BlockingComponentProps> = ({ attacker }) => {
    const [selectedDefender, setSelectedDefender] = useState<Player | null>(null);
    const [blockResult, setBlockResult] = useState<BlockResultChartElement | null>(null);
    const [diceRoll, setDiceRoll] = useState<number | null>(null);

    const handleRollDice = () => {
        const roll = rollDice();
        setDiceRoll(roll);
        setBlockResult(null);
    };

    const handleCalculate = () => {
        if (selectedDefender && diceRoll !== null) {
            const result = calculateBlockResult(selectedDefender, attacker, diceRoll);
            setBlockResult(result);
        }
    };

    return (
        <div>
            <h2>Blocking Component</h2>
            <button onClick={handleRollDice}>Roll Dice</button>
            {diceRoll !== null && (
                <>
                    <p>Dice Roll: {diceRoll}</p>
                    {blockResult ? (
                        <>
                            <h3>{blockResult.title}</h3>
                            <p>{blockResult.text}</p>
                        </>
                    ) : (
                        <>
                            <PlayerSelector players={players} selectedPlayer={selectedDefender} onSelect={setSelectedDefender} disabled={blockResult !== null} />
                            <button onClick={handleCalculate} disabled={!selectedDefender}>
                                Calculate Block Result
                            </button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default BlockingComponent;
