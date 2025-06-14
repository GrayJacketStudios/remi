import React from "react";
import { Text, StyleSheet } from "react-native";

export function PostTitle({ title }: { title: string }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
});
