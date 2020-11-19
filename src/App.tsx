import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { View, StatusBar, Text } from 'react-native';

import Routes from './routes';

const src: React.FC = () => {
  return (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#312E38"/>
      <View style={{ flex: 1 ,backgroundColor: '#312E38' }}>
        <Routes />
      </View>
  </NavigationContainer>
  );
}


export default src;