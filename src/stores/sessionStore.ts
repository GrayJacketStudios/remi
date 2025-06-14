import { createWithEqualityFn } from "zustand/traditional";
import { saveSessionToSecureStore, loadSessionFromSecureStore, clearSecureSession } from "../utils/secureSession";
import { FediverseClient } from "../clients/FediverseClient";
import { createClientForInstance, FediversePlatform } from "../clients/clientFactory";

type Session = {
  instance: string;
  token: string;
  platform: FediversePlatform;
};

type SessionState = {
  session: Session | null;
  client: FediverseClient | null;
  login: (instance: string, token: string) => void;
  logout: () => void;
  loadStoredSession: () => Promise<void>;
};

export const useSessionStore = createWithEqualityFn<SessionState>((set) => ({
  session: null,
  client: null,
  login: (instance, token) => {
    saveSessionToSecureStore(instance, token);
    const { client, platform } = createClientForInstance(instance, token);
    set({ session: { instance, token, platform }, client });
  },
  logout: () => {
    clearSecureSession();
    set({ session: null, client: null });
  },
  loadStoredSession: async () => {
    try {
      console.info("🧠 Loading from secure store...");
      const session = await loadSessionFromSecureStore();
      console.log("🧠 Loaded from secure store:", session);
      if (session) {
        const { client, platform } = createClientForInstance(session.instance, session.token);
        set({ session: { ...session, platform }, client });
      }
    } catch (err) {
      console.error("❌ loadStoredSession failed:", err);
    }
  },
}));
