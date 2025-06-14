import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { usePostStyleStore } from "../../stores/postStyleStore";

export function PostBody({ body, thumbnail }: { body: string; thumbnail?: string }) {
  const { textOnly, hideThumbnails, expandImages } = usePostStyleStore();

  if (textOnly) return <Text style={styles.text}>{body}</Text>;

  if (!hideThumbnails && thumbnail) {
    return (
      <View>
        <Image source={{ uri: thumbnail }} style={expandImages ? styles.image : styles.thumbnail} />
        <Text style={styles.text}>{body}</Text>
      </View>
    );
  }

  return <Text style={styles.text}>{body}</Text>;
}

const styles = StyleSheet.create({
  text: { fontSize: 14, marginVertical: 6 },
  thumbnail: { width: "100%", height: 100, borderRadius: 6 },
  image: { width: "100%", height: 300, borderRadius: 6 },
});
