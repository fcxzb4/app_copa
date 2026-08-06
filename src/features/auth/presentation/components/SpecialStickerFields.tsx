import React from 'react';
import { Text, View } from 'react-native';
import { AuthInput } from './AuthInput';

interface SpecialStickerFieldsProps {
    jogador: string;
    onChangeJogador: (text: string) => void;
    selecao: string;
    onChangeSelecao: (text: string) => void;
    pais: string;
    onChangePais: (text: string) => void;
    posicao: string;
    onChangePosicao: (text: string) => void;
}

export function SpecialStickerFields({
    jogador,
    onChangeJogador,
    selecao,
    onChangeSelecao,
    pais,
    onChangePais,
    posicao,
    onChangePosicao,
}: SpecialStickerFieldsProps) {
    return (
        <View>
            <Text
                style={{
                    color: '#8CA185',
                    fontSize: 13,
                    fontWeight: '600',
                    marginTop: 12,
                    marginBottom: 4,
                    marginLeft: 4,
                }}
            >
                Figurinha Especial
            </Text>

            <AuthInput
                iconName="person-outline"
                placeholder="Jogador da figurinha"
                value={jogador}
                onChangeText={onChangeJogador}
                returnKeyType="next"
            />

            <AuthInput
                iconName="flag-outline"
                placeholder="Seleção (Time)"
                value={selecao}
                onChangeText={onChangeSelecao}
                returnKeyType="next"
            />

            <AuthInput
                iconName="earth-outline"
                placeholder="País de origem"
                value={pais}
                onChangeText={onChangePais}
                returnKeyType="next"
            />

            <AuthInput
                iconName="football-outline"
                placeholder="Posição (ex: Atacante)"
                value={posicao}
                onChangeText={onChangePosicao}
                returnKeyType="next"
            />
        </View>
    );
}
