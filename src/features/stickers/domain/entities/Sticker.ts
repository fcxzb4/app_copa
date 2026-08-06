export interface CollectedSticker {
    id: number;
    sticker_id: string;
    player_name: string;
    flag: string;
    group_name: string;
    team_id: string | null;
    is_duplicate: number;
    collected_at: string;
}


export interface StickerToSave {
    sticker_id: string;
    player_name: string;
    flag: string;
    group_name: string;
    team_id?: string;
}



export interface UseStickerDatabaseReturn {
    /** Pacotes disponíveis para abrir */
    packsRemaining: number;
    /** Total de figurinhas únicas coletadas */
    totalCollected: number;
    /** Todas as figurinhas coletadas (incluindo duplicatas) */
    collectedStickers: CollectedSticker[];
    /** Mapa de team_id → quantidade coletada */
    countByTeam: Record<string, number>;
    /** true enquanto o banco está sendo lido/escrito */
    isLoading: boolean;
    /** Mensagem de erro, se houver */
    error: string | null;
    /** Abre um pacote e decrementa o saldo */
    openPack: () => Promise<number>;
    /** Salva uma lista de figurinhas no álbum */
    saveStickers: (stickers: StickerToSave[]) => Promise<void>;
    /** Força um reload dos dados do banco */
    refresh: () => Promise<void>;
}