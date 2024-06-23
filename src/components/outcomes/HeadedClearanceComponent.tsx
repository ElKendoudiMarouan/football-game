import React from 'react';
import {Player} from '../../types/types';
import {DeflectionType} from '../../types/enums';
import {DeflectionComponent} from './DeflectionComponent';

export const HeadedClearanceComponent: React.FC<{ defender: Player, threshold: number }> = ({ defender, threshold }) => {
    const success = defender.Header >= threshold;
    return (
        <div>
            <h4>Headed Clearance</h4>
            <p>Defender Header ({defender.Header}) {success ? '≥' : ' <'} Threshold ({threshold})</p>
            {success ? (
                <>
                    <p>The result is Deflection.</p>
                    <DeflectionComponent  deflectionType={DeflectionType.LooseBall}/>
                </>
            ) : <p>The headed clearance failed.</p>}
        </div>
    );
};