"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../styles/RotatePage.module.css";
import { useRouter } from "next/navigation";

interface ImageRotateProps {
  imageSrc: string;
}

const ImageRotate = ({ imageSrc }: ImageRotateProps) => {
  const [rotation, setRotation] = useState(0);
  const [rotatedImageDataUrl, setRotatedImageDataUrl] = useState<
    string | undefined
  >(undefined);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = new Image();
    img.src = imageSrc;

    if (!canvas) return;

    if (!ctx) return;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.translate(img.width / 2, img.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -(img.width / 2), -(img.height / 2));
      const rotatedImage = canvas.toDataURL();
      setRotatedImageDataUrl(rotatedImage);
    };
  }, [rotation]);

  const handleRotationChange = (e: { target: { value: string } }) => {
    setRotation(parseInt(e.target.value));
  };

  const rotateLeft = () => {
    const newRotation = (rotation - 90 + 360) % 360;
    setRotation(newRotation);
  };

  const rotateRight = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <>
      <h1 className={styles.downloadButton}>Rotate Image</h1>
      <div className={styles.rotateContainer}>
        <canvas ref={canvasRef} className={styles.image}></canvas>
        <button onClick={handleCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <div className={styles.controls}>
          <h2>Controls</h2>
          <div className={styles.controlButtons}>
            <button onClick={rotateLeft}>Rotate Left</button>
            <button onClick={rotateRight}>Rotate Right</button>
          </div>
          <input
            type="number"
            min="0"
            max="360"
            value={rotation}
            onChange={handleRotationChange}
          />
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={handleRotationChange}
          />
          <a
            href={rotatedImageDataUrl}
            className={styles.downloadButton}
            download="rotated-image.png"
          >
            Download Rotated Image
          </a>
        </div>
      </div>
    </>
  );
};

export default ImageRotate;
