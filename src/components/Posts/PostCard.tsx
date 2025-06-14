import React from "react";
import { View, StyleSheet } from "react-native";
import { PostHeader } from "./PostHeader";
import { PostTitle } from "./PostTitle";
import { PostBody } from "./PostBody";
import { PostMeta } from "./PostMeta";

export function PostCard({ post }: { post: any }) {
  return (
    <View style={styles.card}>
      <PostHeader post={post} />
      <PostTitle title={post.title} />
      <PostBody body={post.body} thumbnail={post.thumbnail} />
      <PostMeta score={post.score} comments={post.comments} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
