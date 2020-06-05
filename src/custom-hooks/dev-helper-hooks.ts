import React, { useRef, useEffect } from 'react';

// Custom hook to identify which props change is causing re-render.
function useWhyDidYouUpdate(name: string, props: any) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps: React.MutableRefObject<Object> = useRef();

  const renderCount: React.MutableRefObject<number> = useRef(0);

  useEffect(() => {
    console.log(`Inside why did you update -- ${renderCount.current++}`);
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log(`[${name}] ==> `, changesObj);
      } else {
        console.log(`[${name}] ==> `, 'No Changes');
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}

// Export.
export { useWhyDidYouUpdate };
