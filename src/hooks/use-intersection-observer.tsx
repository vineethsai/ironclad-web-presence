
import React from 'react';

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

export function useInView(options: IntersectionObserverOptions = {}) {
  const [ref, setRef] = React.useState<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const { threshold = 0, rootMargin = '0px', root = null, triggerOnce = false } = options;

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin, root }
    );

    let observerRefValue: Element | null = null;

    if (ref) {
      observer.observe(ref);
      observerRefValue = ref;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, [ref, threshold, rootMargin, root, triggerOnce]);

  return [setRef, isIntersecting] as const;
}

export default useInView;
