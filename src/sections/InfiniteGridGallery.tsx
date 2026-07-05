import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GRID_IMAGES = [
  '/images/event-01.jpg',
  '/images/event-02.jpg',
  '/images/event-03.jpg',
  '/images/event-04.jpg',
  '/images/event-05.jpg',
  '/images/event-06.jpg',
  '/images/event-07.jpg',
  '/images/event-08.jpg',
  '/images/event-09.jpg',
  '/images/event-10.jpg',
  '/images/event-11.jpg',
  '/images/event-12.jpg',
  '/images/event-13.jpg',
  '/images/event-14.jpg',
  '/images/event-15.jpg',
  '/images/event-16.jpg',
  '/images/event-17.jpg',
  '/images/event-18.jpg',
  '/images/event-19.jpg',
];

const ITEMS_PER_ROW = 6;
const TOTAL_ROWS = 5;
const Z_MIN = -3500;
const Z_MAX = 1000;

interface GridItemData {
  id: string;
  rowIndex: number;
  itemIndex: number;
  imageUrl: string;
}

export default function InfiniteGridGallery() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const rowData = useMemo(() => {
    const rows: GridItemData[][] = [];
    for (let r = 0; r < TOTAL_ROWS; r++) {
      const row: GridItemData[] = [];
      for (let i = 0; i < ITEMS_PER_ROW; i++) {
        const imageIdx = (r * ITEMS_PER_ROW + i) % GRID_IMAGES.length;
        row.push({
          id: `grid-${r}-${i}`,
          rowIndex: r,
          itemIndex: i,
          imageUrl: GRID_IMAGES[imageIdx],
        });
      }
      rows.push(row);
    }
    return rows;
  }, []);

  const rowOffsets = [0, -0.2, -0.1, -0.4, -0.2];

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const timer = setTimeout(() => setIsReady(true), 300);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isReady || !gridRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.gallery-trigger',
        start: 'top top',
        end: '+=400%',
        scrub: true,
        pin: true,
      },
    });

    tl.to(gridRef.current, { opacity: 1, duration: 0.1 });

    return () => {
      tl.kill();
    };
  }, [isReady]);

  useEffect(() => {
    if (!isReady || !gridRef.current) return;

    const gridEl = gridRef.current;
    let animationFrameId: number;

    const updateGrid = () => {
      const progress = Math.min(
        Math.max(window.scrollY / (window.innerHeight * 4), 0),
        1
      );

      const zRange = Z_MAX - Z_MIN;
      const targetZ = Z_MIN + progress * zRange;

      interface SortedItem {
        element: HTMLDivElement;
        x: number;
        y: number;
        z: number;
        computedZ: number;
        rowIndex: number;
      }

      const sortedItems: SortedItem[] = [];

      for (const row of rowData) {
        for (const item of row) {
          const element = itemRefs.current.get(item.id);
          if (!element) continue;

          const baseRowOffset = rowOffsets[item.rowIndex] * dimensions.width;
          const waveX =
            Math.sin(item.rowIndex * 0.5 + targetZ * 0.001) * 250;
          const waveY =
            Math.cos(item.itemIndex * 0.5 + targetZ * 0.001) * 100;
          const rowVerticalOffset = progress * -500 * item.rowIndex * 0.1;

          const x = baseRowOffset + waveX;
          const y = waveY + rowVerticalOffset;
          const z = targetZ + item.rowIndex * 150;
          const computedZ = z;

          sortedItems.push({ element, x, y, z, computedZ, rowIndex: item.rowIndex });
        }
      }

      sortedItems.sort((a, b) => b.computedZ - a.computedZ);

      for (const item of sortedItems) {
        gridEl.appendChild(item.element);
      }

      for (const item of sortedItems) {
        const { computedZ, z } = item;
        const scale = Math.max(
          0.2,
          Math.min(1.5, ((computedZ - Z_MIN) / zRange) * 1.3 + 0.2)
        );
        const rotateX = ((computedZ - Z_MIN) / zRange) * -105 + 75;
        const rotateZ = ((computedZ - Z_MIN) / zRange) * 20 - 10;
        const brightness = Math.max(
          0.5,
          Math.min(1, ((computedZ - Z_MIN) / zRange) * 0.5 + 0.5)
        );

        item.element.style.transform = `translate3d(${item.x}px, ${item.y}px, ${item.z}px) scale(${scale}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`;
        item.element.style.filter = `brightness(${brightness})`;
        item.element.style.opacity =
          z > Z_MAX - 100 || z < Z_MIN + 100 ? '0' : '1';
        item.element.style.display =
          z > Z_MAX || z < Z_MIN - 100 ? 'none' : 'block';
      }

      animationFrameId = requestAnimationFrame(updateGrid);
    };

    updateGrid();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReady, dimensions, rowData]);

  return (
    <div id="gallery" className="gallery-trigger relative" style={{ height: '100vh' }}>
      {/* Background transition overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(45, 10, 49, 0.3) 50%, rgba(45, 10, 49, 0.95) 100%)',
          zIndex: 1,
        }}
      />

      {/* 3D Grid */}
      <div ref={gridRef} className="grid-container" style={{ zIndex: 2 }}>
        {rowData.map((row, rowIdx) => (
          <div key={rowIdx} className="grid-row">
            {row.map((item) => (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.id, el);
                }}
                className="grid-item"
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                }}
                role="img"
                aria-label={`AFHI event photo ${item.rowIndex * ITEMS_PER_ROW + item.itemIndex + 1}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
