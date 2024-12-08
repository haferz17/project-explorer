import React from "react";

export interface LayoutProps {
  children?: React.ReactNode;
}

export interface TopicProps {
  data: string[];
}

export interface WrapperProps {
  if?: boolean | undefined | "" | string;
  children: React.ReactNode;
}
