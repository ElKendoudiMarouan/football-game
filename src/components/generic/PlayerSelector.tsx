import React, { useState, useEffect } from 'react';
import { TeamSelector } from './TeamSelector';
import {FieldPlayer, Team} from '../../types/types';

type PlayerSelectorProps = {
    text: string;
    disabled?: boolean;
    selectedPlayer: FieldPlayer | null; //TODO: add selected team
    onSelect: (player: FieldPlayer) => void;
};

export const PlayerSelector: React.FC<PlayerSelectorProps> = ({ text, selectedPlayer, disabled, onSelect }) => {
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [availablePlayers, setAvailablePlayers] = useState<FieldPlayer[]>([]);

    useEffect(() => {
        if (selectedTeam) {
            setAvailablePlayers(selectedTeam.players);
        } else {
            setAvailablePlayers([]);
        }
    }, [selectedTeam]);

    return (
        <div>
            {text}:
            <TeamSelector
                selectedTeam={selectedTeam}
                onSelect={setSelectedTeam}
                disabled={disabled}
            />
            {selectedTeam && (
                <label>
                    Select player:
                    <select
                        value={selectedPlayer ? selectedPlayer.id : ''}
                        disabled={disabled}
                        onChange={(e) => onSelect(availablePlayers.find(p => p.id === parseInt(e.target.value)) as FieldPlayer)}
                    >
                        <option value="">Select Player</option>
                        {availablePlayers.map(player => (
                            <option key={player.id} value={player.id}>{player.name}</option>
                        ))}
                    </select>
                </label>
            )}
        </div>
    );
};
