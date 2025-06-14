# 🪐 Fediverse Explorer

A cross-platform React Native (Expo) app to discover, explore, and interact with federated instances from **Lemmy**, **Kbin**, and **Piefed**. Supports instance login, voting, commenting, and gesture-based interactions — all with a smooth, native feel.

---

## 🚀 Features

- 🌐 Browse and search **Lemmy**, **Kbin**, and **Piefed** instances
- 🔐 Login to any instance and manage your account
- 📰 View posts and comments
- 🔺 Upvote / 🔻 Downvote
- ⚙️ Configurable gesture actions (swipe, tap, hold, etc.)
- 🔔 Push notifications (via Expo/Firebase)
- 📱 Fully native experience, with future iOS support

---

## 🛠 Tech Stack

| Layer         | Tool                                  |
|--------------|---------------------------------------|
| UI Framework | [React Native](https://reactnative.dev/) (Expo SDK 53) |
| Navigation   | `@react-navigation/native`             |
| API          | `axios` + `@tanstack/react-query`      |
| Auth Storage | `expo-secure-store`                    |
| Gestures     | `react-native-gesture-handler` + `react-native-reanimated` |
| State        | `zustand`                              |
| Notifications| `expo-notifications`                   |

---

## 📦 Installation

> Requires **Node.js 18+** and **Expo CLI** (`npm install -g expo-cli`)

```bash
git clone https://github.com/your-username/fediverse-explorer.git
cd fediverse-explorer

npm install
```

## 📱 Run the App
Start in development mode:
```bash
npm run start
```

To launch on Android:
```bash
npm run android
```

To launch on iOS (macOS only):
```bash
npm run ios
```

## 📁 Project Structure

```vbnet
src/
├── api/               ← API clients for Lemmy/Kbin/Piefed
├── components/        ← UI components like PostCard, CommentThread, etc.
├── config/            ← Default app settings & gesture maps
├── hooks/             ← Custom React hooks
├── screens/           ← Navigation screens (Home, InstanceList, Post, etc.)
├── stores/            ← zustand-based state management
├── utils/             ← Helpers like formatDate, auth header builders
```

## 🧠 Gesture Config (Planned)
Users will be able to assign custom actions to gestures like:
    Swipe Left / Right
    Long Press
    Double Tap
Mappings will be stored in local JSON config via AsyncStorage or SecureStore.

## 🔒 Authentication (Planned)
    Login via Lemmy instance using JWT-based auth
    Session persisted securely via expo-secure-store
    Support for multiple instances in the future

## 🧑‍💻 License
MIT License © 2025 Sebastián Cristi
