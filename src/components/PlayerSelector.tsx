import React from 'react';
import { Player } from '../types/types';

type PlayerSelectorProps = {
    players: Player[];
    selectedPlayer: Player | null;
    disabled: boolean;
    onSelect: (player: Player) => void;
};

export const PlayerSelector: React.FC<PlayerSelectorProps> = ({ players, selectedPlayer, disabled,  onSelect }) => (
    <label>
        Player:
        <select
            value={selectedPlayer ? selectedPlayer.id : ''}
            disabled={disabled}
            onChange={(e) => onSelect(players.find(p => p.id === parseInt(e.target.value)) as Player)}
        >
            {players.map(player => (
                <option key={player.id} value={player.id}>{player.name}</option>
            ))}
        </select>
    </label>
);
