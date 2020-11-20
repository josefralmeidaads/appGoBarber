import React, { useRef, useCallback, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button'
import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignInButton, BackToSignInButtonText } from './styles';
import api from '../../services/api';

const SignUp: React.FC = () => {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);

  const handleSignUpSubmit = useCallback( async(data: object): Promise<void> => {

    try{
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email Obrigatório').email('Digite um email válido'),
        password: Yup.string().min(6, 'Mínimo 6 Dígitos'),
      });
  
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      Alert.alert('Cadastro realizado com sucesso!');

      navigation.navigate('SignIn');
  
    }catch(err){
     if (err instanceof Yup.ValidationError){
      const errors = getValidationErrors(err); // setando os erros do yup no erro na função getErrors
      formRef.current?.setErrors(errors);

      return;
     }
     Alert.alert('Não foi possível realizar a operção tente novamente!');
    }
  }, []);

  const navigation = useNavigation();

  const handleBackToSignIn = () => {
    navigation.goBack();
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
            <Title>Crie sua conta</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSignUpSubmit}>
            <Input 
              autoCorrect={false}
              autoCapitalize="words"
              name="name" 
              icon="user" 
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {emailInputRef.current?.focus()}}
            />
            <Input 
              ref={emailInputRef}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email" 
              icon="mail" 
              placeholder="Email"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            
            <Input
              ref={passwordInputRef} 
              name="password" 
              icon="lock" 
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => { formRef.current?.submitForm(); }}
              textContentType="newPassword"
            />

            <Button onPress={() => { formRef.current?.submitForm();}}>
              Cadastrar
            </Button>
          </Form>

        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
    <BackToSignInButton onPress={handleBackToSignIn}>
      <Icon name="arrow-left" size={20} color="#FFF"/>
      <BackToSignInButtonText>
        Voltar para logon
      </BackToSignInButtonText>
    </BackToSignInButton>
    
  </> 
  );
}

export default SignUp;