import type { Match } from '../entities/Match';
import type { Standing } from '../entities/Standing';
import type { Team } from '../../../teams/domain/entities/Team';

/**
 * Contrato (interface) do repositório de grupos.
 * A camada de domínio define APENAS o contrato — não sabe como os dados chegam.
 */
export interface IGroupRepository {
    getGroups(): string[];
    getTeamsByGroup(groupLetter: string): Team[];
    getAllTeams(): Team[];
    getMatches(): Match[];
    getMatchesByStatus(status: 'completed' | 'upcoming'): Match[];
    calculateGroupStandings(groupLetter: string): Standing[];
}
