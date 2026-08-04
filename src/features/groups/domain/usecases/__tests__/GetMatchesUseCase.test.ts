import { GetMatchesUseCase } from '../GetMatchesUseCase';
import type { IGroupRepository } from '../../repositories/IGroupRepository';
import type { Team } from '../../../../teams/domain/entities/Team';
import type { Match } from '../../entities/Match';
import type { Standing } from '../../entities/Standing';

// ── Fixtures ───────────────────────────────────────────────────────────────

const completedMatch: Match = {
    id: 'm1',
    group: 'C',
    homeTeamId: 'BRA',
    awayTeamId: 'MAR',
    homeScore: 2,
    awayScore: 0,
    date: '2026-06-10',
    time: '16:00',
    stadium: 'Estádio Nacional',
    status: 'completed',
};

const upcomingMatch: Match = {
    id: 'm2',
    group: 'C',
    homeTeamId: 'HAI',
    awayTeamId: 'SCO',
    date: '2026-06-14',
    time: '13:00',
    stadium: 'Estádio Nacional',
    status: 'upcoming',
};

const allMatches: Match[] = [completedMatch, upcomingMatch];

// ── Mock do repositório ────────────────────────────────────────────────────

const mockRepository: IGroupRepository = {
    getGroups: jest.fn(() => [] as string[]),
    getTeamsByGroup: jest.fn(() => [] as Team[]),
    getAllTeams: jest.fn(() => [] as Team[]),
    getMatches: jest.fn(() => allMatches),
    getMatchesByStatus: jest.fn((status: 'completed' | 'upcoming') =>
        allMatches.filter(m => m.status === status)
    ),
    calculateGroupStandings: jest.fn(() => [] as Standing[]),
};

// ── Testes ─────────────────────────────────────────────────────────────────

describe('GetMatchesUseCase', () => {
    let useCase: GetMatchesUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        useCase = new GetMatchesUseCase(mockRepository);
    });

    it('deve retornar todas as partidas quando nenhum status for fornecido', () => {
        const result = useCase.execute();

        expect(result).toHaveLength(2);
        expect(mockRepository.getMatches).toHaveBeenCalledTimes(1);
        expect(mockRepository.getMatchesByStatus).not.toHaveBeenCalled();
    });

    it('deve retornar apenas partidas "completed" quando status for "completed"', () => {
        const result = useCase.execute('completed');

        expect(result).toHaveLength(1);
        expect(result[0].status).toBe('completed');
        expect(result[0].id).toBe('m1');
        expect(mockRepository.getMatchesByStatus).toHaveBeenCalledWith('completed');
        expect(mockRepository.getMatches).not.toHaveBeenCalled();
    });

    it('deve retornar apenas partidas "upcoming" quando status for "upcoming"', () => {
        const result = useCase.execute('upcoming');

        expect(result).toHaveLength(1);
        expect(result[0].status).toBe('upcoming');
        expect(result[0].id).toBe('m2');
        expect(mockRepository.getMatchesByStatus).toHaveBeenCalledWith('upcoming');
        expect(mockRepository.getMatches).not.toHaveBeenCalled();
    });

    it('deve retornar array vazio quando não há partidas com o status solicitado', () => {
        (mockRepository.getMatchesByStatus as jest.Mock).mockReturnValueOnce([]);
        const result = useCase.execute('completed');
        expect(result).toHaveLength(0);
    });

    it('cada partida retornada deve ter as propriedades obrigatórias', () => {
        const result = useCase.execute();
        result.forEach(match => {
            expect(match).toHaveProperty('id');
            expect(match).toHaveProperty('group');
            expect(match).toHaveProperty('homeTeamId');
            expect(match).toHaveProperty('awayTeamId');
            expect(match).toHaveProperty('status');
        });
    });
});
