const ExitIcon = ({ customStrokeWidth }: { customStrokeWidth?: string }) => {
  return (
    <svg
      style={{ width: "1em", height: "1em" }}
      viewBox="0 0 100 100"
      strokeWidth={customStrokeWidth ? customStrokeWidth : "0.3em"}
      strokeLinecap={"round"}
    >
      <line x1="10" x2="90" y1="10" y2="90" />
      <line x1="90" x2="10" y1="10" y2="90" />
    </svg>
  );
};
export default ExitIcon;
