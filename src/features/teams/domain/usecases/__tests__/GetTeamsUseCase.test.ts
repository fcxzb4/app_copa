import { GetTeamsUseCase } from '../GetTeamsUseCase';
import type { ITeamRepository, TeamFilters } from '../../repositories/ITeamRepository';
import type { Team } from '../../entities/Team';

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockTeams: Team[] = [
    { id: 'BRA', name: 'Brasil',    flag: '🇧🇷', confederation: 'CONMEBOL', group: 'C' },
    { id: 'ARG', name: 'Argentina', flag: '🇦🇷', confederation: 'CONMEBOL', group: 'J' },
    { id: 'GER', name: 'Alemanha',  flag: '🇩🇪', confederation: 'UEFA',     group: 'E' },
    { id: 'ESP', name: 'Espanha',   flag: '🇪🇸', confederation: 'UEFA',     group: 'H' },
    { id: 'MAR', name: 'Marrocos',  flag: '🇲🇦', confederation: 'CAF',      group: 'C' },
];

// ── Mock do repositório ────────────────────────────────────────────────────

const mockRepository: ITeamRepository = {
    getAllTeams: jest.fn(() => mockTeams),
    getTeamById: jest.fn((id: string) => mockTeams.find(t => t.id === id)),
    getTeamsByFilters: jest.fn((filters: TeamFilters) => {
        return mockTeams.filter(team => {
            const matchesSearch = filters.searchQuery
                ? team.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
                : true;
            const matchesConfed =
                !filters.confederation || filters.confederation === 'ALL'
                    ? true
                    : team.confederation === filters.confederation;
            return matchesSearch && matchesConfed;
        });
    }),
};

// ── Testes ─────────────────────────────────────────────────────────────────

describe('GetTeamsUseCase', () => {
    let useCase: GetTeamsUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        useCase = new GetTeamsUseCase(mockRepository);
    });

    it('deve retornar todos os times quando nenhum filtro for fornecido', () => {
        const result = useCase.execute();

        expect(result).toHaveLength(5);
        expect(mockRepository.getAllTeams).toHaveBeenCalledTimes(1);
        expect(mockRepository.getTeamsByFilters).not.toHaveBeenCalled();
    });

    it('deve buscar via filtros quando filters for fornecido', () => {
        useCase.execute({ searchQuery: 'brasil' });

        expect(mockRepository.getTeamsByFilters).toHaveBeenCalledTimes(1);
        expect(mockRepository.getAllTeams).not.toHaveBeenCalled();
    });

    it('deve filtrar por nome (case-insensitive)', () => {
        const result = useCase.execute({ searchQuery: 'brasil' });
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('BRA');
    });

    it('deve filtrar por nome parcial', () => {
        const result = useCase.execute({ searchQuery: 'arg' });
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe('ARG');
    });

    it('deve filtrar por confederação UEFA', () => {
        const result = useCase.execute({ confederation: 'UEFA' });
        expect(result).toHaveLength(2);
        result.forEach(t => expect(t.confederation).toBe('UEFA'));
    });

    it('deve retornar todos quando confederação for "ALL"', () => {
        const result = useCase.execute({ confederation: 'ALL' });
        expect(result).toHaveLength(5);
    });

    it('deve retornar todos quando filtro vazio for passado', () => {
        const result = useCase.execute({});
        expect(result).toHaveLength(5);
    });

    it('deve combinar filtro de busca e confederação', () => {
        const result = useCase.execute({ searchQuery: 'a', confederation: 'UEFA' });
        // Alemanha e Espanha são UEFA e contêm 'a'
        expect(result.every(t => t.confederation === 'UEFA')).toBe(true);
        expect(result.every(t => t.name.toLowerCase().includes('a'))).toBe(true);
    });

    it('deve retornar array vazio quando nenhum time corresponder ao filtro', () => {
        const result = useCase.execute({ searchQuery: 'xyzxyz' });
        expect(result).toHaveLength(0);
    });
});
