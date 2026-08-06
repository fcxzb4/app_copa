import { GroupRepository } from '../data/repositories/GroupRepository';
import { localGroupDataSource } from '../data/datasources/localGroupDataSource';

describe('GroupRepository', () => {
    let repository: GroupRepository;

    beforeEach(() => {
        repository = new GroupRepository();
    });

    it('getGroups() deve retornar os grupos do localGroupDataSource', () => {
        const groups = repository.getGroups();
        expect(groups).toEqual(localGroupDataSource.getGroupLetters());
    });

    it('getTeamsByGroup() deve retornar os times do grupo do localGroupDataSource', () => {
        const teams = repository.getTeamsByGroup('C');
        expect(teams).toEqual(localGroupDataSource.getTeamsByGroup('C'));
    });

    it('getAllTeams() deve retornar todas as seleções', () => {
        const teams = repository.getAllTeams();
        expect(teams).toEqual(localGroupDataSource.getAllTeams());
    });

    it('getMatches() deve retornar todas as partidas', () => {
        const matches = repository.getMatches();
        expect(matches).toEqual(localGroupDataSource.getAllMatches());
    });

    it('getMatchesByStatus() deve retornar partidas filtradas por status', () => {
        const completed = repository.getMatchesByStatus('completed');
        expect(completed).toEqual(localGroupDataSource.getMatchesByStatus('completed'));
    });

    it('calculateGroupStandings() deve retornar a classificação do grupo', () => {
        const standings = repository.calculateGroupStandings('C');
        expect(standings).toEqual(localGroupDataSource.calculateGroupStandings('C'));
    });
});
