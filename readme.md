# 🪐 Remi Explorer

A cross-platform React Native (Expo) app to discover, explore, and interact with federated instances from **Lemmy**, **Mbin**, and **Piefed**. Supports instance login, voting, commenting, and gesture-based interactions.

---

## 🚀 Features

- 🌐 Browse and search **Lemmy**, **Mbin**, and **Piefed** instances
- 🔐 Login to any instance and manage your account
- 📰 View posts and comments
- 🔺 Upvote / 🔻 Downvote
- ⚙️ Configurable gesture actions (swipe, tap, hold, etc.)
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
├── clients/           ← API clients for Lemmy/Kbin/Piefed
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

## 🔒 Authentication 
Users can select different instances from a list, or typing their prefered instance. 
The client factory will try to determine the type of instance, and login to it.

## 🧑‍💻 License
MIT License © 2025 Sebastián Cristi
