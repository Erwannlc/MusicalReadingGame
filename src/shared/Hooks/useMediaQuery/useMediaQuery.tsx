import { useState, useEffect } from "react";
// Thx to Andrew Bone (Link2Twenty)
// eslint-disable-next-line max-len
// https://codesandbox.io/s/elastic-tdd-c85hr?from-embed=&file=/src/hooks/useMediaQuery/index.tsx

export default function useMediaQuery (initalQuery: string) {
  const [query, setQuery] = useState(initalQuery);
  const firstRenderScreen = window.matchMedia(
    "screen and (max-width: 850px) and (max-height: 1023px)," +
    " screen and (max-height: 420px) and (orientation: landscape)" +
    " screen and (max-width: 960px) and (max-height: 600px)" +
    " and (orientation: landscape)"
  ).matches;
  // change default value by checking first render
  const [matches, setMatches] = useState(firstRenderScreen);

  // check query and listen for media change.
  useEffect(() => {
    if (!query) return;

    const _onChange = (mql: MediaQueryListEvent) => {
      setMatches(mql.matches);
    };

    const mql = window.matchMedia(query);

    setMatches(mql.matches);

    mql.addEventListener("change", _onChange);

    return () => { mql.removeEventListener("change", _onChange); };
  }, [query]);

  return [matches, setQuery] as const;
}
