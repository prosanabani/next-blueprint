"use client";

import { Icon as Iconify } from "@iconify-icon/react";
import { type ComponentProps, memo } from "react";

type IconProps = ComponentProps<typeof Iconify>;

const Icon = ({ ...props }: IconProps) => {
  return <Iconify {...props} />;
};

export default memo(Icon);
