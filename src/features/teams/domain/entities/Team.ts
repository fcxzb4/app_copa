import type { Confederation } from '../../../../shared/domain/entities';

export interface Team {
    id: string;
    name: string;
    flag: string;
    confederation: Confederation;
    group: string;
}
