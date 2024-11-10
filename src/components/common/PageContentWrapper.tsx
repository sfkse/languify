import React from "react";

const PageContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-10">{children}</div>;
};

export default PageContentWrapper;

