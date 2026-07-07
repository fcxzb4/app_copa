import type { ITeamRepository, TeamFilters } from '../repositories/ITeamRepository';
import type { Team } from '../entities/Team';

/**
 * Use Case: Buscar times com filtros opcionais de busca e confederação.
 */
export class GetTeamsUseCase {
    constructor(private readonly teamRepository: ITeamRepository) {}

    execute(filters?: TeamFilters): Team[] {
        if (filters) {
            return this.teamRepository.getTeamsByFilters(filters);
        }
        return this.teamRepository.getAllTeams();
    }
}
