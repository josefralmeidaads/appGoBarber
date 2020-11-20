import React from 'react';
import { Button } from 'react-native';

import { useAuth } from '../../hooks/auth';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { logOut } = useAuth();
  return (
    <Container style={{ flex: 1, justifyContent: 'center'}}>
      <Button title="Sair" onPress={logOut} />
    </Container>
  );
};

export default Dashboard;