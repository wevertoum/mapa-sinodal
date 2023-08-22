import { ReactNode } from "react";

interface PrivateLayoutProps {
  children: ReactNode;
}
export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <div>
      <h1>Private lauyout</h1>
      {children}
    </div>
  );
}
