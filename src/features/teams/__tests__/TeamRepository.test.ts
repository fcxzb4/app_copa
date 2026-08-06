import { TeamRepository } from '../data/repositories/TeamRepository';
import { localTeamDataSource } from '../data/datasources/localTeamDataSource';

describe('TeamRepository', () => {
    let repository: TeamRepository;

    beforeEach(() => {
        repository = new TeamRepository();
    });

    it('getAllTeams() deve retornar todas as seleções', () => {
        const teams = repository.getAllTeams();
        expect(teams).toEqual(localTeamDataSource.getAllTeams());
    });

    it('getTeamById() deve retornar a seleção com o id correspondente', () => {
        const brasil = repository.getTeamById('BRA');
        expect(brasil).toEqual(localTeamDataSource.getTeamById('BRA'));
    });

    it('getTeamsByFilters() deve filtrar seleções por nome e confederação', () => {
        const filtered = repository.getTeamsByFilters({ searchQuery: 'Brasil', confederation: 'CONMEBOL' });
        expect(filtered).toEqual(localTeamDataSource.getTeamsByFilters({ searchQuery: 'Brasil', confederation: 'CONMEBOL' }));
    });
});
