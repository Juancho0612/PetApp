import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import { numberValidator } from '../helpers/numberValidator';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [number, setNumber] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const numberError = numberValidator(number.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError || numberError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setNumber({ ...number, error: numberError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    try {
      const response = await fetch('http://192.168.56.1:8080/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          number: number.value,
          password: password.value,
        }),
      });

      if (response.status === 201) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        });
      } else if (response.status === 400) {
        const data = await response.json();
        if (data.error === 'El correo electrónico ya está en uso.') {
          setEmail({
            ...email,
            error: 'Correo electrónico ya vinculado a una cuenta',
          });
        } else if (data.error === 'El numero ya está en uso.') {
          setNumber({
            ...number,
            error: 'El número ya vinculado a una cuenta',
          });
        }
      } else {
        setEmail({ ...email, error: 'Intentelo más tarde' });
        setPassword({ ...password, error: 'Intentelo más tarde' });
      }
    } catch (error) {
      setEmail({ ...email, error: 'Intentelo más tarde' });
      setPassword({ ...password, error: 'Intentelo más tarde' });
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Crea una cuenta</Header>
      <TextInput
        label="Nombre Completo"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Número"
        returnKeyType="next"
        value={number.value}
        onChangeText={(text) => setNumber({ value: text, error: '' })}
        error={!!number.error}
        errorText={number.error}
        maxLength={10}
        keyboardType="numeric"
      />
      <TextInput
        label="Contraseña"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Registro
      </Button>
      <View style={styles.row}>
        <Text>¿Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
