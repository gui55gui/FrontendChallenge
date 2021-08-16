export interface ITournament {
    QUARTER_FINAL: IStage[];
    SEMI_FINAL: IStage;
    WINNER: ITeam;
}

export interface IStage {
    FIRST_TEAM: ITeam;
    SECOND_TEAM: ITeam;
}

export interface ITeam {
    ID: number;
    NAME: string;
}