import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, Pressable } from "react-native";
import { createClientForInstance } from "../clients/clientFactory";
import { showToast } from "../utils/toast.helper";
import { useSessionStore } from "../stores/sessionStore";
import { useNavigation } from "@react-navigation/native";

const instanceOptions = [
  "piefed.social",
  "feddit.online",
  "lemmy.world",
  "piefed.blahaj.zone",
  "kbin.social",
  "programming.dev",
  "feddit.cl",
  "feddit.ml",
  "feddit.org",
];

function LoginScreen() {
  const [instance, setInstance] = useState("piefed.social");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);
  const loginStore = useSessionStore();
  const navigation = useNavigation();

  const handleInstanceChange = (text: string) => {
    setInstance(text);
    const matching = instanceOptions.filter((opt) => opt.toLowerCase().includes(text.toLowerCase()));
    setFiltered(matching);
    setShowSuggestions(true);
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    const url = `https://${instance.trim()}`;

    try {
      const { client } = createClientForInstance(url);
      const result = await client.login(username, password);

      loginStore.login(url, result.token); // ✅ Store it
      Keyboard.dismiss();
      navigation.goBack();
    } catch (err: any) {
      showToast(`Login failed, check your credentials or the instance.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable style={styles.container}>
      <Text style={styles.label}>Instance</Text>
      <View style={{ position: "relative" }}>
        <TextInput
          ref={inputRef}
          placeholder="Enter instance (e.g. piefed.social)"
          value={instance}
          onChangeText={handleInstanceChange}
          autoCapitalize="none"
          style={styles.input}
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && filtered.length > 0 && (
          <View style={styles.suggestionContainer}>
            {filtered.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.suggestion}
                onPress={() => {
                  setInstance(item);
                  setShowSuggestions(false);
                  inputRef.current?.blur();
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.message}>{message}</Text>
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loaderBox}>
            <Text style={styles.loadingText}>Logging in…</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: "#fff" },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  loaderBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  suggestionContainer: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  loginText: { color: "#fff", fontWeight: "bold" },
  message: { marginTop: 10, fontSize: 14, color: "#333" },
});

export default React.memo(LoginScreen);
