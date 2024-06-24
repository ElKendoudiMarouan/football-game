import {OutcomeResultType, PlayerStat} from './enums';

export type FieldPlayer = {
    id: number;
    name: string;
    number: number;
    isGoalKeeper: false;
    [PlayerStat.Pace]: number;
    [PlayerStat.Shooting]: number;
    [PlayerStat.Passing]: number;
    [PlayerStat.Defense]: number;
    [PlayerStat.Dribble]: number;
    [PlayerStat.Header]: number;
    [PlayerStat.Physique]: number;
};

export type Goalkeeper = {
    id: number;
    name: string;
    number: number;
    isGoalKeeper: true;
    [PlayerStat.Pace]: number;
    [PlayerStat.Saving]: number;
    [PlayerStat.Passing]: number;
    [PlayerStat.Defense]: number;
    [PlayerStat.Handling]: number;
    [PlayerStat.Header]: number;
    [PlayerStat.Physique]: number;
};

export type Player = FieldPlayer | Goalkeeper;

export const players: FieldPlayer[] = [
    { id: 1, name: 'Player 1', isGoalKeeper: false, number: 7, Pace: 8, Shooting: 6, Passing: 7, Defense: 5, Dribble: 7, Header: 6, Physique: 8 },
    { id: 2, name: 'Player 2', isGoalKeeper: false, number: 10, Pace: 7, Shooting: 9, Passing: 8, Defense: 6, Dribble: 8, Header: 5, Physique: 7 },
];

export const goalKeepers: Goalkeeper[] = [
    { id: 2, name: 'Gk 1', isGoalKeeper: true, number: 10, Pace: 7, Saving: 7, Passing: 8, Defense: 6, Handling: 8, Header: 7, Physique: 7 },
]

interface OutcomeResult {
    type: OutcomeResultType;
    threshold?: number;
    statName?: PlayerStat;
}

export interface OutcomeChartElement {
    title: string;
    text: string;
    results: OutcomeResult[];
}
