import React, { useRef, useState } from "react";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function Crop({ ...props }) {
  return (
    <Cropper
      style={{ height: 400, width: "100%" }}
      // Cropper.js options
      initialAspectRatio={1}
      aspectRatio={1}
      guides={false}
      zoomOnWheel={false}
      {...props}
    />
  );
}
