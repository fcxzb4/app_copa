import React from 'react';
import { SQLiteProvider } from 'expo-sqlite';
import { DB_NAME, migrateDb } from './database';

interface DatabaseProviderProps {
  children: React.ReactNode;
}

/**
 * Provedor global do banco SQLite.
 * Envolve toda a aplicação para que qualquer componente filho
 * possa acessar o banco via `useSQLiteContext()`.
 *
 * O banco é aberto de forma assíncrona; enquanto carrega, é exibido
 * um fallback React Suspense (pode ser personalizado com um Splash).
 */
export function DatabaseProvider({ children }: DatabaseProviderProps) {
  return (
    <SQLiteProvider
      databaseName={DB_NAME}
      onInit={migrateDb}
      useSuspense
    >
      {children}
    </SQLiteProvider>
  );
}
