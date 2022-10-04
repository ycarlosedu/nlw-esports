import { Modal, ModalProps, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'

import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import { useState } from 'react';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [loading, setLoading] = useState(false)

  const handleCopyDiscordUser = async () => {
    setLoading(true)
    await Clipboard.setStringAsync(discord)
    Alert.alert('Discord Copiado!', 'Usuário copiado para área de transferência!')
    setLoading(false)
  }
  return (
    <Modal {...rest} transparent statusBarTranslucent animationType='fade' >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading title="Let's Play!" subtitle="Agora é só começar a jogar!" style={{ alignItems: 'center', marginTop: 24 }} />

          <Text style={styles.label}>
            Adicione no Discord
          </Text>

          <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordUser} disabled={loading}>
            <Text style={styles.discord}>
              {loading ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}