import type { IGroupRepository } from '../repositories/IGroupRepository';
import type { Match } from '../entities/Match';

/**
 * Use Case: Buscar partidas filtradas por status.
 */
export class GetMatchesUseCase {
    constructor(private readonly groupRepository: IGroupRepository) {}

    execute(status?: 'completed' | 'upcoming'): Match[] {
        if (status) {
            return this.groupRepository.getMatchesByStatus(status);
        }
        return this.groupRepository.getMatches();
    }
}
