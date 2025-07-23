import React from "react";
import { Box, Typography } from "@material-ui/core";

interface AvatarProps {
  fullName: string;
  style?: React.CSSProperties;
  fontSize: number;
  containerBackgroundColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  fullName,
  style,
  containerBackgroundColor,
}) => {
  return (
    <Box
      style={{ backgroundColor: containerBackgroundColor }}
      sx={webStyle.container}>
      <Box sx={{ ...style, ...webStyle.textContainer }}>
        <Typography style={webStyle.text}>
          {fullName && fullName.charAt(0).toUpperCase()}
        </Typography>
      </Box>
    </Box>
  );
};

export default Avatar;

const webStyle = {
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  text: {
    fontSize: 15,
    color: '#FFFFFF',
  },
};
