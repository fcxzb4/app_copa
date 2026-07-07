import { localTeamDataSource } from '../datasources/localTeamDataSource';
import type { ITeamRepository, TeamFilters } from '../../domain/repositories/ITeamRepository';
import type { Team } from '../../domain/entities/Team';

/**
 * Implementação concreta do ITeamRepository.
 * Usa o localTeamDataSource como fonte de dados.
 * Esta classe pertence à camada de Data — não ao Domain.
 */
export class TeamRepository implements ITeamRepository {
    getAllTeams(): Team[] {
        return localTeamDataSource.getAllTeams();
    }

    getTeamById(id: string): Team | undefined {
        return localTeamDataSource.getTeamById(id);
    }

    getTeamsByFilters(filters: TeamFilters): Team[] {
        return localTeamDataSource.getTeamsByFilters(filters);
    }
}
