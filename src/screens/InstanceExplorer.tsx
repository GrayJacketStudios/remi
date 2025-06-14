import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const mockInstances = [
  { name: 'Lemmy.world', url: 'https://lemmy.world', software: 'lemmy', users: 105000 },
  { name: 'Kbin.social', url: 'https://kbin.social', software: 'kbin', users: 21000 },
  { name: 'Piefed.net', url: 'https://piefed.net', software: 'piefed', users: 4200 }
];

export default function InstanceExplorer() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockInstances}
        keyExtractor={item => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.meta}>
              {item.software} • {item.users.toLocaleString()} users
            </Text>
            <Text style={styles.url}>{item.url}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    borderRadius: 8
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  meta: { color: '#666', marginVertical: 4 },
  url: { color: '#007AFF' }
});