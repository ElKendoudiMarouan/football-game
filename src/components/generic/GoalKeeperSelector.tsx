import React from 'react';
import {Goalkeeper} from '../../types/types';

type GoalkeeperSelectorProps = {
    goalkeepers: Goalkeeper[];
    selectedGoalkeeper: Goalkeeper | null;
    disabled?: boolean;
    onSelect: (goalkeeper: Goalkeeper) => void;
};

export const GoalkeeperSelector: React.FC<GoalkeeperSelectorProps> = ({ goalkeepers, selectedGoalkeeper, disabled, onSelect }) => (
    <label>
        <select
            value={selectedGoalkeeper ? selectedGoalkeeper.id : ''}
            disabled={disabled}
            onChange={(e) => onSelect(goalkeepers.find(p => p.id === parseInt(e.target.value)) as Goalkeeper)}
        >
            {goalkeepers.map(player => (
                <option key={player.id} value={player.id}>{player.name}</option>
            ))}
        </select>
    </label>
);