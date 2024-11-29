import { Eye, EyeOff } from "lucide-react";

interface ShowPasswordIcon {
  showPasswordState: boolean;
}

const iconStyles = {
  width: "20px",
  height: "20px",
  color: "#FFF",
};

export function ShowPasswordIcon({ showPasswordState }: ShowPasswordIcon) {
  if (showPasswordState) {
    return <EyeOff style={iconStyles} />;
  } else {
    return <Eye style={iconStyles} />;
  }
}
