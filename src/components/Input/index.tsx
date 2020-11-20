import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { Text, TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon, Error } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef,InputProps> = ({ icon, name,...rest }, ref) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name); //recebendo dados do input
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue});

  const [ isFocused, SetIsFocused ] = useState(false);
  const [ isFilled, SetIsFilled ] = useState(false);

  const handleInputFocus = useCallback(() => {
    SetIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    SetIsFocused(false);
    SetIsFilled(!!inputValueRef.current.value); // se tiver valor retorna true se não retorna false

  }, []);

  useImperativeHandle(ref, () => ({ focus(){ inputElementRef.current.focus(); } }));
  
  //registrando os inputs dentro do unform
  useEffect(() => {
    registerField<string>({
      name: fieldName, // nome do input
      ref: inputValueRef.current, // buscar a referencia do valor do input
      path: 'value', // onde está o valor contido dentro do input
      setValue(ref: any, value ){
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      }
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFocus={isFocused} isFilled={isFilled} >
      <Icon isErrored={!!error} isFocus={isFocused} isFilled={isFilled} name={icon} size={20} color="#666360"/>
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        onChangeText={value => {inputValueRef.current.value = value}} 
        {...rest}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

export default forwardRef(Input);