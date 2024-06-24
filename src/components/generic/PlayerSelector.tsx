import React from 'react';
import { FieldPlayer } from '../../types/types';

type FieldPlayerSelectorProps = {
    players: FieldPlayer[];
    selectedPlayer: FieldPlayer | null;
    disabled?: boolean;
    onSelect: (player: FieldPlayer) => void;
};

export const PlayerSelector: React.FC<FieldPlayerSelectorProps> = ({ players, selectedPlayer, disabled, onSelect }) => (
    <label>
        <select
            value={selectedPlayer ? selectedPlayer.id : ''}
            disabled={disabled}
            onChange={(e) => onSelect(players.find(p => p.id === parseInt(e.target.value)) as FieldPlayer)}
        >
            {players.map(player => (
                <option key={player.id} value={player.id}>{player.name}</option>
            ))}
        </select>
    </label>
);