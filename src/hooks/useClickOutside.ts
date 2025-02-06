import { useEffect, RefObject } from 'react';

const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))
      ) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, onClickOutside]);
};

export default useClickOutside;
