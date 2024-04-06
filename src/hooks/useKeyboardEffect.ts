import { useEffect } from 'react';
import { Keyboard, KeyboardEventName } from 'react-native';

export default function useKeyboardEffect(
  eventName: KeyboardEventName,
  handle: () => void,
) {
  useEffect(() => {
    const sub = Keyboard.addListener(eventName, () => {
      handle();
    });
    return () => {
      sub.remove();
    };
  }, [eventName, handle]);
}
