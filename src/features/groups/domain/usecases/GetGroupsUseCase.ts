import type { IGroupRepository } from '../repositories/IGroupRepository';
import type { Team } from '../../../teams/domain/entities/Team';

/**
 * Use Case: Buscar todos os grupos com seus times.
 * Orquestra a lógica de negócio — não sabe de onde os dados vêm.
 */
export class GetGroupsUseCase {
    constructor(private readonly groupRepository: IGroupRepository) {}

    execute(): { groupLetter: string; teams: Team[] }[] {
        const groups = this.groupRepository.getGroups();
        return groups.map(groupLetter => ({
            groupLetter,
            teams: this.groupRepository.getTeamsByGroup(groupLetter),
        }));
    }
}
