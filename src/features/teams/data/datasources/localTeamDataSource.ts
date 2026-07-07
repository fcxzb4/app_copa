import { teams } from '../../../../shared/data/worldCupData';
import type { Team } from '../../domain/entities/Team';
import type { TeamFilters } from '../../domain/repositories/ITeamRepository';

/**
 * Data Source local para times.
 * Responsável por fornecer dados brutos da fonte estática (worldCupData).
 * Não contém lógica de negócio.
 */
export const localTeamDataSource = {
    getAllTeams(): Team[] {
        return teams;
    },

    getTeamById(id: string): Team | undefined {
        return teams.find(t => t.id === id);
    },

    getTeamsByFilters(filters: TeamFilters): Team[] {
        return teams.filter(team => {
            const matchesSearch = filters.searchQuery
                ? team.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
                : true;
            const matchesConfed = !filters.confederation || filters.confederation === 'ALL'
                ? true
                : team.confederation === filters.confederation;
            return matchesSearch && matchesConfed;
        });
    },
};
