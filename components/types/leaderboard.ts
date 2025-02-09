export interface IGame {
    id: string;
    name: string;
    backgroundImage: string;
    shortName?: string;
}

export interface IPlayerRank {
    rank: number;
    playerName: string;
    points: number;
}
