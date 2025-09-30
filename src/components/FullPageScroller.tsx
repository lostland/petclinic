import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import '../styles/fullPageScroller.css';


export interface FullPageSection {
  id: string;
  label: string;
  content: ReactNode;
  className?: string;
}

interface FullPageScrollerProps {
  sections: FullPageSection[];
}

const FullPageScroller = ({ sections }: FullPageScrollerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCompact, setIsCompact] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)').matches : false,
  );

  const totalSections = sections.length;

  const updateViewportHeight = useCallback(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
    const heightValue = `${viewportHeight}px`;
    document.documentElement.style.setProperty('--fp-vh', heightValue);

    if (containerRef.current) {
      containerRef.current.style.setProperty('--fp-vh', heightValue);
    }
  }, []);

  useEffect(() => {
    updateViewportHeight();

    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleResize = () => {
      updateViewportHeight();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      visualViewport?.removeEventListener('resize', handleResize);
    };
  }, [updateViewportHeight]);

  useEffect(() => {
    if (totalSections === 0) {
      setActiveIndex(0);
      setPrevIndex(null);
      setIsAnimating(false);
      return;
    }

    setActiveIndex((current) => {
      if (current >= totalSections) {
        return totalSections - 1;
      }
      if (current < 0) {
        return 0;
      }
      return current;
    });
  }, [totalSections]);

  const jumpToIndex = useCallback(
    (targetIndex: number, options?: { animate?: boolean }) => {
      if (totalSections === 0) {
        return;
      }

      const animate = options?.animate ?? true;
      const safeIndex = Math.min(Math.max(targetIndex, 0), totalSections - 1);

      setActiveIndex((current) => {
        if (safeIndex === current) {
          return current;
        }

        const nextDirection = safeIndex > current ? 'down' : 'up';

        if (animate) {
          setPrevIndex(current);
          setDirection(nextDirection);
          setIsAnimating(true);
        } else {
          setPrevIndex(null);
          setDirection(nextDirection);
          setIsAnimating(false);
        }

        return safeIndex;
      });
    },
    [totalSections],
  );

  const triggerSectionChange = useCallback(
    (offset: number) => {
      if (isAnimating || totalSections === 0) {
        return;
      }
      const nextIndex = activeIndex + offset;
      const clamped = Math.min(Math.max(nextIndex, 0), totalSections - 1);
      if (clamped === activeIndex) {
        return;
      }
      jumpToIndex(clamped, { animate: true });
    },
    [activeIndex, isAnimating, jumpToIndex, totalSections],
  );

  useEffect(() => {
    if (!isAnimating) {
      return undefined;
    }

    const element = containerRef.current;
    if (!element) {
      return undefined;
    }

    const handleTransitionEnd = (event: TransitionEvent) => {
      const prevSection = element.querySelector('.fp-section.is-prev');
      if (event.target === prevSection && event.propertyName === 'transform') {
        setIsAnimating(false);
        setPrevIndex(null);
      }
    };

    element.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      element.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isAnimating]);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 640px)');

    const handleChange = (event: MediaQueryListEvent) => {
      setIsCompact(event.matches);
    };

    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', handleChange);
    } else {
      query.addListener(handleChange);
    }

    setIsCompact(query.matches);

    return () => {
      if (typeof query.removeEventListener === 'function') {
        query.removeEventListener('change', handleChange);
      } else {
        query.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return undefined;
    }

    const handleWheel = (event: WheelEvent) => {
      if (totalSections <= 1) {
        return;
      }

      if (Math.abs(event.deltaY) < 16) {
        return;
      }

      event.preventDefault();
      triggerSectionChange(event.deltaY > 0 ? 1 : -1);
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (totalSections <= 1) {
        return;
      }

      if (touchStartY.current === null) {
        return;
      }

      const currentY = event.touches[0]?.clientY ?? 0;
      const diff = touchStartY.current - currentY;

      if (Math.abs(diff) < 32) {
        return;
      }

      event.preventDefault();
      triggerSectionChange(diff > 0 ? 1 : -1);
      touchStartY.current = null;
    };

    const handleTouchEnd = () => {
      touchStartY.current = null;
    };

    element.addEventListener('wheel', handleWheel, { passive: false });
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      element.removeEventListener('wheel', handleWheel);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [totalSections, triggerSectionChange]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (totalSections <= 1) {
        return;
      }

      const key = event.key;

      if (key === 'ArrowDown' || key === 'PageDown') {
        event.preventDefault();
        triggerSectionChange(1);
      } else if (key === 'ArrowUp' || key === 'PageUp') {
        event.preventDefault();
        triggerSectionChange(-1);
      } else if (key === 'Home') {
        event.preventDefault();
        jumpToIndex(0, { animate: true });
      } else if (key === 'End') {
        event.preventDefault();
        jumpToIndex(totalSections - 1, { animate: true });
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [jumpToIndex, totalSections, triggerSectionChange]);

  const idToIndex = useMemo(() => {
    const lookup = new Map<string, number>();
    sections.forEach((section, index) => {
      lookup.set(section.id, index);
    });
    return lookup;
  }, [sections]);

  useEffect(() => {
    if (totalSections === 0) {
      return;
    }

    const applyHash = (hash: string, animate: boolean) => {
      const clean = hash.startsWith('#') ? hash.substring(1) : hash;
      if (!clean) {
        return;
      }
      const index = idToIndex.get(clean);
      if (typeof index === 'number') {
        jumpToIndex(index, { animate });
      }
    };

    applyHash(window.location.hash, false);

    const handleHashChange = () => {
      applyHash(window.location.hash, true);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [idToIndex, jumpToIndex, totalSections]);

  useEffect(() => {
    if (totalSections === 0) {
      return;
    }
    const currentSection = sections[activeIndex];
    if (!currentSection) {
      return;
    }
    const nextHash = `#${currentSection.id}`;
    if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }, [activeIndex, sections, totalSections]);

  const progressValue = totalSections > 0 ? ((activeIndex + 1) / totalSections) * 100 : 0;
  const progressLabel = useMemo(() => {
    const current = String(activeIndex + 1).padStart(2, '0');
    const total = String(totalSections).padStart(2, '0');
    return `${current} / ${total}`;
  }, [activeIndex, totalSections]);

  const orientation = isCompact ? 'horizontal' : 'vertical';
  const progressStyle =
    orientation === 'horizontal' ? ({ ['--fp-progress' as const]: `${progressValue}%` } as CSSProperties) : undefined;

  const backgroundClassNames = useMemo(
    () =>
      sections.map((section) => {
        const className = section.className ?? '';
        return className
          .split(/\s+/)
          .filter((token) => token && token.startsWith('section-bg-'))
          .join(' ');
      }),
    [sections],
  );

  return (
    <div className="fullpage-container" ref={containerRef}>
      <div className="fp-backgrounds" aria-hidden="true">
        {sections.map((section, index) => {
          const isActiveBackground = index === activeIndex;
          const isPrevBackground = index === prevIndex;
          const relativeBackgroundPosition =
            index === activeIndex ? '' : index < activeIndex ? 'is-above' : 'is-below';
          const backgroundClassName = [
            'fp-background-layer',
            backgroundClassNames[index],
            relativeBackgroundPosition,
            isActiveBackground ? 'is-active' : '',
            isPrevBackground ? 'is-prev' : '',
            isActiveBackground && isAnimating
              ? direction === 'down'
                ? 'entering-down'
                : 'entering-up'
              : '',
            isPrevBackground && isAnimating
              ? direction === 'down'
                ? 'leaving-down'
                : 'leaving-up'
              : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div
              key={`${section.id}-background`}
              className={backgroundClassName}
            />
          );
        })}
      </div>

      {sections.map((section, index) => {
        const isActive = index === activeIndex;
        const isPrevSection = index === prevIndex;
        const relativePosition =
          index === activeIndex ? '' : index < activeIndex ? 'is-above' : 'is-below';

        const sectionClassNames = [
          'fp-section',
          relativePosition,
          section.className ?? '',
          isActive ? 'is-active' : '',
          isPrevSection ? 'is-prev' : '',
          isActive && isAnimating ? (direction === 'down' ? 'entering-down' : 'entering-up') : '',
          isPrevSection ? (direction === 'down' ? 'leaving-down' : 'leaving-up') : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <section
            key={section.id}
            id={section.id}
            className={sectionClassNames}
            aria-hidden={!isActive}
            aria-label={section.label}
            data-section-id={section.id}
          >
            <div className="fp-section-inner">
              <div className="fp-section-content">{section.content}</div>
            </div>
          </section>
        );
      })}

      {totalSections > 0 && (
        <div
          className="fp-progress"
          data-orientation={orientation}
          style={progressStyle}
          aria-hidden="true"
        >
          <span className="fp-progress-count">{progressLabel}</span>
          <span className="fp-progress-track">
            <span
              className="fp-progress-bar"
              style={orientation === 'vertical' ? { height: `${progressValue}%` } : undefined}
            />
          </span>
        </div>
      )}
    </div>
  );
};

export default FullPageScroller;
