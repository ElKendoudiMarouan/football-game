import React from 'react';
import {FieldPlayer, Player} from '../../types/types';
import {DeflectionType} from '../../types/enums';
import {DeflectionComponent} from './DeflectionComponent';

type HeadedClearanceProps = {
    defender: Player,
    threshold: number,
    lastPlayerTouchingBall: FieldPlayer;
};

export const HeadedClearanceComponent: React.FC<HeadedClearanceProps> = ({ defender, threshold, lastPlayerTouchingBall }) => {
    const success = defender.Header >= threshold;
    return (
        <div>
            <h4>Headed Clearance</h4>
            <p>Defender Header ({defender.Header}) {success ? '≥' : ' <'} Threshold ({threshold})</p>
            {success ? (
                <>
                    <p>The result is Deflection.</p>
                    <DeflectionComponent
                        deflectionType={DeflectionType.LooseBall}
                        lastPlayerTouchingBall={lastPlayerTouchingBall}
                    />
                </>
            ) : <p>The headed clearance failed.</p>}
        </div>
    );
};