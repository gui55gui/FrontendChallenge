import * as angular from "angular";
import { EToasterType, IToaster } from "../interface/ToasterInterface";
import { ITournament, ITeam } from "../interface/TournamentInterface";

interface ITournamentScope {
    model: {
        TOURNAMENT: ITournament,
        TEAMS: ITeam[]
    };
    modalTeams: ITeam[];
    resetTournament: () => void;
    manageTeams: () => void;
    manageTeamsSave: () => void;
    setQuarterFinalWinner: (stage: number, teamId: number) => void;
    setFinalWinner: (teamId: number) => void;
}

export default class TournamentCtrl {
    static $inject: string[] = ['$scope', 'toaster'];
    private $scope: ITournamentScope;
    private $toaster: IToaster;

    constructor($scope: ITournamentScope, $toaster: IToaster) {
        this.$scope = $scope;
        this.$toaster = $toaster;
    }

    async $onInit(): Promise<void> {
        try {
            this.initModel();
            this.initScopeFunctions();
            this.initTournament();
        } catch (ex) {
            this.$toaster.pop({ type: EToasterType.ERROR, body: ex });
        }
    }

    private initModel(): void {
        this.$scope.model = {
            TOURNAMENT: {
                QUARTER_FINAL: null,
                SEMI_FINAL: null,
                WINNER: null
            },
            TEAMS: [
                { ID: 1, NAME: "Team A" },
                { ID: 2, NAME: "Team B" },
                { ID: 3, NAME: "Team C" },
                { ID: 4, NAME: "Team D" }
            ]
        };
    }

    private initScopeFunctions(): void {
        this.$scope.resetTournament = () => {
            this.initModel();
            this.initTournament(true);
        }

        this.$scope.manageTeams = () => {
            this.$scope.modalTeams = angular.copy(this.$scope.model.TEAMS);
            $('#manageTeamModal').modal({
                backdrop: 'static',
                keyboard: false,
                focus: true
            });
        };

        this.$scope.manageTeamsSave = () => {
            if (this.hasRequiredElements('#manageTeamModal')) return this.$toaster.pop({ type: EToasterType.ERROR, title: 'Erro', body: 'Preencha todos os campos para continuar.' })
            this.$scope.model.TEAMS = angular.copy(this.$scope.modalTeams);
            this.initTournament(false, true);
            $('#manageTeamModal').modal('hide');
        };

        this.$scope.setQuarterFinalWinner = (stage, teamId) => {
            const winnerTeam = this.$scope.model.TEAMS.find(team => team.ID == teamId);
            if (stage == 0) this.$scope.model.TOURNAMENT.SEMI_FINAL.FIRST_TEAM = winnerTeam;
            else this.$scope.model.TOURNAMENT.SEMI_FINAL.SECOND_TEAM = winnerTeam;
        };

        this.$scope.setFinalWinner = (teamId) => {
            const winnerTeam = this.$scope.model.TEAMS.find(team => team.ID == teamId);
            this.$scope.model.TOURNAMENT.WINNER = winnerTeam;
        };
    }

    private initTournament(isReset?: boolean, isTeamUpdate?: boolean) {
        try {
            this.$scope.model.TOURNAMENT.QUARTER_FINAL = [{ FIRST_TEAM: null, SECOND_TEAM: null }, { FIRST_TEAM: null, SECOND_TEAM: null }];
            this.$scope.model.TOURNAMENT.SEMI_FINAL = { FIRST_TEAM: null, SECOND_TEAM: null };
            this.$scope.model.TOURNAMENT.WINNER = null;
            if (this.$scope.model.TEAMS && this.$scope.model.TEAMS.length && this.$scope.model.TEAMS.length == 4) {
                this.$scope.model.TOURNAMENT.QUARTER_FINAL = [{ FIRST_TEAM: this.$scope.model.TEAMS[0], SECOND_TEAM: this.$scope.model.TEAMS[1] }, { FIRST_TEAM: this.$scope.model.TEAMS[2], SECOND_TEAM: this.$scope.model.TEAMS[3] }];
                this.$toaster.pop({ type: EToasterType.SUCCESS, body: isTeamUpdate ? 'Times atualizados com sucesso.' : isReset ? 'Torneio reiniciado com sucesso.' : 'Torneio iniciado com sucesso.' });
            }
        } catch (ex) {
            this.$toaster.pop({ type: EToasterType.ERROR, body: ex });
        }
    }

    private hasRequiredElements = (context = ''): boolean => {
        try {
            const selector: string = (context == '') ? 'input, textarea, select, .ui-select-container' : `${context} input, ${context} textarea, ${context} select, ${context} .ui-select-container`;
            const requireds = angular.element(selector).filter('[required]:visible, [ui-select-required]:visible');

            let requiredElements = false;
            Array.from(requireds).forEach(elem => {

                let element = angular.element(elem);
                let isInvalid = element.hasClass('ng-invalid-required') || element.hasClass('ng-invalid-ui-select-required');

                if (isInvalid) {
                    requiredElements = true;
                    return;
                }

            });
            return requiredElements;
        } catch (ex) {
            this.$toaster.pop({ type: EToasterType.ERROR, body: ex });
        }
    }

}