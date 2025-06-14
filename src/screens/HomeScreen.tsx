import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useSessionStore } from "../stores/sessionStore";
import { PostList } from "../components/Posts/PostList";
import { Post } from "../clients/FediverseClient";

export default function HomeScreen() {
  const client = useSessionStore((s) => s.client);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    if (!client) return;
    setLoading(true);
    try {
      const data = await client.getPosts({ limit: 20 });
      setPosts(data);
    } catch (err) {
      console.error("❌ Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [client]);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <PostList post={item} />}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={loadPosts} />}
    />
  );
}
