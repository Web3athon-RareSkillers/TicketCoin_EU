import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
import Onboarding from './src/screens/Onboarding';
import Home from './src/screens/Home';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { HeaderStyleInterpolator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './AuthContext';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import { AuthorizationProvider } from './src/components/AuthorizationProvider';
import { clusterApiUrl } from '@solana/web3.js';
import HomePg from './src/screens/HomePg';


const Stack = createStackNavigator();


const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function customTransition() {
  return {
    transitionSpec: {
      open: config,
      close: config,
    },
    cardStyleInterpolator: ({ current: { progress } }) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
    headerStyleInterpolator: HeaderStyleInterpolator.forFade,
  };
}
function App() {
  const DEVNET_ENDPOINT = clusterApiUrl('mainnet-beta');
  return (
    <View style={{ flex: 1, backgroundColor: '#050203' }}>
      <NavigationContainer>
        <ConnectionProvider
          config={{ commitment: 'processed' }}
          endpoint={DEVNET_ENDPOINT}>
          <AuthorizationProvider>
            <AuthProvider>
              <Stack.Navigator screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
                transitionSpec: {
                  open: config,
                  close: config,
                },
                cardStyleInterpolator: ({ current: { progress } }) => {
                  return {
                    cardStyle: {
                      opacity: progress,
                    },
                  };
                },
              }}
                initialRouteName="Onboard">
                <Stack.Screen name="Splash" options={{ headerShown: false }} component={SplashScreen} />
                <Stack.Screen name="Onboard" options={{ headerShown: false }} component={Onboarding} />
                <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
                <Stack.Screen name="HomePg" options={{ headerShown: false }} component={HomePg} />
              </Stack.Navigator>
            </AuthProvider>
          </AuthorizationProvider>
        </ConnectionProvider>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
