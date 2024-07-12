import React, { useState } from 'react';
import { PlayerSelector } from './generic/PlayerSelector';
import { rollDice } from '../utility/diceUtils';
import { FieldPlayer, Goalkeeper, OutcomeChartElement } from '../types/types';
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
    const [selectedAttacker, setSelectedAttacker] = useState<FieldPlayer | null>(initialAttacker || null);
    const [selectedGoalkeeper, setSelectedGoalkeeper] = useState<Goalkeeper | null>(initialGoalkeeper || null);
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
            const { saveResult , outcome }= calculateSaveResult(selectedGoalkeeper!, selectedAttacker!, roll, goalKeeperDistance);
            setSaveOutcome(outcome);
            setSaveResult(saveResult);
        }
    };
        //TODO select goalkeeper automatically just by selecting attacker? (except in deflcetion)
    return (
        <div>
            <h2>Saving Component</h2>
            <>
                {!initialAttacker && (
                    <div>
                        <PlayerSelector text={'Select Shooter'} selectedPlayer={selectedAttacker} onSelect={setSelectedAttacker} />
                    </div>
                )}
                {!initialGoalkeeper && (
                    <div>
                        <GoalkeeperSelector text={`Select Goalkeeper`} selectedGoalkeeper={selectedGoalkeeper} onSelect={setSelectedGoalkeeper} />
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
            <button onClick={handleRollDice} disabled={!selectedAttacker && !selectedGoalkeeper}>Roll Dice</button>
            {diceRoll !== null && saveOutcome  && (
                <>
                    <p>Dice Roll: {diceRoll}</p>
                    <>
                        {
                            saveResult !== null && (
                                <p>Formula: {diceRoll} (Dice Roll) + {selectedGoalkeeper!.Saving} (Saving) - {goalKeeperDistance} (Distance) - {selectedAttacker!.Shooting} (Shooting) = {saveResult}</p>
                            )
                        }
                        <h3>{saveOutcome.title}</h3>
                        <p>{saveOutcome.text}</p>
                        {saveOutcome.results.map((result, index) => (
                            <div key={index}>
                                {result.type === OutcomeResultType.Deflection && (
                                    <DeflectionComponent deflectionType={DeflectionType.LooseBall} lastPlayerTouchingBall={selectedGoalkeeper! as FieldPlayer}/>
                                )}
                                {result.type === OutcomeResultType.Goal && <p>Goal!</p>}
                                {result.type === OutcomeResultType.Injury && <InjuryComponent player={selectedGoalkeeper!} threshold={result.threshold!}/>}
                                {result.type === OutcomeResultType.Corner && <p>Corner Kick!</p>}
                                {result.type === OutcomeResultType.Catch && <p>Catch!</p>}
                                {result.type === OutcomeResultType.Save && result.threshold && diceRoll !== null && (
                                    <p>
                                        {diceRoll + selectedGoalkeeper!.Saving >= result.threshold ? "Save!" : "Goal!"}
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
