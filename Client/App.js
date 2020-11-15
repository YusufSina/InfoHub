import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Navigation from './src/navigation/Navigation';
import * as Font from 'expo-font';

export default function App() {

  const [loaded] = Font.useFonts({
    'ArchitectsDaughter-Regular': require('./src/assets/fonts/ArchitectsDaughter-Regular.ttf'),
    'Roboto-Medium': require('./src/assets/fonts/Roboto-Medium.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

