import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./style.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Button } from "components/atom/Button";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import DemoImage from "./demo.jpg";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export default function ImageEditor({ itemData = [], setItemData }) {
  const [image, setImage] = useState(DemoImage);
  const [, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const fileInput = React.useRef();
  const [btnDisabled, setBtnDisabled] = useState(true);
  let mimeType;
  console.log(itemData);

  React.useEffect(() => {
    const getBase64Image = (url) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png", 0.9);
        console.log(dataURL);
        return dataURL;
      };
      img.src = url;
    };

    ///

    function getURLBase64(url) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
          if (this.status === 200) {
            var blob = this.response;
            var fileReader = new FileReader();
            fileReader.onloadend = function (e) {
              var result = e.target.result;
              resolve(result);
            };
            fileReader.readAsDataURL(blob);
          }
        };
        xhr.onerror = function (e, msg) {
          reject(msg);
        };
        xhr.send();
      });
    }

    const cargarImagenes = async () => {
      if (itemData.length > 0) {
        let nuevasImagenes = [];
        await itemData.forEach(async (element) => {
          let url = process.env.REACT_APP_API_IMG + element.photo;
          getURLBase64(url);
          getBase64Image(url);

          nuevasImagenes.push(url);
        });

        console.log(nuevasImagenes);
        setItemData([...nuevasImagenes]);
      }
    };
    cargarImagenes();
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
    setBtnDisabled(false);
  };
  const dataURLtoMimeType = (dataURL) => {
    var BASE64_MARKER = ";base64,";
    var data;

    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(",");
      var contentType = parts[0].split(":")[1];
      data = decodeURIComponent(parts[1]);
    } else {
      var parts = dataURL.split(BASE64_MARKER);
      var contentType = parts[0].split(":")[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;

      data = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        data[i] = raw.charCodeAt(i);
      }
    }

    var arr = data.subarray(0, 4);
    var header = "";
    for (var i = 0; i < arr.length; i++) {
      header += arr[i].toString(16);
    }
    switch (header) {
      case "89504e47":
        mimeType = "image/png";
        break;
      case "47494638":
        mimeType = "image/gif";
        break;
      case "ffd8ffe0":
      case "ffd8ffe1":
      case "ffd8ffe2":
        mimeType = "image/jpeg";
        break;
      default:
        mimeType = ""; // Or you can use the blob.type as fallback
        break;
    }

    return mimeType;
  };
  const getCropData = (e) => {
    e.preventDefault();

    console.log(dataURLtoMimeType(cropper.getCroppedCanvas().toDataURL()));
    console.log(cropper.getCroppedCanvas().toDataURL("image/jpeg"));

    if (typeof cropper !== "undefined") {
      console.log();
      setItemData([
        ...itemData,
        cropper.getCroppedCanvas().toDataURL("image/jpeg"),
      ]);

      setCropData(cropper.getCroppedCanvas().toDataURL("image/jpeg"));
    }
  };
  const cropperRef = React.useRef(null);

  return (
    <Box sx={{ width: "100%" }}>
      <ImageList sx={{ width: "100%" }} cols={4}>
        {itemData.map((item, i) => (
          <ImageListItem key={i}>
            <img
              src={item}
              alt={i}
              loading="lazy"
              onClick={() => {
                let fotos = [...itemData];
                fotos.splice(i, 1);
                setItemData([...fotos]);
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <div style={{ display: "inline-flex" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "5px" }}
              onClick={() => fileInput.current.click()}
            >
              Subir Imagen
            </Button>
            <Button
              style={{ margin: "5px" }}
              onClick={getCropData}
              disabled={btnDisabled}
            >
              Confirmar Imagen
            </Button>
          </div>
        </Grid>
        <Grid item alignItems="center" justifyContent="center" xs={6}>
          <Cropper
            zoomTo={0.1}
            style={{
              width: "100%",
            }}
            initialAspectRatio={16 / 9}
            aspectRatio={16 / 9}
            src={image}
            viewMode={2}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            scalable={false}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            ref={cropperRef}
            guides={false}
          />
        </Grid>
        <Grid item xs={6}>
          <input
            ref={fileInput}
            type="file"
            style={{ display: "none" }}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
