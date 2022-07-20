import TextfieldBase, { IconTextField } from "components/atom/Textfield";

export default {
  title: "Atoms/Textfield",
  component: TextfieldBase,
};

export const Default = () => <TextfieldBase></TextfieldBase>;
export const Icon = () => <IconTextField></IconTextField>;
