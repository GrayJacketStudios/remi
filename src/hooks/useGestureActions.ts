// // src/hooks/useGestureActions.ts
// import { useGestureStore } from '../stores/gestureStore';

// export const useGestureActions = () => {
//   const map = useGestureStore(state => state.gestureMap);
//   return (gesture: 'swipeLeft' | 'swipeRight') => {
//     const action = map[gesture];
//     // handle 'upvote', 'downvote', etc
//   };
// };