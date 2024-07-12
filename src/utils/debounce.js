/**
 * The `debounce` function in JavaScript delays the execution of a function until a specified amount of
 * time has passed without the function being called again.
 * @param func - The `func` parameter in the `debounce` function is the function that you want to
 * debounce. This function will be called after the specified delay if no new calls to the debounced
 * function are made within that delay period.
 * @param delay - The `delay` parameter in the `debounce` function represents the amount of time in
 * milliseconds to wait before invoking the `func` function. This delay is used to ensure that the
 * `func` function is only called once after a certain period of inactivity, even if it is triggered
 * multiple times
 * @returns A function is being returned.
 */
export default function debounce(func, delay) {
    let timerId;
    return function() {
        console.count('debounce called before timeout', );
        clearTimeout(timerId);
        let args = arguments;

        timerId = setTimeout(() => {
            console.count('debounce called ', );
            func(...args);
        }, delay);
        
    }
}