import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number; // in milliseconds (default: 2000)
  decimals?: number; // number of decimal places (default: 0)
  prefix?: string;
  suffix?: string;
  className?: string;
  useGrouping?: boolean; // format with comma thousands separator (default: false)
}

/**
 * Smooth easeOutExpo easing function for realistic deceleration
 */
function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  useGrouping = false,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(() => {
    return '0' + (decimals > 0 ? '.' + '0'.repeat(decimals) : '');
  });
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Format helper function
    const formatNumber = (num: number): string => {
      const fixed = num.toFixed(decimals);
      if (!useGrouping) {
        return fixed;
      }
      const parts = fixed.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    };

    const startCounting = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const startTime = performance.now();
      const startValue = 0;
      const targetValue = value;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);

        const currentVal = startValue + (targetValue - startValue) * easedProgress;
        setDisplayValue(formatNumber(currentVal));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(formatNumber(targetValue));
        }
      };

      requestAnimationFrame(animate);
    };

    // Use Intersection Observer to trigger when visible in viewport
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startCounting();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      observer.observe(node);

      return () => {
        observer.disconnect();
      };
    } else {
      // Fallback for environments without IntersectionObserver
      startCounting();
    }
  }, [value, duration, decimals, useGrouping]);

  return (
    <span ref={containerRef} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
