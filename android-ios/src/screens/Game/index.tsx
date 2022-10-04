import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { GameParams } from '../../@types/navigation';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';

import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation()
  const [ads, setAds] = useState<DuoCardProps[]>([])
  const [discordSelected, setDiscordSelected] = useState<string>('')

  const handleGoBack = () => {
    navigation.goBack()
  }

  const getDiscordUser = async (adsId: string) => {
    fetch(`http://192.168.0.104:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.0.104:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setAds(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList data={ads} keyExtractor={item => item.id} horizontal showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          contentContainerStyle={ads.length > 0 ? styles.contentList : styles.emptyListContent}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)}></DuoCard>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Ainda não há anúncios para este jogo!
            </Text>
          )}
        />

        <DuoMatch visible={discordSelected.length > 0} discord={discordSelected} onClose={() => setDiscordSelected('')} />
      </SafeAreaView>
    </Background>
  );
}