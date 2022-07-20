import { Button, IconButton, TextButton } from "components/atom/Button";

export default {
  title: "Atoms/Button",
  component: Button,
};

export const Default = () => <Button></Button>;

export const Icon = () => <IconButton></IconButton>;
export const Text = () => <TextButton></TextButton>;
