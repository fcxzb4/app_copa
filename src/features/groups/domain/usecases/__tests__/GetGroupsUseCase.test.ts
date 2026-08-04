import { GetGroupsUseCase } from '../GetGroupsUseCase';
import type { IGroupRepository } from '../../repositories/IGroupRepository';
import type { Team } from '../../../../teams/domain/entities/Team';
import type { Match } from '../../entities/Match';
import type { Standing } from '../../entities/Standing';

// ── Mock do repositório via injeção de dependência ─────────────────────────

const mockTeamA: Team = {
    id: 'BRA',
    name: 'Brasil',
    flag: '🇧🇷',
    confederation: 'CONMEBOL',
    group: 'C',
};

const mockTeamB: Team = {
    id: 'MAR',
    name: 'Marrocos',
    flag: '🇲🇦',
    confederation: 'CAF',
    group: 'C',
};

const mockRepository: IGroupRepository = {
    getGroups: jest.fn(() => ['A', 'B', 'C']),
    getTeamsByGroup: jest.fn((groupLetter: string) => {
        if (groupLetter === 'C') return [mockTeamA, mockTeamB];
        return [];
    }),
    getAllTeams: jest.fn(() => [mockTeamA, mockTeamB]),
    getMatches: jest.fn(() => [] as Match[]),
    getMatchesByStatus: jest.fn(() => [] as Match[]),
    calculateGroupStandings: jest.fn(() => [] as Standing[]),
};

// ── Testes ─────────────────────────────────────────────────────────────────

describe('GetGroupsUseCase', () => {
    let useCase: GetGroupsUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        useCase = new GetGroupsUseCase(mockRepository);
    });

    it('deve retornar um objeto por grupo com groupLetter e teams', () => {
        const result = useCase.execute();

        expect(result).toHaveLength(3);
        expect(result[0]).toHaveProperty('groupLetter', 'A');
        expect(result[0]).toHaveProperty('teams');
        expect(result[1]).toHaveProperty('groupLetter', 'B');
        expect(result[2]).toHaveProperty('groupLetter', 'C');
    });

    it('deve chamar getGroups no repositório exatamente uma vez', () => {
        useCase.execute();
        expect(mockRepository.getGroups).toHaveBeenCalledTimes(1);
    });

    it('deve chamar getTeamsByGroup para cada grupo retornado', () => {
        useCase.execute();
        expect(mockRepository.getTeamsByGroup).toHaveBeenCalledTimes(3);
        expect(mockRepository.getTeamsByGroup).toHaveBeenCalledWith('A');
        expect(mockRepository.getTeamsByGroup).toHaveBeenCalledWith('B');
        expect(mockRepository.getTeamsByGroup).toHaveBeenCalledWith('C');
    });

    it('deve mapear os times corretamente para o grupo C', () => {
        const result = useCase.execute();
        const groupC = result.find(g => g.groupLetter === 'C');

        expect(groupC).toBeDefined();
        expect(groupC!.teams).toHaveLength(2);
        expect(groupC!.teams[0].id).toBe('BRA');
        expect(groupC!.teams[1].id).toBe('MAR');
    });

    it('deve retornar array vazio de times para grupos sem times', () => {
        const result = useCase.execute();
        const groupA = result.find(g => g.groupLetter === 'A');

        expect(groupA).toBeDefined();
        expect(groupA!.teams).toHaveLength(0);
    });

    it('deve retornar array vazio quando o repositório retorna nenhum grupo', () => {
        (mockRepository.getGroups as jest.Mock).mockReturnValueOnce([]);
        const result = useCase.execute();
        expect(result).toHaveLength(0);
    });
});
