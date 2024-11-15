type CustomPopoverProps = {
  isVisible: boolean;
  x: number;
  y: number;
  children: React.ReactNode;
};

const CustomPopover = ({ isVisible, x, y, children }: CustomPopoverProps) => {
  console.log(isVisible);
  if (!isVisible) return null;

  return (
    <div
      className="fixed z-50 bg-popover rounded-md border shadow-md p-4"
      style={{
        left: `${x}px`,
        top: `${y + 20}px`, // Add 20px offset to avoid covering the selected text
        transform: "translateX(-50%)", // Center the popover horizontally
      }}
    >
      {children}
    </div>
  );
};

export default CustomPopover;

