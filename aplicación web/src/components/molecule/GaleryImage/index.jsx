import React, { useState, useRef, useCallback, useContext } from "react";
import styled from "styled-components";
import { Button } from "components/atom/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { createMockSender } from "@rpldy/sender";

import { useRetry } from "@rpldy/retry-hooks";

import Uploady, {
  withRequestPreSendUpdate,
  UploadyContext,
  useItemProgressListener,
} from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
//react component
import Crop from "components/atom/CropImage";

const Layout = styled.div``;
const Input = styled("input")({
  display: "none",
});

export default function GaleryImage() {
  const [image, setImage] = useState("");
  const upload = (e) => {
    // Convert the FileList into an array and iterate
    Array.from(e.target.files).forEach((file) => {
      // Define a new file reader

      setImage(file);
      /*
      let reader = new FileReader();

      // Function to execute after loading the file
      reader.onload = () => console.log(reader.result);

      // Read the file as a text
      reader.readAsText(file);
      */
    });
  };

  return (
    <Layout>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={upload}
        />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
      <Crop img={image}></Crop>
    </Layout>
  );
}

const UploadProgress = () => {
  const [progress, setProgess] = useState(0);
  const progressData = useItemProgressListener();

  if (progressData && progressData.completed > progress) {
    setProgess(() => progressData.completed);
  }

  return progressData && <CircularProgress type="circle" value={progress} />;
};

const ItemPreviewWithCrop = withRequestPreSendUpdate((props) => {
  const { url, updateRequest, requestData } = props;
  const [crop, setCrop] = useState({ aspect: 4 / 3 });

  const onUploadCrop = useCallback(async () => {
    if (updateRequest && (crop?.height || crop?.width)) {
      requestData.items[0].file = await cropImage(
        url,
        requestData.items[0].file,
        crop
      );
      updateRequest({ items: requestData.items });
    }
  }, [url, requestData, updateRequest, crop]);

  return (
    <>
      <Crop src={url} crop={crop} onChange={setCrop} onComplete={setCrop} />
      <br />
      <button onClick={onUploadCrop}>Upload Cropped</button>
    </>
  );
});
const CustomButton = () => {
  const uploady = useContext(UploadyContext);
  const retry = useRetry();
  const hanldeUpload = useCallback(() => {
    retry("i-123");
    uploady.showFileUpload();
  }, [uploady]);

  return (
    <Button onClick={hanldeUpload} type="">
      Custom Upload Button
    </Button>
  );
};
const mockEnhancer = (Test) => {
  const mockSender = createMockSender({ delay: 1000 });
  Test.update({ send: mockSender.send });
  return uploader;
};

const Uploader = () => {
  const previewMethodsRef = useRef();
  const [updatePreview, setUpdatePreview] = useState(false);

  const changeUpload = () => {};

  return (
    <Uploady
      destination={{ url: "[upload-url]" }}
      multiple={true}
      accept={".png,.jpg"}
      enhancer={mockEnhancer}
    >
      <br />
      <CustomButton>Select File</CustomButton>
      <br />
      <UploadProgress></UploadProgress>

      <br />

      <UploadPreview
        PreviewComponent={ItemPreviewWithCrop}
        previewComponentProps={{ previewMethods: previewMethodsRef }}
        previewMethodsRef={previewMethodsRef}
        onPreviewsChanged={changeUpload}
      />
    </Uploady>
  );
};

export { Uploader };
