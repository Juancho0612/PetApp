import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
  Icon,
} from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getData()
      setUser(userData)
    }

    fetchData()
  }, [])
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // error reading value
    }
  }
  removeValue = async () => {
    try {
      await AsyncStorage.removeItem('user')
    } catch (e) {
      // remove error
    }

    console.log('Done.')
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Background>
        <View style={styles.userInfoSection}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 50,
              marginBottom: 20,
            }}
          >
            <Avatar.Image
              source={{
                uri:
                  user?.type === 'user'
                    ? 'https://img.freepik.com/foto-gratis/perro-shiba-inu-dando-paseo_23-2149478730.jpg?w=360&t=st=1712615654~exp=1712616254~hmac=448dfe959cb7b79bd54667e35d460b05f2e0c370fc5303202748096cc33e16bc'
                    : 'https://img.freepik.com/foto-gratis/mujer-jugando-su-lindo-perro_23-2148351239.jpg?w=996',
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
                {user?.name}
              </Title>
            </View>
          </View>
        </View>

        <View style={{ width: '80%' }}>
          <Paragraph style={{ marginBottom: 10, textAlign: 'left' }}>
            <Text style={styles.userInfo}>Nombre: </Text>
            <Text>{user?.name}</Text>
          </Paragraph>

          <Paragraph style={{ marginBottom: 10, textAlign: 'left' }}>
            <Text style={styles.userInfo}>Email: </Text>
            <Text>{user?.email}</Text>
          </Paragraph>

          <Paragraph style={{ marginBottom: 10, textAlign: 'left' }}>
            <Text style={styles.userInfo}>Número: </Text>
            <Text>{user?.number}</Text>
          </Paragraph>

          <Paragraph style={{ marginBottom: 10, textAlign: 'left' }}>
            <Text style={styles.userInfo}>Tipo: </Text>
            <Text>{user?.type}</Text>
          </Paragraph>
        </View>

        <Button
          mode="outlined"
          onPress={() => {
            removeValue()
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }}
        >
          Cerrar sesión
        </Button>
      </Background>
      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('MapScreen')}
        >
          <Text>Mapa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Text>Mi Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('DogWalkersScreen')}
        >
          <Text>Paseadores</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: theme.colors.secondary,
    paddingBottom: 15,
    backgroundColor: theme.colors.primary,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.secondary,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    fontSize: 15,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  userInfoSection: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
})
