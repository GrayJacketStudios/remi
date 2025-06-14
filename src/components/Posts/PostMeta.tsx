import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export function PostMeta({ score, comments }: { score: number; comments: number }) {
  return (
    <View style={styles.row}>
      <FontAwesome5 name="arrow-up" size={14} />
      <Text style={styles.meta}> {score}</Text>
      <FontAwesome5 name="comment" size={14} style={{ marginLeft: 16 }} />
      <Text style={styles.meta}> {comments}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  meta: { marginLeft: 4, fontSize: 14 },
});
