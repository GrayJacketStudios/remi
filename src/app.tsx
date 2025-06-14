import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSessionStore } from './stores/sessionStore';
import { Text, View } from 'react-native';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  const loadStoredSession = useSessionStore((s) => s.loadStoredSession);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadStoredSession().finally(() => setIsReady(true));
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading app…</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}