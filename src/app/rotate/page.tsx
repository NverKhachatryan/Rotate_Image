"use client";
import { useState, useEffect } from "react";
import { NextPage } from "next";
import ImageRotate from "../components/ImageRotate";

const RotatePage: NextPage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const uploadedImage = sessionStorage.getItem("uploadedImage");
    if (uploadedImage) {
      setImageSrc(uploadedImage);
    }
  }, []);

  if (!imageSrc) {
    return <div>No image found. Please upload an image.</div>;
  }

  return (
    <div>
      <ImageRotate imageSrc={imageSrc} />
    </div>
  );
};

export default RotatePage;
