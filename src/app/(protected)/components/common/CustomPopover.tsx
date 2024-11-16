type CustomPopoverProps = {
  isVisible: boolean;
  x: number;
  y: number;
  children: React.ReactNode;
};

const CustomPopover = ({ isVisible, x, y, children }: CustomPopoverProps) => {
  if (!isVisible) return null;

  // Get viewport dimensions
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // Popover dimensions (approximate)
  const POPOVER_HEIGHT = 100; // max-h-96 is 24rem = ~384px, using 200 as safe value
  const POPOVER_WIDTH = 320; // w-80 is 20rem = 320px
  const OFFSET = -100;

  // Calculate if popover would overflow
  const wouldOverflowBottom = y + POPOVER_HEIGHT + OFFSET > viewportHeight;
  const wouldOverflowRight = x + POPOVER_WIDTH / 2 > viewportWidth;
  const wouldOverflowLeft = x - POPOVER_WIDTH / 2 < 0;

  // Adjust position based on overflow
  const top = wouldOverflowBottom
    ? `${y - POPOVER_HEIGHT - OFFSET}px`
    : `${y + OFFSET}px`;

  const left = wouldOverflowRight
    ? `${viewportWidth - POPOVER_WIDTH - OFFSET}px`
    : wouldOverflowLeft
    ? `${OFFSET}px`
    : `${x}px`;

  const transform =
    !wouldOverflowRight && !wouldOverflowLeft ? "translateX(-50%)" : "none";

  return (
    <div
      className="fixed z-50 w-80 overflow-y-auto max-h-64 bg-popover rounded-md border shadow-md p-4"
      style={{
        left,
        top,
        transform,
      }}
    >
      {children}
    </div>
  );
};

export default CustomPopover;

