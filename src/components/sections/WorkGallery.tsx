"use client";

import { AnimatedGroup } from "@/components/core/animated-group";
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
import { X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const allWorks = [
  "01antes.webp",
  "02despues.webp",
  "balcon-card.webp",
  "balcon_ladrillo2.webp",
  "balcon2.webp",
  "cerramiento (3).webp",
  "escalera.webp",
  "estructura2.webp",
  "balcon1.jpeg",
  "balcon1.webp",
  "balcon3.webp",
  "balcon_ladrillo.webp",
  "cerramiento (1) (1).webp",
  "cerramiento (1).webp",
  "cerramiento (2) (1).webp",
  "cerramiento (2).webp",
  "estructura1.webp",
  "estructura3.webp",
  "gato.webp",
  "IMG_1931.webp",
  "IMG_2166.webp",
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
  "terraza1.jpeg",
  "terraza1.webp",
].map((filename) => ({ src: `/images/${filename}`, alt: filename }));

const featuredWorks = allWorks.slice(2, 8);
const initialGalleryItems = 8;

export function WorkGallery() {
  const shouldReduceMotion = useReducedMotion();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<(typeof allWorks)[number] | null>(null);
  const [previewPendingSrc, setPreviewPendingSrc] = useState<string | null>(null);
  const [visibleGalleryCount, setVisibleGalleryCount] = useState(initialGalleryItems);
  const previewLoads = useRef(new Map<string, Promise<void>>());
  const previewRequestRef = useRef(0);

  const preloadPreview = (work: (typeof allWorks)[number]) => {
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
  };

  const openPreview = async (work: (typeof allWorks)[number]) => {
    const requestId = ++previewRequestRef.current;
    setPreviewPendingSrc(work.src);
    await preloadPreview(work);
    if (requestId === previewRequestRef.current) {
      setSelectedWork(work);
      setPreviewPendingSrc(null);
    }
  };

  const closePreview = () => {
    previewRequestRef.current += 1;
    setPreviewPendingSrc(null);
    setSelectedWork(null);
  };

  useEffect(() => {
    const preloadFeaturedWorks = () => featuredWorks.forEach((work) => void preloadPreview(work));
    const idleCallback = window.requestIdleCallback?.(preloadFeaturedWorks, { timeout: 2500 });
    const timeout = idleCallback ? undefined : window.setTimeout(preloadFeaturedWorks, 1200);
    return () => {
      if (idleCallback) window.cancelIdleCallback?.(idleCallback);
      if (timeout) window.clearTimeout(timeout);
    };
  }, []);

  const imageTriggerProps = (work: (typeof allWorks)[number]) => ({
    "aria-busy": previewPendingSrc === work.src,
    "aria-label": `Ampliar ${work.alt}`,
    "data-loading": previewPendingSrc === work.src,
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
          <AnimatedGroup className="gallery" preset="scale">
            {featuredWorks.map((work, index) => (
              <motion.figure
                className="gallery-card"
                key={`${work.src}-${index}`}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -10,
                        scale: 1.015,
                        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                      }
                }
              >
                <Image
                  src={work.src}
                  alt={work.alt}
                  fill
                  loading="lazy"
                  sizes={
                    index === 0 ? "(min-width: 704px) 60vw, 100vw" : "(min-width: 704px) 30vw, 50vw"
                  }
                />
                <button
                  className="gallery-card-trigger"
                  type="button"
                  {...imageTriggerProps(work)}
                />
              </motion.figure>
            ))}
          </AnimatedGroup>
          <DialogTrigger
            className="button button-secondary gallery-more-button"
            aria-expanded={isGalleryOpen}
            aria-haspopup="dialog"
          >
            Ver más trabajos
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
          <AnimatedGroup className="gallery-modal-grid" preset="scale">
            {allWorks.slice(0, visibleGalleryCount).map((work, index) => (
              <motion.figure
                className="gallery-modal-card"
                key={`${work.src}-${index}`}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        scale: 1.02,
                        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                      }
                }
              >
                <Image src={work.src} alt={work.alt} fill loading="lazy" sizes="25vw" />
                <button
                  className="gallery-modal-card-trigger"
                  type="button"
                  {...imageTriggerProps(work)}
                />
              </motion.figure>
            ))}
          </AnimatedGroup>
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

      <Dialog open={Boolean(selectedWork)} onOpenChange={(open) => !open && closePreview()}>
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
            >
              <DialogClose className="gallery-preview-close" aria-label="Cerrar imagen ampliada">
                <X aria-hidden="true" />
              </DialogClose>
              <Image src={selectedWork.src} alt={selectedWork.alt} fill priority unoptimized />
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
