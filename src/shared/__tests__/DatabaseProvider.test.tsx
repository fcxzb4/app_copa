import React from 'react';
import { act, create } from 'react-test-renderer';
import { Text } from 'react-native';
import { DatabaseProvider } from '../data/database/DatabaseProvider';
import { DB_NAME, migrateDb } from '../data/database/database';

let mockDatabaseNamePassed: string | null = null;
let mockOnInitPassed: any = null;
let mockUseSuspensePassed: boolean | null = null;

jest.mock('expo-sqlite', () => {
    return {
        SQLiteProvider: ({ children, databaseName, onInit, useSuspense }: any) => {
            mockDatabaseNamePassed = databaseName;
            mockOnInitPassed = onInit;
            mockUseSuspensePassed = useSuspense;
            return children;
        },
    };
});

describe('DatabaseProvider', () => {
    it('deve renderizar os componentes filhos dentro do SQLiteProvider configurado', () => {
        let tree: any;
        act(() => {
            tree = create(
                <DatabaseProvider>
                    <Text>Child Component</Text>
                </DatabaseProvider>
            );
        });

        expect(tree.toJSON()).toBeDefined();
        expect(mockDatabaseNamePassed).toBe(DB_NAME);
        expect(mockOnInitPassed).toBe(migrateDb);
        expect(mockUseSuspensePassed).toBe(true);
    });
});
