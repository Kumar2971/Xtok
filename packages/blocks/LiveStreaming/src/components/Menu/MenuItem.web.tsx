import * as React from "react";
import { Box, Button, Typography } from "@material-ui/core";

interface IProps {
  icon?: React.ReactChild;
  text: string;
  subText?: string;
  className: string;
  onClick: (value: string) => void;
}

export const CustomMenuItem: React.FC<IProps> = ({
  icon,
  text,
  subText,
  className,
  onClick,
}) => {
  return (
    <Button
      data-test-id="menu-item"
      onClick={() => onClick(text)}
      className={`${className}-menu-button`}>
      <Box className={`${className}-menu-item`} sx={webStyle.endCallMenuItem}>
        {icon}
        <Box sx={webStyle.endCallMenuItemTexts}>
          <Typography className={`${className}-menu-text`}>{text}</Typography>
          {subText && (
            <Typography className={`${className}-menu-subText`}>
              {subText}
            </Typography>
          )}
        </Box>
      </Box>
    </Button>
  );
};

const webStyle = {
  endCallMenuItem: {
    display: "flex",
    alignItems: "center",
    padding: "10 20",
  },
  endCallMenuItemTexts: {
    display: "flex",
    flexDirection: "column",
  },
};
