import { useEffect } from 'react';

/**
 * The `useKeyDown` function in JavaScript allows you to listen for a specific key press and execute a
 * callback function when that key is pressed.
 * @param key - The `key` parameter in the `useKeyDown` function represents the specific keyboard key
 * that you want to listen for. When that key is pressed, the `callback` function will be executed.
 * @param callback - The `callback` parameter is a function that will be called when the specified
 * `key` is pressed on the keyboard.
 */
const useKeyDown = (key, callback) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
};

export default useKeyDown;
