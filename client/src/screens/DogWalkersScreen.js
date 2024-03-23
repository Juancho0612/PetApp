import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

export default function DogWalkersScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Background>
        <Logo />
        <Header>Paseadores</Header>
        <Paragraph>Perfil de los paseadores de perros, Proxiamamente</Paragraph>
        <Button
          mode="outlined"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }>
          Cerrar sesión
        </Button>
      </Background>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('MapScreen')}>
          <Text>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('ProfileScreen')}>
          <Text>Mi Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('DogWalkersScreen')}>
          <Text>Paseadores</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Dashboard')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent:'center',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: theme.colors.secondary,
    paddingBottom: 15,
    backgroundColor: theme.colors.primary
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.secondary,
    paddingTop:10
  },
});
