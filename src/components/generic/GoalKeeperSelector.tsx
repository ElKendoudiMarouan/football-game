import React, { useEffect, useState } from 'react';
import { Goalkeeper, Team } from '../../types/types';
import { TeamSelector } from './TeamSelector';

type GoalkeeperSelectorProps = {
    text: string;
    selectedGoalkeeper: Goalkeeper | null;
    disabled?: boolean;
    onSelect: (goalkeeper: Goalkeeper | null) => void;
};

export const GoalkeeperSelector: React.FC<GoalkeeperSelectorProps> = ({ text, selectedGoalkeeper, disabled, onSelect }) => {
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    useEffect(() => {
        if (selectedTeam) {
            onSelect(selectedTeam.goalkeeper);
        } else {
            onSelect(null);
        }
    }, [selectedTeam, onSelect]);

    return (
        <div>
            {!selectedGoalkeeper && (
                <>
                    {text}:
                    <TeamSelector
                        selectedTeam={selectedTeam}
                        onSelect={setSelectedTeam}
                        disabled={disabled || !!selectedTeam}
                    />
                </>
            )}
            {selectedTeam && (
                <label>
                    Selected goalkeeper: {selectedTeam.goalkeeper.name}
                </label>
            )}
        </div>
    );
};
