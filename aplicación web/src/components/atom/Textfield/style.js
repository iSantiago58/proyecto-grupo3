import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import OutlinedInput, {
  outlinedInputClasses,
} from "@mui/material/OutlinedInput";
//Resources
import { customColors } from "resources/const/Template";

export const TextfieldBase = styled(TextField)`
  width: 100%;

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #2699fb;
    }
    &.Mui-focused fieldset {
      border-color: #158ef8;
    }
  }
`;

export const TextfieldSm = styled(TextField)`
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #2699fb;
    }
    &.Mui-focused fieldset {
      border-color: #158ef8;
    }
  }
`;

export const CustomOutilinedInput = styled(OutlinedInput)(`
  & .${outlinedInputClasses.notchedOutline} {
    border-color: ${customColors.primary};
  }
  &:hover .${outlinedInputClasses.notchedOutline} {
    border-color:  #2699fb;
  }
  &.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline} {
    border-color: #158ef8;
  }
`);
