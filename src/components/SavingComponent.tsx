import React, { useState } from 'react';
import { PlayerSelector } from './generic/PlayerSelector';
import { rollDice } from '../utility/diceUtils';
import { players, goalKeepers, FieldPlayer, Goalkeeper, OutcomeChartElement } from '../types/types';
import {DeflectionType, OutcomeResultType} from '../types/enums';
import { SAVING_OUTCOMES } from '../records/savingOutcomes';
import { DeflectionComponent } from './outcomes/DeflectionComponent';
import { InjuryComponent } from './outcomes/InjuryComponent';
import {GoalkeeperSelector} from './generic/GoalKeeperSelector';

type SavingComponentProps = {
    attacker?: FieldPlayer;
    goalkeeper?: Goalkeeper;
    goalkeeperFalling?: boolean;
};

const calculateSaveResult = (goalkeeper: Goalkeeper, attacker: FieldPlayer, diceRoll: number, goalKeeperDistance: number) => {
    const savingValue = goalkeeper.Saving;
    const shootingValue = attacker.Shooting;
    const resultValue = diceRoll + savingValue - goalKeeperDistance - shootingValue;

    return {saveResult : resultValue, outcome:  SAVING_OUTCOMES[resultValue]};
};

export const SavingComponent: React.FC<SavingComponentProps> = ({ attacker: initialAttacker, goalkeeper: initialGoalkeeper, goalkeeperFalling: initialGoalkeeperFalling }) => {
    const [attacker, setAttacker] = useState<FieldPlayer>(initialAttacker || players[0]);
    const [goalkeeper, setGoalkeeper] = useState<Goalkeeper>(initialGoalkeeper || goalKeepers[0]);
    const [diceRoll, setDiceRoll] = useState<number | null>(null);
    const [goalKeeperDistance, setGoalKeeperDistance] = useState<number>(0);
    const [goalKeeperFalling, setGoalKeeperFalling] = useState<boolean>(!!initialGoalkeeperFalling);
    const [saveOutcome, setSaveOutcome] = useState<OutcomeChartElement | null>(null);
    const [saveResult, setSaveResult] = useState<number | null>(null);

    const handleRollDice = () => {
        const roll = rollDice();
        setDiceRoll(roll);
        setSaveOutcome(null);
        setSaveResult(null)

        if (goalKeeperDistance > 2 || goalKeeperFalling) {
            setSaveOutcome({
                title: "Goal",
                text: `The goalkeeper is ${ goalKeeperDistance > 2 ? 'very far' : 'on the floor' },he can't save the ball, The ball goes into the goal.`,
                results: [{ type: OutcomeResultType.Goal }]
            });
        } else {
            const { saveResult , outcome }= calculateSaveResult(goalkeeper, attacker, roll, goalKeeperDistance);
            setSaveOutcome(outcome);
            setSaveResult(saveResult);
        }
    };

    return (
        <div>
            <h2>Saving Component</h2>
            <>
                {!initialAttacker && (
                    <div>
                        Attacker : <PlayerSelector players={players} selectedPlayer={attacker} onSelect={setAttacker} />
                    </div>
                )}
                {!initialGoalkeeper && (
                    <div>
                        Goalkeeper : <GoalkeeperSelector goalkeepers={goalKeepers} selectedGoalkeeper={goalkeeper} onSelect={setGoalkeeper} />
                    </div>
                )}
                <div>
                    Goalkeeper Distance from Ball Trajectory (max 2):
                    <input
                        type="number"
                        value={goalKeeperDistance}
                        onChange={(e) => setGoalKeeperDistance(Number(e.target.value))}
                    />
                </div>
                <div>
                    Goalkeeper Falling:
                    <input
                        type="checkbox"
                        checked={goalKeeperFalling}
                        onChange={(e) => setGoalKeeperFalling(e.target.checked)}
                    />
                </div>
            </>
            <button onClick={handleRollDice}>Roll Dice</button>
            {diceRoll !== null && saveOutcome  && (
                <>
                    <p>Dice Roll: {diceRoll}</p>
                    <>
                        {
                            saveResult !== null && (
                                <p>Formula: {diceRoll} (Dice Roll) + {goalkeeper!.Saving} (Saving) - {goalKeeperDistance} (Distance) - {attacker!.Shooting} (Shooting) = {saveResult}</p>
                            )
                        }
                        <h3>{saveOutcome.title}</h3>
                        <p>{saveOutcome.text}</p>
                        {saveOutcome.results.map((result, index) => (
                            <div key={index}>
                                {result.type === OutcomeResultType.Deflection && (
                                    <DeflectionComponent deflectionType={DeflectionType.LooseBall} />
                                )}
                                {result.type === OutcomeResultType.Goal && <p>Goal!</p>}
                                {result.type === OutcomeResultType.Injury && <InjuryComponent player={goalkeeper!} threshold={result.threshold!}/>}
                                {result.type === OutcomeResultType.Corner && <p>Corner Kick!</p>}
                                {result.type === OutcomeResultType.Catch && <p>Catch!</p>}
                                {result.type === OutcomeResultType.Save && result.threshold && diceRoll !== null && (
                                    <p>
                                        {diceRoll + goalkeeper!.Saving >= result.threshold ? "Save!" : "Goal!"}
                                    </p>
                                )}
                            </div>
                        ))}
                    </>
                </>
            )}
        </div>
    );
};
