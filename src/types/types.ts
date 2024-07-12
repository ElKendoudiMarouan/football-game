import {OutcomeResultType, PlayerStat, TeamType} from './enums';

export interface FieldPlayer {
    id: number;
    team: TeamType;
    name: string;
    number: number;
    isGoalKeeper?: boolean;
    [PlayerStat.Pace]: number;
    [PlayerStat.Passing]: number;
    [PlayerStat.Defense]: number;
    [PlayerStat.Header]: number;
    [PlayerStat.Physique]: number;
    [PlayerStat.Shooting]: number;
    [PlayerStat.Dribble]: number;
}

export interface Goalkeeper extends FieldPlayer {
    isGoalKeeper: true;
    [PlayerStat.Saving]: number;
    [PlayerStat.Handling]: number;
}

export type Player = FieldPlayer | Goalkeeper;

export type Team = {
    type: TeamType;
    name: string;
    score: number;
    players: FieldPlayer[];
    goalkeeper: Goalkeeper;
};

export type MatchData = {
    teams: Team[];
    time: number;
};

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

//Init: TODO change file
export const homePlayers: FieldPlayer[] = [
    { id: 1, name: 'Home 1', team: TeamType.Home, isGoalKeeper: false, number: 7, Pace: 8, Shooting: 6, Passing: 7, Defense: 5, Dribble: 7, Header: 6, Physique: 8 },
    { id: 2, name: 'Home 2', team: TeamType.Home, isGoalKeeper: false, number: 10, Pace: 7, Shooting: 9, Passing: 8, Defense: 6, Dribble: 8, Header: 5, Physique: 7 },
];

export const visitorPlayers: FieldPlayer[] = [
    { id: 1, name: 'Visitor 1', team: TeamType.Visitor, isGoalKeeper: false, number: 7, Pace: 8, Shooting: 6, Passing: 7, Defense: 5, Dribble: 7, Header: 6, Physique: 8 },
    { id: 2, name: 'Visitor 2', team: TeamType.Visitor, isGoalKeeper: false, number: 10, Pace: 7, Shooting: 9, Passing: 8, Defense: 6, Dribble: 8, Header: 5, Physique: 7 },
];

export const homeGoalKeepers: Goalkeeper[] = [
    { id: 2, name: 'Home Gk 1', team: TeamType.Home, isGoalKeeper: true, number: 10, Pace: 7, Saving: 7, Passing: 8, Defense: 6, Handling: 8, Header: 7, Physique: 7, Shooting: 3,  Dribble: 4 },
]

export const visitorGoalKeepers: Goalkeeper[] = [
    { id: 2, name: 'Home Gk 1', team: TeamType.Visitor, isGoalKeeper: true, number: 10, Pace: 7, Saving: 7, Passing: 8, Defense: 6, Handling: 8, Header: 7, Physique: 7, Shooting: 3,  Dribble: 4 },
]

const homeTeam: Team = {
    type: TeamType.Home,
    name: 'home',
    score: 0,
    players: homePlayers,
    goalkeeper: homeGoalKeepers[0]
}

const visitingTeam: Team = {
    type: TeamType.Visitor,
    name: 'visiting',
    score: 0,
    players: visitorPlayers,
    goalkeeper: visitorGoalKeepers[0]
}

export const matchData: MatchData = {
    time: 0,
    teams: [homeTeam, visitingTeam]
}