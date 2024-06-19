export type Player = {
    id: number;
    name: string;
    number: number;
    Pace: number;
    Shooting: number;
    Passing: number;
    Defense: number;
    Control: number;
    Head: number;
    Resilience: number;
};

export const players: Player[] = [
    { id: 1, name: 'Player 1', number: 7, Pace: 8, Shooting: 6, Passing: 7, Defense: 5, Control: 7, Head: 6, Resilience: 8 },
    { id: 2, name: 'Player 2', number: 10, Pace: 7, Shooting: 9, Passing: 8, Defense: 6, Control: 8, Head: 5, Resilience: 7 },
    // Add more players as needed
];