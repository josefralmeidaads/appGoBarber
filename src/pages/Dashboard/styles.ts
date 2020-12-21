import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';


export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  background-color: #28262E;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  color: #F4EDE8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #FF9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled(RectButton)`

`

export const ProfileButtonText = styled.Text`

`
