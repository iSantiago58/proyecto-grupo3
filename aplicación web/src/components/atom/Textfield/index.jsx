import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MaterialDatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextfieldBase, CustomOutilinedInput, TextfieldSm } from "./style";
import moment from "moment";
import { Alert } from "@mui/material";

export const TextField = React.forwardRef(
  (
    { theme, label = "Outlined", children = "Default", onClick, ...props },
    ref
  ) => {
    return (
      <TextfieldBase
        onClick={onClick}
        theme={theme}
        label={label}
        variant="outlined"
        ref={ref}
        {...props}
      >
        {children}
      </TextfieldBase>
    );
  }
);
const TextFieldSmall = React.forwardRef(
  (
    { theme, label = "Outlined", children = "Default", onClick, ...props },
    ref
  ) => {
    return (
      <TextfieldSm
        onClick={onClick}
        theme={theme}
        label={label}
        variant="outlined"
        ref={ref}
        {...props}
      >
        {children}
      </TextfieldSm>
    );
  }
);
const FormTextfield = ({
  error = "",
  onChange = () => {},
  onBlur = () => {},
  nombre = "por defecto",
  id = "",
  ...props
}) => {
  return (
    <TextField
      id={id}
      name={id}
      label={nombre}
      fullWidth
      required
      error={error !== ""}
      helperText={error === "" ? "" : error}
      onBlur={onBlur}
      onChange={onChange}
      {...props}
    ></TextField>
  );
};

const PasswordTextfield = ({
  id = "",
  nombre = "defecto",
  error = "",
  onChange = () => {},
  onBlur = () => {},
}) => {
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl fullWidth variant="outlined" color="primary">
      <InputLabel htmlFor="outlined-adornment-password">{nombre}</InputLabel>
      <CustomOutilinedInput
        id={id}
        name={id}
        label={nombre}
        type={values.showPassword ? "text" : "password"}
        error={error !== ""}
        // helperText={error === "" ? "" : error}
        onBlur={onBlur}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
export default TextField;

const IconTextField = ({
  iconStart = <Visibility />,
  iconEnd,
  InputProps,
  ...props
}) => {
  return (
    <TextfieldBase
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null,
      }}
    />
  );
};

const DatePicker = ({
  label = "Outlined",
  fecha,
  onChange,
  mayorDeEdad = false,
}) => {
  const [error, setError] = React.useState(false);
  if (mayorDeEdad) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MaterialDatePicker
          inputFormat="dd/MM/yyyy"
          label={label}
          value={fecha}
          onChange={(e) => {
            let fecha = new Date(e).getFullYear();
            if (fecha > new Date().getFullYear() - 18) {
              setError(true);
            } else {
              onChange(e);
              setError(false);
            }
          }}
          renderInput={(params) => <TextField {...params} />}
          style={{ width: "100%" }}
        />
        {error && <Alert severity="error">Debes ser mayor de edad</Alert>}
      </LocalizationProvider>
    );
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MaterialDatePicker
        inputFormat="dd/MM/yyyy"
        label={label}
        value={fecha}
        onChange={(e) => {
          onChange(e);
        }}
        renderInput={(params) => <TextField {...params} />}
        style={{ width: "100%" }}
      />
    </LocalizationProvider>
  );
};

export {
  IconTextField,
  FormTextfield,
  PasswordTextfield,
  DatePicker,
  TextFieldSmall,
};
