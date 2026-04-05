"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 30;

const currentFrame = (index: number) =>
  `/sequence/frame_${index.toString().padStart(2, "0")}_delay-0.07s.png`;

type Props = {
  scrollYProgress: MotionValue<number>;
  children?: React.ReactNode;
};

export default function ScrollyVideo({ scrollYProgress, children }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const renderImage = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    image: HTMLImageElement
  ) => {
    const hRatio = canvas.width / image.width;
    const vRatio = canvas.height / image.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - image.width * ratio) / 2;
    const centerShift_y = (canvas.height - image.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      centerShift_x,
      centerShift_y,
      image.width * ratio,
      image.height * ratio
    );
  };

  useEffect(() => {
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const currentProgress = scrollYProgress.get();
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(currentProgress * FRAME_COUNT)
        );
        const ctx = canvas.getContext("2d");
        if (ctx && images.length === FRAME_COUNT && images[frameIndex]) {
          renderImage(ctx, canvas, images[frameIndex]);
        }
      }
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // Set initial size and draw
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [images, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === FRAME_COUNT && canvasRef.current) {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(latest * FRAME_COUNT)
      );
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        requestAnimationFrame(() =>
          renderImage(ctx, canvas, images[frameIndex])
        );
      }
    }
  });

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      {images.length < FRAME_COUNT && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
          <p className="text-white text-lg animate-pulse">Loading Experience...</p>
        </div>
      )}
      <canvas ref={canvasRef} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      {children}
    </div>
  );
}
