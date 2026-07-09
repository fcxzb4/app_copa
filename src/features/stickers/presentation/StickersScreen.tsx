import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { teams } from '../../../shared/data/worldCupData';
import { stickersStyles as styles } from '@/features/stickers/presentation/styles/stickers_styles';

// Mock list of stars for the card opening
const starPlayers: { [key: string]: string } = {
  BRA: 'Vinícius Jr.',
  ARG: 'Lionel Messi',
  FRA: 'Kylian Mbappé',
  POR: 'Cristiano Ronaldo',
  ENG: 'Jude Bellingham',
  CRO: 'Luka Modrić',
  MEX: 'Guillermo Ochoa',
  CAN: 'Alphonso Davies',
  USA: 'Christian Pulisic',
  GER: 'Jamal Musiala',
  ESP: 'Lamine Yamal',
  BEL: 'Kevin De Bruyne',
};

interface OpenedSticker {
  id: string;
  name: string;
  flag: string;
  group: string;
  confed: string;
}

export default function StickersScreen() {
  // State for the sticker count and progress
  const [collectedCount, setCollectedCount] = useState(412);
  const totalStickers = 640;
  const progressPercent = Math.round((collectedCount / totalStickers) * 100);

  // Sticker opening state
  const [isRipping, setIsRipping] = useState(false);
  const [revealedStickers, setRevealedStickers] = useState<OpenedSticker[]>([]);
  const [showRevealModal, setShowRevealModal] = useState(false);

  // Accordion for missing stickers
  const [missingExpanded, setMissingExpanded] = useState(false);

  // List of collected/opened cards tracker (just in-memory for show collection modal)
  const [openedCardsList, setOpenedCardsList] = useState<OpenedSticker[]>([]);
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  // Function to open a package
  const handleOpenPacket = () => {
    setIsRipping(true);
    setTimeout(() => {
      // Pick 3 random teams
      const selected: OpenedSticker[] = [];
      const shuffledTeams = [...teams].sort(() => 0.5 - Math.random());
      
      for (let i = 0; i < 3; i++) {
        const team = shuffledTeams[i];
        const playerName = starPlayers[team.id] || `Jogador ${team.id}`;
        selected.push({
          id: `${team.id}-${Math.floor(Math.random() * 20) + 1}`,
          name: playerName,
          flag: team.flag,
          group: team.group,
          confed: team.confederation
        });
      }

      setRevealedStickers(selected);
      setOpenedCardsList((prev) => [...selected, ...prev]);
      setCollectedCount((prev) => Math.min(prev + 3, totalStickers));
      setIsRipping(false);
      setShowRevealModal(true);
    }, 1500);
  };

  // Generate a mock list of missing stickers
  const generateMissingStickers = () => {
    const missing = [];
    const prefixList = ['BRA', 'ARG', 'FRA', 'GER', 'ESP', 'MEX', 'CAN', 'USA', 'POR', 'ITA', 'URU', 'BEL'];
    for (let i = 0; i < 20; i++) {
      const prefix = prefixList[i % prefixList.length];
      const num = (i * 3 + 1) % 20 + 1;
      missing.push(`${prefix}-${num < 10 ? '0' + num : num}`);
    }
    return missing;
  };

  const missingList = generateMissingStickers();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Card 1: Minha Coleção */}
        <View style={styles.collectionCard}>
          <View style={styles.collectionHeader}>
            <View>
              <Text style={styles.collectionTitleLabel}>Minha Coleção</Text>
              <Text style={styles.collectionProgressText}>{progressPercent}% COMPLETADA</Text>
            </View>
            <Text style={styles.collectionCountText}>
              {collectedCount}/{totalStickers}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>

          {/* Buttons */}
          <View style={styles.collectionButtonsContainer}>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={() => Alert.alert('Escanear QR Code', 'Câmera indisponível no momento. Use o recurso de pacotes virtuais!')}
            >
              <Text style={styles.scanButtonText}>➕ ESCANEAR</Text>
            </TouchableOpacity>

            <Link href="/collection" asChild>
              <TouchableOpacity style={styles.openCollectionButton}>
                <Text style={styles.openCollectionButtonText}>ABRA A SUA COLEÇÃO</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Card 2: Rasgue o seu Pacote */}
        <TouchableOpacity style={styles.ripCardContainer} onPress={handleOpenPacket} disabled={isRipping}>
          <LinearGradient
            colors={['#135C33', '#C29F1A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ripCardGradient}
          >
            <Text style={styles.ripCardText}>RASGUE O SEU PACOTE</Text>
            <View style={styles.ripCardIconContainer}>
              <Text style={{ fontSize: 24 }}>✨</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Card 3: Pacote Lendário */}
        <View style={styles.promoCard}>
          <View style={styles.promoBadge}>
            <Text style={{ fontSize: 10 }}>⭐</Text>
            <Text style={styles.promoBadgeText}>OFERTA LIMITADA</Text>
          </View>
          <Text style={styles.promoTitle}>PACOTE LENDÁRIO</Text>
          <Text style={styles.promoSubtitle}>
            3 jogadores brilhantes garantidos neste pacote.
          </Text>
          
          <TouchableOpacity 
            style={styles.buyButton}
            onPress={() => Alert.alert('Compra Efetuada!', 'Você adquiriu o Pacote Lendário. A sua coleção aumentou!')}
          >
            <Text style={styles.buyButtonText}>COMPRE AGORA</Text>
          </TouchableOpacity>

          {/* Graphic Overlaps */}
          <View style={styles.promoGraphicsContainer}>
            <View style={styles.promoGraphicCard2} />
            <View style={styles.promoGraphicCard1} />
          </View>
        </View>

        {/* Card 4: Faltam para Você */}
        <View style={{ borderRadius: 16, overflow: 'hidden' }}>
          <TouchableOpacity 
            style={styles.missingCard} 
            onPress={() => setMissingExpanded(!missingExpanded)}
          >
            <View style={styles.missingLeft}>
              <Text style={{ fontSize: 20 }}>💬</Text>
              <Text style={styles.missingTitle}>FALTAM PARA VOCÊ</Text>
            </View>
            <View style={styles.missingRight}>
              <Text style={styles.missingBadgeText}>{totalStickers - collectedCount}</Text>
              <Text style={styles.missingChevron}>{missingExpanded ? '▲' : '▼'}</Text>
            </View>
          </TouchableOpacity>

          {missingExpanded && (
            <View style={localStyles.missingExpandedContainer}>
              <Text style={localStyles.missingInfoText}>
                Compre pacotes ou troque figurinhas repetidas com amigos para completar a sua coleção!
              </Text>
              <View style={localStyles.missingGrid}>
                {missingList.map((code) => (
                  <View key={code} style={localStyles.missingBadge}>
                    <Text style={localStyles.missingBadgeCode}>{code}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

      </ScrollView>

      {/* Ripping Packet Loading Overlay */}
      {isRipping && (
        <View style={styles.rippingOverlay}>
          <ActivityIndicator size="large" color="#FACC15" />
          <Text style={styles.rippingText}>RASGANDO PACOTE...</Text>
        </View>
      )}

      {/* Ripped Stickers Reveal Modal */}
      <Modal visible={showRevealModal} transparent animationType="slide">
        <View style={styles.rippingOverlay}>
          <View style={styles.rippedStickerContainer}>
            <Text style={styles.rippedStickerTitle}>✨ NOVAS FIGURINHAS! ✨</Text>
            
            <View style={styles.stickersRow}>
              {revealedStickers.map((sticker) => (
                <View key={sticker.id} style={styles.stickerRevealCard}>
                  <Text style={styles.stickerRevealFlag}>{sticker.flag}</Text>
                  <Text style={styles.stickerRevealName} numberOfLines={2}>
                    {sticker.name}
                  </Text>
                  <Text style={styles.stickerRevealGroup}>GRUPO {sticker.group}</Text>
                  <Text style={localStyles.stickerRevealId}>{sticker.id}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity 
              style={styles.closeRevealBtn}
              onPress={() => setShowRevealModal(false)}
            >
              <Text style={styles.closeRevealBtnText}>GUARDAR NO ÁLBUM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* My Collection Modal */}
      <Modal visible={showCollectionModal} transparent animationType="slide">
        <View style={styles.rippingOverlay}>
          <View style={localStyles.collectionModalContainer}>
            <Text style={localStyles.collectionModalTitle}>Minhas Figurinhas Obtidas</Text>
            
            {openedCardsList.length === 0 ? (
              <View style={localStyles.emptyCollection}>
                <Text style={{ fontSize: 32, marginBottom: 12 }}>📓</Text>
                <Text style={localStyles.emptyText}>Você ainda não abriu nenhum pacote virtual nesta sessão.</Text>
              </View>
            ) : (
              <ScrollView contentContainerStyle={localStyles.collectionGrid}>
                {openedCardsList.map((sticker, idx) => (
                  <View key={`${sticker.id}-${idx}`} style={localStyles.collectionGridItem}>
                    <Text style={{ fontSize: 16 }}>{sticker.flag}</Text>
                    <Text style={localStyles.itemText} numberOfLines={1}>{sticker.name}</Text>
                    <Text style={localStyles.itemIdText}>{sticker.id}</Text>
                  </View>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity 
              style={localStyles.closeCollectionBtn}
              onPress={() => setShowCollectionModal(false)}
            >
              <Text style={localStyles.closeCollectionBtnText}>FECHAR ÁLBUM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  stickerRevealId: {
    color: '#8CA185',
    fontSize: 8,
    fontWeight: 'bold',
    marginTop: 4,
  },
  missingExpandedContainer: {
    backgroundColor: '#07150E',
    borderColor: '#133021',
    borderWidth: 1,
    borderTopWidth: 0,
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  missingInfoText: {
    color: '#8CA185',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  missingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  missingBadge: {
    backgroundColor: '#102A1C',
    borderColor: '#183B27',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  missingBadgeCode: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '700',
  },
  collectionModalContainer: {
    width: '90%',
    height: '75%',
    backgroundColor: '#0A1C13',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#133021',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  collectionModalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 16,
  },
  emptyCollection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    color: '#8CA185',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  collectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  collectionGridItem: {
    width: 80,
    height: 90,
    backgroundColor: '#102A1C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderColor: '#1E3C2A',
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
  },
  itemIdText: {
    color: '#FACC15',
    fontSize: 7,
    fontWeight: '700',
    marginTop: 2,
  },
  closeCollectionBtn: {
    width: '100%',
    backgroundColor: '#FACC15',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  closeCollectionBtnText: {
    color: '#05110B',
    fontSize: 14,
    fontWeight: '800',
  },
});
