import React, { useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button'
import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';

import { Container, Title, ForgotPassword, ForgtoPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn, user } = useAuth();
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSubmitForm = useCallback(async(data: SignInFormData): Promise<void> => {
    console.log('data');
    // try {
    //   formRef.current?.setErrors({});
    //   const schema = Yup.object().shape({
    //     email: Yup.string().required('Nome obrigatório').email('Digite um email válido'),
    //     password: Yup.string().min(6,'Mínimo 6 Dígitos'),
    //   });
      
    //   await schema.validate(data, {
    //     abortEarly: false,
    //   });

     const response = await signIn({ email: data.email, password: data.password});
 
    // } catch(err) {
    //   if( err instanceof Yup.ValidationError){
    //     const errors = getValidationErrors(err);
    //     formRef.current?.setErrors(errors);
    //     return;
    //   }
    //   console.log(err.response.data);

    //   Alert.alert('Não possível logar, verifique suas credenciais');
    // }
  }, [])

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

          <Form ref={formRef} onSubmit={handleSubmitForm}>
            <Input 
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email" 
              icon="mail" 
              placeholder="Email"
              returnKeyType="next"
              onSubmitEditing={() => {passwordInputRef.current?.focus()}}
            />
            <Input 
              ref={passwordInputRef}
              name="password" 
              icon="lock" 
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {formRef.current?.submitForm();}}
            />

            <Button onPress={() => {formRef.current?.submitForm();}}>
              Entrar
            </Button>
          </Form>

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