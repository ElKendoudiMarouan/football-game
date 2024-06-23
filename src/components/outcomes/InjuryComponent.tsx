import {Player} from '../../types/types';
import React from 'react';

export const InjuryComponent: React.FC<{ defender: Player, threshold: number }> = ({ defender, threshold }) => {
    const injured = defender.Physique < threshold;
    return (
        <div>
            <h4>Injury</h4>
            <p>Defender Physique ({defender.Physique}) {!injured ? '≥' : ' <'}Threshold ({threshold})</p>
            {injured ? <p>The defender is injured.</p> : <p>The defender is not injured.</p>}
        </div>
    );
};

