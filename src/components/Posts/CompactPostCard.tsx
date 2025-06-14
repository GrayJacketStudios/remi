import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { PostMeta } from "./PostMeta";
import { usePostStyleStore } from "../../stores/postStyleStore";

export function CompactPostCard({ post }: { post: any }) {
  const { hideThumbnails } = usePostStyleStore();

  return (
    <View style={styles.card}>
      {!hideThumbnails && post.thumbnail && <Image source={{ uri: post.thumbnail }} style={styles.thumbnail} />}
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {post.title}
        </Text>
        <Text style={styles.subtitle}>
          {post.creator} · {post.community}
        </Text>
        <PostMeta score={post.score} comments={post.comments} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    elevation: 1,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
  },
});
