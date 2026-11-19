"use client";

import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/core/image-comparison";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/core/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

const allWorks = [
  "01antes.webp",
  "02despues.webp",
  "balcon-card.webp",
  "IMG_2166.webp",
  "terraza1.webp",
  "estructura3.webp",
  "cerramiento (2) (1).webp",
  "escalera.webp",
  "balcon_ladrillo2.webp",
  "balcon2.webp",
  "estructura2.webp",
  "estructura1.webp",
  "cerramiento (3).webp",
  "balcon1.jpeg",
  "balcon1.webp",
  "balcon3.webp",
  "balcon_ladrillo.webp",
  "cerramiento (1) (1).webp",
  "cerramiento (1).webp",
  "cerramiento (2).webp",
  "gato.webp",
  "IMG_1931.webp",
  "IMG_2199.webp",
  "IMG_2219.webp",
  "IMG_2334.webp",
  "IMG_2496.webp",
  "IMG_2534.webp",
  "IMG_2535.webp",
  "IMG_2537.webp",
  "IMG_2615.webp",
  "IMG_2644.webp",
  "IMG_2800.webp",
  "IMG_2884.webp",
  "IMG_3091.webp",
  "IMG_3186.webp",
  "IMG_3187.webp",
  "pasaplatos.webp",
  "terraza2.webp",
  "terraza3.webp",
].map((filename) => ({ src: `/images/${filename}`, alt: filename }));

const featuredWorks = allWorks.slice(2, 8);
const initialGalleryItems = 8;

