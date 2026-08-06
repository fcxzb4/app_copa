import React from 'react';
import { act, create } from 'react-test-renderer';
import {
    GroupMatchCard,
    GroupMatchesSection,
    GroupSelectorCarousel,
    GroupStandingsRow,
    GroupStandingsTable,
    MatchStatusBadge,
} from '../presentation/components';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: () => null,
}));

jest.mock('../presentation/styles/groupStageStyles', () => ({
    groupStageStyles: new Proxy({}, { get: () => ({}) }),
}));

function collectTexts(node: any, acc: string[] = []): string[] {
    if (!node) return acc;
    if (typeof node === 'string' || typeof node === 'number') { acc.push(String(node)); return acc; }
    if (Array.isArray(node)) { node.forEach(n => collectTexts(n, acc)); return acc; }
    if (typeof node === 'object' && node.children) {
        collectTexts(node.children, acc);
    }
    return acc;
}

function hasText(json: any, text: string): boolean {
    const fullText = collectTexts(json).join('');
    return fullText.includes(text);
}

describe('Group Components', () => {
    describe('GroupSelectorCarousel', () => {
        it('renderiza os botões de grupos', () => {
            let tree: any;
            act(() => {
                tree = create(
                    <GroupSelectorCarousel
                        groups={['A', 'B', 'C']}
                        selectedGroup="A"
                        onSelectGroup={jest.fn()}
                    />
                );
            });
            const json = tree.toJSON();
            expect(hasText(json, 'Grupo A')).toBe(true);
            expect(hasText(json, 'Grupo B')).toBe(true);
            expect(hasText(json, 'Grupo C')).toBe(true);
        });
    });

    describe('GroupStandingsRow', () => {
        it('renderiza o time, pontos e saldo de gols', () => {
            let tree: any;
            const mockRow = { pos: 1, flag: '🇧🇷', name: 'Brasil', p: 9, j: 3, sg: 6 };
            act(() => {
                tree = create(<GroupStandingsRow row={mockRow} />);
            });
            const json = tree.toJSON();
            expect(hasText(json, 'Brasil')).toBe(true);
            expect(hasText(json, '🇧🇷')).toBe(true);
            expect(hasText(json, '+6')).toBe(true);
        });
    });

    describe('GroupStandingsTable', () => {
        it('renderiza o titulo da tabela e as linhas', () => {
            let tree: any;
            const mockStandings = [
                { pos: 1, flag: '🇧🇷', name: 'Brasil', p: 9, j: 3, sg: 6 },
                { pos: 2, flag: '🇨🇭', name: 'Suíça', p: 6, j: 3, sg: 1 },
            ];
            act(() => {
                tree = create(<GroupStandingsTable groupName="A" standings={mockStandings} />);
            });
            const json = tree.toJSON();
            expect(hasText(json, 'Tabela Grupo A')).toBe(true);
            expect(hasText(json, 'Brasil')).toBe(true);
            expect(hasText(json, 'Suíça')).toBe(true);
        });
    });

    describe('MatchStatusBadge', () => {
        it('renderiza o texto do status', () => {
            let tree: any;
            act(() => {
                tree = create(<MatchStatusBadge status="Finalizado" statusType="finalizado" />);
            });
            expect(hasText(tree.toJSON(), 'Finalizado')).toBe(true);
        });
    });

    describe('GroupMatchCard', () => {
        it('renderiza times, estadio e placar', () => {
            let tree: any;
            const mockMatch = {
                id: 'm1',
                stadium: 'Lusail',
                status: 'Finalizado',
                statusType: 'finalizado' as const,
                team1: 'Brasil',
                flag1: '🇧🇷',
                team2: 'Sérvia',
                flag2: '🇷🇸',
                score1: 2,
                score2: 0,
            };
            act(() => {
                tree = create(<GroupMatchCard match={mockMatch} />);
            });
            const json = tree.toJSON();
            expect(hasText(json, 'Lusail')).toBe(true);
            expect(hasText(json, 'Brasil')).toBe(true);
            expect(hasText(json, 'Sérvia')).toBe(true);
        });
    });

    describe('GroupMatchesSection', () => {
        it('renderiza o titulo da secao e a lista de jogos', () => {
            let tree: any;
            const mockMatches = [
                {
                    id: 'm1',
                    stadium: 'Lusail',
                    status: 'Finalizado',
                    statusType: 'finalizado' as const,
                    team1: 'Brasil',
                    flag1: '🇧🇷',
                    team2: 'Sérvia',
                    flag2: '🇷🇸',
                    score1: 2,
                    score2: 0,
                },
            ];
            act(() => {
                tree = create(
                    <GroupMatchesSection
                        title="Últimos Jogos"
                        iconName="calendar-outline"
                        matches={mockMatches}
                    />
                );
            });
            const json = tree.toJSON();
            expect(hasText(json, 'Últimos Jogos')).toBe(true);
            expect(hasText(json, 'Brasil')).toBe(true);
        });
    });
});
