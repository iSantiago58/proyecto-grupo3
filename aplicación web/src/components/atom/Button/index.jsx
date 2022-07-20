import { ButtonBase, TextBase } from "./style";

//material component
import SearchIcon from "@mui/icons-material/Search";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Button = ({
  theme,
  variant = "contained",
  children = "Default",
  onClick,
  width,
  ...props
}) => {
  return (
    <ButtonBase
      width={width}
      onClick={onClick}
      theme={theme}
      variant={variant}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};

const IconButton = ({
  theme,
  children = "Default",
  onClick,
  icon = <SearchIcon />,
  ...props
}) => {
  return (
    <ButtonBase
      onClick={onClick}
      theme={theme}
      variant="contained"
      startIcon={icon}
      {...props}
    >
      {children}
    </ButtonBase>
  );
};
const TextButton = ({
  theme,
  children = "Default",
  onClick,
  icon = <SearchIcon />,
}) => {
  return (
    <TextBase onClick={onClick} theme={theme} variant="text">
      {children}
    </TextBase>
  );
};

/*
SELECCIONA UNA IMAGEN
*/
const ImgButton = ({
  theme,
  children = "Default",
  onClick,
  icon = <SearchIcon />,
}) => {
  return (
    <IconButton
      onClick={onClick}
      theme={theme}
      variant="text"
      icon={<CloudUploadIcon />}
    >
      {children}
    </IconButton>
  );
};

export { IconButton, Button, TextButton, ImgButton };
