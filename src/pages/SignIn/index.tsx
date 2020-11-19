import React from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';
import Button from '../../components/Button'

import logoImg from '../../assets/logo.png';

import { Container, Title, ForgotPassword, ForgtoPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';

const SignIn: React.FC = () => {

  const navigation = useNavigation();

  const handleToSignUp = () => {
    navigation.navigate("SignUp");
  }

  return (
  <>
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Image source={logoImg} />
          
          <View>
            <Title>Faça seu logon</Title>
          </View>

          <Input name="email" icon="mail" placeholder="Email"/>
          <Input name="password" icon="lock" placeholder="Senha"/>

          <Button onPress={() => {}}>
            Entrar
          </Button>

          <ForgotPassword onPress={() => {}}>
            <ForgtoPasswordText>
              Esqueci minha senha
            </ForgtoPasswordText>
          </ForgotPassword>

        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
    <CreateAccountButton onPress={handleToSignUp}>
      <Icon name="log-in" size={20} color="#FF9000"/>
      <CreateAccountButtonText>
        Criar uma conta
      </CreateAccountButtonText>
    </CreateAccountButton>
    
  </>
  );
}

export default SignIn;