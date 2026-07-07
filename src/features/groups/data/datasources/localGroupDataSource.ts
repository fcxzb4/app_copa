import { teams, matches, calculateGroupStandings } from '../../../../shared/data/worldCupData';
import type { Team } from '../../../teams/domain/entities/Team';
import type { Match } from '../../domain/entities/Match';
import type { Standing } from '../../domain/entities/Standing';

/**
 * Data Source local para grupos.
 * Responsável por fornecer dados brutos da fonte estática (worldCupData).
 * Não contém lógica de negócio.
 */
export const localGroupDataSource = {
    getAllTeams(): Team[] {
        return teams;
    },

    getTeamsByGroup(groupLetter: string): Team[] {
        return teams.filter(t => t.group === groupLetter);
    },

    getAllMatches(): Match[] {
        return matches;
    },

    getMatchesByStatus(status: 'completed' | 'upcoming'): Match[] {
        return matches.filter(m => m.status === status);
    },

    calculateGroupStandings(groupLetter: string): Standing[] {
        return calculateGroupStandings(groupLetter);
    },

    getGroupLetters(): string[] {
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    },
};
