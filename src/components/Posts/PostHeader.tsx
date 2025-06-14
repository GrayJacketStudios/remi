import React from "react";
import { Text, View, StyleSheet } from "react-native";

export function PostHeader({ post }: { post: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.community}>{post.community}</Text>
      <Text style={styles.username}>· {post.creator}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginBottom: 4 },
  community: { fontWeight: "bold" },
  username: { color: "#666", marginLeft: 4 },
});
