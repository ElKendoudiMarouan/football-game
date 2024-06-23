import React, { useState } from 'react';
import { PlayerSelector } from './PlayerSelector';
import { rollDice } from '../utility/diceUtils';
import { players, Player, OutcomeChartElement } from '../types/types';
import { BLOCK_OUTCOMES } from '../records/blockOutcomes';
import {DeflectionComponent} from './outcomes/DeflectionComponent';
import {OutcomeResultType, DeflectionType} from '../types/enums';
import {clampDiced} from '../utility/sharedFunctions';
import {LossOfBalanceComponent} from './outcomes/LossOfBalanceComponent';
import {InjuryComponent} from './outcomes/InjuryComponent';
import {HeadedClearanceComponent} from './outcomes/HeadedClearanceComponent';
import FoulComponent from './outcomes/FoulComponent';

type BlockingComponentProps = {
    attacker?: Player;
};

type BlockingResult = {
    chartElement: OutcomeChartElement,
    calculationResult: number | null,
    formula: string | null,
}

const calculateBlockResult = (defender: Player, attacker: Player, diceRoll: number): BlockingResult => {
    if (diceRoll === 1 || diceRoll === 12) {
        return {
            chartElement: BLOCK_OUTCOMES[diceRoll],
            calculationResult: diceRoll,
            formula: null
        };
    }

    const defenseValue = defender.Defense;
    const shootingValue = attacker.Shooting;
    const resultValue = clampDiced(diceRoll + defenseValue - shootingValue);

    return {
        chartElement: BLOCK_OUTCOMES[resultValue],
        calculationResult: resultValue,
        formula: `Dice Roll (${diceRoll}) + Defender Defense Skill (${defenseValue}) - Attacker Shooting Skill (${shootingValue})`,
    }
};

export const BlockingComponent: React.FC<BlockingComponentProps> = ({ attacker }) => {
    const [selectedDefender, setSelectedDefender] = useState<Player>(players[0]);
    const [selectedAttacker, setSelectedAttacker] = useState<Player | null>(attacker || players[1]);
    const [blockResult, setBlockResult] = useState<BlockingResult | null>(null);
    const [diceRoll, setDiceRoll] = useState<number | null>(null);

    const handleRollDice = () => {
        const roll = rollDice();
        setDiceRoll(roll);
        setBlockResult(null);

        if (selectedDefender && selectedAttacker ) {
            const result = calculateBlockResult(selectedDefender, selectedAttacker, roll);
            setBlockResult(result);
        }
    };

    return (
        <div>
            <h2>Blocking Component</h2>
            <PlayerSelector players={players} selectedPlayer={selectedDefender} onSelect={setSelectedDefender} disabled={blockResult !== null}/>
            {!attacker && (
                <PlayerSelector players={players} selectedPlayer={selectedAttacker} onSelect={setSelectedAttacker} disabled={blockResult !== null}/>
            )}
            <br/>
            <button onClick={handleRollDice}>Roll Dice</button>
            {diceRoll !== null && blockResult != null && (
                <>
                    <p>Dice Roll: {diceRoll}</p>
                    { blockResult.formula && blockResult.calculationResult && (
                        <p>Formula: {blockResult.formula} = {blockResult.calculationResult}</p>
                    )}
                    <h3>{blockResult.calculationResult} : {blockResult.chartElement.title}</h3>
                    <p>{blockResult.chartElement.text}</p>
                    {blockResult.chartElement.results.map((result, index) => {
                        switch (result.type) {
                            case OutcomeResultType.HandBall:
                                return <FoulComponent key={index} player={selectedDefender} isInsideGoalZone={true}/> //TODO: change this when adding zones
                            case OutcomeResultType.LossOfBalance:
                                return <LossOfBalanceComponent key={index} defender={selectedDefender!} threshold={result.threshold!} />;
                            case OutcomeResultType.Injury:
                                return <InjuryComponent key={index} defender={selectedDefender!} threshold={result.threshold!} />;
                            case OutcomeResultType.HeadedClearance:
                                return <HeadedClearanceComponent key={index} defender={selectedDefender!} threshold={result.threshold!} />;
                            case OutcomeResultType.Deflection:
                                return <DeflectionComponent deflectionType={DeflectionType.LooseBall} />;
                            case OutcomeResultType.Failed:
                                return <p key={index}>The shot passed the defender and is reaching the goal.</p>;
                            case OutcomeResultType.GetAction:
                                return <p key={index}>The defender got a free action token to spend.</p>;
                            default:
                                return null;
                        }
                    })}
                </>
            )}
        </div>
    );
};

export default BlockingComponent;