export function WorkGallery() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedWorkIndex, setSelectedWorkIndex] = useState<number | null>(null);
  const [previewDirection, setPreviewDirection] = useState<-1 | 1>(1);
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(initialGalleryItems);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set());
  const previewLoads = useRef(new Map<string, Promise<void>>());
  const previewIndexRef = useRef<number | null>(null);
  const previewPointerStart = useRef<{ id: number; x: number; y: number } | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isPreviewOpen = selectedWorkIndex !== null;
  const selectedWork = selectedWorkIndex === null ? null : allWorks[selectedWorkIndex];

  const markImageLoaded = (src: string) => {
    setLoadedImages((loaded) => {
      if (loaded.has(src)) return loaded;
      return new Set(loaded).add(src);
    });
  };

  const preloadPreview = useCallback((work: (typeof allWorks)[number]) => {
    const existingLoad = previewLoads.current.get(work.src);
    if (existingLoad) return existingLoad;
    const load = new Promise<void>((resolve) => {
      const image = new window.Image();
      image.decoding = "async";
      image.onload = () => {
        const decoded = image.decode?.();
        if (decoded) {
          decoded.catch(() => undefined).finally(resolve);
          return;
        }
        resolve();
      };
      image.onerror = () => resolve();
      image.src = work.src;
    });
    previewLoads.current.set(work.src, load);
    return load;
  }, []);

  const openPreview = useCallback(
    (work: (typeof allWorks)[number], direction: -1 | 1 = 1) => {
      const nextIndex = allWorks.findIndex((item) => item.src === work.src);
      if (nextIndex === -1) return;

      previewIndexRef.current = nextIndex;
      setPreviewDirection(direction);
      setSelectedWorkIndex(nextIndex);
      void preloadPreview(work);
    },
    [preloadPreview],
  );

  const closePreview = useCallback(() => {
    previewIndexRef.current = null;
    setSelectedWorkIndex(null);
  }, []);

  const showAdjacentPreview = useCallback(
    (direction: -1 | 1) => {
      const currentIndex = previewIndexRef.current;
      if (currentIndex === null) return;

      const nextIndex = (currentIndex + direction + allWorks.length) % allWorks.length;
      previewIndexRef.current = nextIndex;
      setPreviewDirection(direction);
      setSelectedWorkIndex(nextIndex);
      void preloadPreview(allWorks[nextIndex]);
    },
    [preloadPreview],
  );

  const handlePreviewPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch" || !event.isPrimary) return;

    previewPointerStart.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePreviewPointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = previewPointerStart.current;
    previewPointerStart.current = null;

    if (!start || start.id !== event.pointerId) return;

    const distanceX = event.clientX - start.x;
    const distanceY = event.clientY - start.y;
    if (Math.abs(distanceX) < 48 || Math.abs(distanceX) <= Math.abs(distanceY)) return;

    showAdjacentPreview(distanceX > 0 ? -1 : 1);
  };

  useEffect(() => {
    const preloadFeaturedWorks = () => featuredWorks.forEach((work) => void preloadPreview(work));
    const idleCallback = window.requestIdleCallback?.(preloadFeaturedWorks, { timeout: 2500 });
    const timeout = idleCallback ? undefined : window.setTimeout(preloadFeaturedWorks, 1200);
    return () => {
      if (idleCallback) window.cancelIdleCallback?.(idleCallback);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [preloadPreview]);

  useEffect(() => {
    if (!isGalleryOpen) return;

    [allWorks[0], allWorks[1], allWorks.at(-1)].forEach((work) => {
      if (work) void preloadPreview(work);
    });
  }, [isGalleryOpen, preloadPreview]);

  useEffect(() => {
    if (selectedWorkIndex === null) return;

    const previousIndex = (selectedWorkIndex - 1 + allWorks.length) % allWorks.length;
    const nextIndex = (selectedWorkIndex + 1) % allWorks.length;
    void preloadPreview(allWorks[previousIndex]);
    void preloadPreview(allWorks[nextIndex]);
  }, [preloadPreview, selectedWorkIndex]);

  useEffect(() => {
    if (!isPreviewOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showAdjacentPreview(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showAdjacentPreview(1);
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closePreview();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closePreview, isPreviewOpen, showAdjacentPreview]);

  const imageTriggerProps = (work: (typeof allWorks)[number]) => ({
    "aria-label": `Ampliar ${work.alt}`,
    onClick: () => void openPreview(work),
    onFocus: () => void preloadPreview(work),
    onPointerEnter: () => void preloadPreview(work),
  });

  return (
    <section className="section" id="trabajos" aria-labelledby="works-title">
      <Dialog
        open={isGalleryOpen}
        onOpenChange={(open) => {
          if (open) setVisibleGalleryCount(initialGalleryItems);
          setIsGalleryOpen(open);
        }}
      >
        <div className="shell">
          <div className="gallery-heading">
            <div>
              <p className="eyebrow">Galería</p>
              <h2 className="section-title" id="works-title">
                Nuestros trabajos
              </h2>
            </div>
            <p className="section-copy">
              Cada espacio es diferente. Conocé algunas de nuestras instalaciones de redes de
              protección en balcones, ventanas, terrazas y patios.
            </p>
          </div>
          <figure className="work-comparison">
            <ImageComparison
              ariaLabel="Comparar el antes y el después"
              className="work-comparison-frame"
              enableHover
            >
              <ImageComparisonImage src="/images/01antes.webp" alt="01antes.webp" position="left" />
              <ImageComparisonImage
                src="/images/02despues.webp"
                alt="02despues.webp"
                position="right"
              />
              <ImageComparisonSlider className="work-comparison-slider" />
              <span className="work-comparison-label work-comparison-label-before">Antes</span>
              <span className="work-comparison-label work-comparison-label-after">Después</span>
            </ImageComparison>
            <figcaption>
              Mové el cursor o deslizá el control para comparar el antes y el después.
            </figcaption>
          </figure>
          <div className="gallery">
            {featuredWorks.map((work, index) => (
              <figure
                className="gallery-card gallery-card--enter"
                data-loaded={loadedImages.has(work.src)}
                key={`${work.src}-${index}`}
                style={{ animationDelay: `${index * 55}ms` }}
              >
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  loading="lazy"
                  decoding="async"
                  onLoad={() => markImageLoaded(work.src)}
                  onError={() => markImageLoaded(work.src)}
                  sizes={
                    index === 0 ? "(min-width: 704px) 60vw, 100vw" : "(min-width: 704px) 30vw, 50vw"
                  }
                />
                <span className="gallery-image-skeleton" aria-hidden="true" />
                <button
                  className="gallery-card-trigger"
                  type="button"
                  {...imageTriggerProps(work)}
                />
              </figure>
            ))}
          </div>
          <DialogTrigger
            className="button gallery-more-button"
            aria-expanded={isGalleryOpen}
            aria-haspopup="dialog"
          >
            Ver la galería completa
            <ChevronRight aria-hidden="true" />
          </DialogTrigger>
        </div>

        <DialogContent className="gallery-modal">
          <DialogHeader className="gallery-modal-header">
            <div>
              <p className="eyebrow">Galería completa</p>
              <DialogTitle>Todos nuestros trabajos</DialogTitle>
              <DialogDescription className="sr-only">
                Galería de instalaciones de redes de protección.
              </DialogDescription>
            </div>
            <DialogClose className="gallery-modal-close" aria-label="Cerrar galería">
              <X aria-hidden="true" />
            </DialogClose>
          </DialogHeader>
          <div className="gallery-modal-grid">
            {allWorks.slice(0, visibleGalleryCount).map((work, index) => (
              <figure
                className="gallery-modal-card gallery-modal-card--enter"
                data-loaded={loadedImages.has(work.src)}
                key={`${work.src}-${index}`}
                style={{ animationDelay: `${(index % initialGalleryItems) * 45}ms` }}
              >
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  loading="lazy"
                  decoding="async"
                  onLoad={() => markImageLoaded(work.src)}
                  onError={() => markImageLoaded(work.src)}
                  sizes="25vw"
                />
                <span className="gallery-image-skeleton" aria-hidden="true" />
                <button
                  className="gallery-modal-card-trigger"
                  type="button"
                  {...imageTriggerProps(work)}
                />
              </figure>
            ))}
          </div>
          {visibleGalleryCount < allWorks.length && (
            <button
              className="button button-secondary gallery-modal-more-button"
              type="button"
              onClick={() =>
                setVisibleGalleryCount((count) =>
                  Math.min(count + initialGalleryItems, allWorks.length),
                )
              }
            >
              Cargar más fotos
            </button>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isPreviewOpen} onOpenChange={(open) => !open && closePreview()}>
        <DialogContent
          className="gallery-preview-dialog"
          transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          variants={{
            initial: { opacity: 0, scale: 0.82 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.82 },
          }}
        >
          {selectedWork && (
            <figure
              aria-label={`Vista ampliada de ${selectedWork.alt}`}
              className="gallery-preview-image"
              onPointerCancel={() => {
                previewPointerStart.current = null;
              }}
              onPointerDown={handlePreviewPointerDown}
              onPointerUp={handlePreviewPointerUp}
            >
              <button
                aria-label="Ver imagen anterior"
                className="gallery-preview-navigation gallery-preview-navigation-previous"
                type="button"
                onClick={() => showAdjacentPreview(-1)}
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <DialogClose className="gallery-preview-close" aria-label="Cerrar imagen ampliada">
                <X aria-hidden="true" />
              </DialogClose>
              <AnimatePresence initial={false} custom={previewDirection}>
                <motion.div
                  animate="animate"
                  className="gallery-preview-media"
                  custom={previewDirection}
                  exit="exit"
                  initial="initial"
                  key={selectedWork.src}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.24, ease: [0.42, 0, 0.58, 1] }
                  }
                  variants={{
                    initial: (direction: -1 | 1) => ({
                      opacity: 0,
                      x: `${direction * 100}%`,
                    }),
                    animate: { opacity: 1, x: "0%" },
                    exit: (direction: -1 | 1) => ({
                      opacity: 0,
                      x: `${direction * -100}%`,
                    }),
                  }}
                >
                  <Image
                    src={selectedWork.src}
                    alt={selectedWork.alt}
                    decoding="async"
                    fill
                    sizes="(min-width: 1158px) 68rem, 94vw"
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
              <span className="gallery-preview-counter" aria-live="polite">
                {selectedWorkIndex! + 1} / {allWorks.length}
              </span>
              <button
                aria-label="Ver imagen siguiente"
                className="gallery-preview-navigation gallery-preview-navigation-next"
                type="button"
                onClick={() => showAdjacentPreview(1)}
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
