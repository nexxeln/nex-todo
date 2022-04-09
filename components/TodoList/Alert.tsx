import { Alert as Al } from "@mantine/core";
import { FiAlertCircle } from "react-icons/fi";

interface AlertProps {
  text: string;
}

const Alert = ({ text }: AlertProps) => {
  return (
    <Al
      icon={<FiAlertCircle size={16} />}
      title="Error!"
      color="red"
      variant="outline"
    >
      {text}
    </Al>
  );
};

export default Alert;
