/**
 * This hook notifies when a map is loaded
 *
 * @export
 * @param {mapLoadedCallback} The callback that handles the event.
 * @returns {Array} [ref, setRef]
 */
  export function useMapJustMounted(callback) {
    const ref = useRef(null);
    const mounted = useRef(false);
    const setRef = useCallback(
      node => {
        if (node !== null && !mounted.current) {
          callback(node);
        }
        mounted.current = true;
        // Save a reference to the node
        ref.current = node;
      },
      [callback]
    );
    return [ref, setRef];
  }