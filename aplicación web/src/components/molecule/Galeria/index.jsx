import React from "react";
import { ImageGallery } from "react-image-gallery";

export default function Galeria({
  images = [{ original: "", thumbnail: "" }],
}) {
  return <ImageGallery items={images} />;
}
