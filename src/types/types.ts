import {BlockResultType, PlayerStat} from '../utility/enums';

export type Player = {
    id: number;
    name: string;
    number: number;
    [PlayerStat.Pace]: number;
    [PlayerStat.Shooting]: number;
    [PlayerStat.Passing]: number;
    [PlayerStat.Defense]: number;
    [PlayerStat.Dribble]: number;
    [PlayerStat.Header]: number;
    [PlayerStat.Physique]: number;
};

export const players: Player[] = [
    { id: 1, name: 'Player 1', number: 7, Pace: 8, Shooting: 6, Passing: 7, Defense: 5, Dribble: 7, Header: 6, Physique: 8 },
    { id: 2, name: 'Player 2', number: 10, Pace: 7, Shooting: 9, Passing: 8, Defense: 6, Dribble: 8, Header: 5, Physique: 7 },
    // Add more players as needed
];

interface BlockResult {
    type: BlockResultType;
    threshold?: number;
    statName?: PlayerStat;
}

export interface BlockResultChartElement {
    title: string;
    text: string;
    results: BlockResult[];
}
