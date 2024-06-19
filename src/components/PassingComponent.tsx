import React, { useState } from 'react';

// Define Player type
type Player = {
    id: number;
    name: string;
    number: number;
    Pace: number;
    Shooting: number;
    Passing: number;
    Defense: number;
    Control: number;
    Head: number;
    Resilience: number;
};

// Sample player data (You can replace this with your actual data)
const players: Player[] = [
    { id: 1, name: 'Player 1', number: 7, Pace: 8, Shooting: 6, Passing: 7, Defense: 5, Control: 7, Head: 6, Resilience: 8 },
    { id: 2, name: 'Player 2', number: 10, Pace: 7, Shooting: 9, Passing: 8, Defense: 6, Control: 8, Head: 5, Resilience: 7 },
    // Add more players as needed
];

const DISTANCE_COEFFICIENTS = {
    normal: [0, 2, 3, 4, 5, 6, 7],
    header: [2, 3, 4, 5, 6, 7, 8],
};

const getDistanceCoefficient = (distance: number, isHeader: boolean): number => {
    const index = Math.min(Math.floor(distance / 6), 6); // Determine the index based on distance
    return isHeader ? DISTANCE_COEFFICIENTS.header[index] : DISTANCE_COEFFICIENTS.normal[index];
};

const rollDice = (): number => Math.floor(Math.random() * 12) + 1;

type CalculationResult = {
    result: number;
    diceRoll: number;
    distanceCoeff: number;
    passSuccessful: boolean;
    refractionDistance: number;
    refractionDirection: number;
    formula: string;
};

const calculateResult = (
    player: Player,
    distance: number,
    isHeader: boolean,
    didTurn: boolean,
    diceRoll: number
): CalculationResult => {
    const distanceCoeff = getDistanceCoefficient(distance, isHeader);
    let result;

    if (isHeader) {
        result = diceRoll + player.Head - distanceCoeff - (didTurn ? 2 : 0);
    } else {
        result = diceRoll + player.Passing - distanceCoeff - (didTurn ? 1 : 0);
    }

    let passSuccessful = false;
    let refractionDistance = 0;
    let refractionDirection = 0;

    if (diceRoll === 1) {
        passSuccessful = false;
    } else if (diceRoll === 12 || (!isHeader && distance <= 6)) {
        passSuccessful = true;
    } else {
        passSuccessful = result > 6;
        if (!passSuccessful) {
            refractionDistance = 6 - result;
            refractionDirection = rollDice();
        }
    }

    return {
        result,
        diceRoll,
        distanceCoeff,
        passSuccessful,
        refractionDistance,
        refractionDirection,
        formula: `${diceRoll} + ${isHeader ? player.Head : player.Passing} - ${distanceCoeff}${didTurn ? ` - ${isHeader ? 2 : 1}` : ''}`,
    };
};

const PassingComponent: React.FC = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player>(players[0]);
    const [distance, setDistance] = useState<number>(0);
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
        if (diceRoll !== null) {
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
                    {diceRoll === 1 ? (
                        <p>Pass Failed</p>
                    ) : diceRoll === 12 ? (
                        <p>Pass Successful</p>
                    ) : (
                        <>
                            <label>
                                Player:
                                <select
                                    value={selectedPlayer.id}
                                    onChange={(e) => setSelectedPlayer(players.find(p => p.id === parseInt(e.target.value)) as Player)}
                                >
                                    {players.map(player => (
                                        <option key={player.id} value={player.id}>{player.name}</option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <label>
                                Distance:
                                <input
                                    type="number"
                                    value={distance}
                                    onChange={(e) => setDistance(parseInt(e.target.value))}
                                />
                            </label>
                            <br />
                            <label>
                                Header:
                                <input
                                    type="checkbox"
                                    checked={isHeader}
                                    onChange={(e) => setIsHeader(e.target.checked)}
                                />
                            </label>
                            <br />
                            <label>
                                Changed Direction:
                                <input
                                    type="checkbox"
                                    checked={didTurn}
                                    onChange={(e) => setDidTurn(e.target.checked)}
                                />
                            </label>
                            <br />
                            <button onClick={handleCalculate} disabled={calculation !== null}>Calculate</button>
                            {calculation && (
                                <div>
                                    <h3>Result</h3>
                                    <p>Formula: {calculation.formula} = {calculation.result}</p>
                                    <p>Pass Successful: {calculation.passSuccessful ? 'Yes' : 'No'}</p>
                                    {!calculation.passSuccessful && (
                                        <>
                                            <p>Refraction Distance: {calculation.refractionDistance}</p>
                                            <p>Refraction Direction: {calculation.refractionDirection}</p>
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

export default PassingComponent;
