import type { Team } from '../entities/Team';
import type { Confederation } from '../../../../shared/domain/entities';

export interface TeamFilters {
    searchQuery?: string;
    confederation?: Confederation | 'ALL';
}

/**
 * Contrato (interface) do repositório de times.
 * A camada de domínio define APENAS o contrato — não sabe como os dados chegam.
 */
export interface ITeamRepository {
    getAllTeams(): Team[];
    getTeamById(id: string): Team | undefined;
    getTeamsByFilters(filters: TeamFilters): Team[];
}
