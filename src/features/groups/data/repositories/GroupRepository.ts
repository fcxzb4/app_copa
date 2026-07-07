import { localGroupDataSource } from '../datasources/localGroupDataSource';
import type { IGroupRepository } from '../../domain/repositories/IGroupRepository';
import type { Match } from '../../domain/entities/Match';
import type { Standing } from '../../domain/entities/Standing';
import type { Team } from '../../../teams/domain/entities/Team';

/**
 * Implementação concreta do IGroupRepository.
 * Usa o localGroupDataSource como fonte de dados.
 * Esta classe pertence à camada de Data — não ao Domain.
 */
export class GroupRepository implements IGroupRepository {
    getGroups(): string[] {
        return localGroupDataSource.getGroupLetters();
    }

    getTeamsByGroup(groupLetter: string): Team[] {
        return localGroupDataSource.getTeamsByGroup(groupLetter);
    }

    getAllTeams(): Team[] {
        return localGroupDataSource.getAllTeams();
    }

    getMatches(): Match[] {
        return localGroupDataSource.getAllMatches();
    }

    getMatchesByStatus(status: 'completed' | 'upcoming'): Match[] {
        return localGroupDataSource.getMatchesByStatus(status);
    }

    calculateGroupStandings(groupLetter: string): Standing[] {
        return localGroupDataSource.calculateGroupStandings(groupLetter);
    }
}
