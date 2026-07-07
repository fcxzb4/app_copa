import type { Confederation } from '../domain/entities';

/**
 * Lista de confederações disponíveis para filtragem.
 * Compartilhada entre as features groups e teams.
 */
export const confederationsList: { key: Confederation | 'ALL'; label: string; desc: string }[] = [
    { key: 'ALL', label: 'Todos', desc: 'Todas as federações' },
    { key: 'UEFA', label: 'UEFA', desc: 'Europa' },
    { key: 'CONMEBOL', label: 'CONMEBOL', desc: 'América do Sul' },
    { key: 'CONCACAF', label: 'CONCACAF', desc: 'América do Norte/Central' },
    { key: 'CAF', label: 'CAF', desc: 'África' },
    { key: 'AFC', label: 'AFC', desc: 'Ásia' },
    { key: 'OFC', label: 'OFC', desc: 'Oceania' },
];
