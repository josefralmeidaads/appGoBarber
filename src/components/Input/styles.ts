import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface InputProps {
  isFocus: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.View<InputProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #232129;

  ${props => props.isErrored && css`
    border-color: #C53030;
  `}
  
  ${props => props.isFocus && css`
    border-color: #FF9000;
  `}

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #FFF;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-right: 16px;
`;

export const Icon = styled(FeatherIcon)<InputProps>`
  margin-right: 16px;

  ${props => props.isFocus && css`
    color: #FF9000;
  `}

  ${props => props.isFilled && css`
    color: #FF9000;
  `}
`

export const Error = styled.Text`
  color: #FFF;
`

