import React, {useCallback, useState} from 'react';
import {FieldPlayer, matchData} from '../../types/types';
import {OutcomeResultType} from '../../types/enums';
import {PlayerSelector} from '../generic/PlayerSelector';

type OutOfBoundsBallComponentProps = {
    type?: OutcomeResultType;
    lastPlayerTouchingBall?: FieldPlayer;
    ballPositionUnknown?: boolean;
};

/**
 *
 * @types
 * OutcomeResultType.BallInField
 * OutcomeResultType.Corner
 * OutcomeResultType.ThrowIn
 * OutcomeResultType.GoalKick
 */
const OutOfBoundsBallComponent: React.FC<OutOfBoundsBallComponentProps> = ({ type, lastPlayerTouchingBall, ballPositionUnknown }) => {
    const [selectedType, setSelectedType] = useState<OutcomeResultType | null>(type || null); //TODO bugg if type passed and not player (excpected)
    const [selectedLastPlayerTouchingBall, setSelectedLastPlayerTouchingBall] = useState<FieldPlayer | null>(lastPlayerTouchingBall || null);
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);//todo add behavior for when type passed (button don't need to be clicked)

    const findSelectedLastTeamTouchingBall = useCallback((player: FieldPlayer) => {
        return matchData.teams.find(team => team.type === player?.team)!;
    }, [selectedLastPlayerTouchingBall, matchData.teams]);


    const handleTypeChange = (type: OutcomeResultType) => {
        setSelectedType(type);
        setButtonClicked(true);
    };

    const possibleOutcomes = [OutcomeResultType.GoalKick, OutcomeResultType.ThrowIn, OutcomeResultType.Corner];

    return (
        <div>
            { !lastPlayerTouchingBall && (
                <>
                    <PlayerSelector
                        text={'Last player touching ball'}
                        selectedPlayer={selectedLastPlayerTouchingBall!} onSelect={setSelectedLastPlayerTouchingBall} disabled={buttonClicked}/>
                </>
            )}
            { (!lastPlayerTouchingBall || !type) && (
                <>
                    { ballPositionUnknown && (
                        <>
                            <button onClick={() => handleTypeChange(OutcomeResultType.BallInField)} disabled={!selectedLastPlayerTouchingBall || buttonClicked}>Not Out</button>
                        </>
                    )}
                    { possibleOutcomes.map(outcome => <button key={outcome} onClick={() => handleTypeChange(outcome)}  disabled={!selectedLastPlayerTouchingBall || buttonClicked}>{outcome}</button>) }
                </>
            )}
            {selectedType && selectedLastPlayerTouchingBall && (
                <div>
                    { selectedType === OutcomeResultType.BallInField ? (
                        <p>Ball is still in the field, continue playing</p>
                    ) : (
                        <p>Player {selectedLastPlayerTouchingBall.name} from {findSelectedLastTeamTouchingBall(selectedLastPlayerTouchingBall).name} sent ball out, other team Benefits from a {selectedType}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default OutOfBoundsBallComponent;
