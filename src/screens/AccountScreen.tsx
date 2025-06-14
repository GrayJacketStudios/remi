import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSessionStore } from '../stores/sessionStore';
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen({
  navigation
}: {
  navigation: any;
}) {
  const session = useSessionStore((s) => s.session);
  const logout = useSessionStore((s) => s.logout);

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Not logged in</Text>
        <Button title="Log in" onPress={() => navigation.navigate('Login')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🧑 Logged in to {session.instance}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginBottom: 16, fontSize: 16 },
});