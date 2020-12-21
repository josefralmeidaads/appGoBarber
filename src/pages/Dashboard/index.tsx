import React from 'react';
import { Button } from 'react-native';

import { 
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  ProfileButtonText 
} from './styles';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={() => {}}>
          <ProfileButtonText>
            Jose Filho
          </ProfileButtonText>
        </ProfileButton>
      </Header>
    </Container>
  );
};

export default Dashboard;