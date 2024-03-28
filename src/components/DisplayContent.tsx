"use client";

interface DisplayContentProps {
  children: React.ReactNode;
}

const DisplayContent = ({ children }: DisplayContentProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-3/4 px-6">{children}</div>
    </div>
  );
};

export default DisplayContent;
