import { useEffect, useState } from 'react';

export function useImageExists(url?: string): boolean {
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!url) {
      setExists(false);
      return;
    }

    const img = new Image();
    img.src = url;
    img.onload = () => setExists(true);
    img.onerror = () => setExists(false);
  }, [url]);

  return exists;
}
