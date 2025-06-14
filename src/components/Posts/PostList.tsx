import React from "react";
import { View } from "react-native";
import { PostCard } from "./PostCard";
import { CompactPostCard } from "./CompactPostCard";
import { usePostStyleStore } from "../../stores/postStyleStore";

export function PostList({ post }: { post: any }) {
  const { compactView } = usePostStyleStore();
  return (
    <View style={{ marginHorizontal: 8 }}>
      {compactView ? <CompactPostCard post={post} /> : <PostCard post={post} />}
    </View>
  );
}
