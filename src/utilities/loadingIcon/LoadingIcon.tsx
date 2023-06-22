const ViewPortWrapper = ({
  children,
  backgroundColor,
  height,
}: {
  children: JSX.Element;
  backgroundColor?: string;
  height?: string | number;
}) => {
  const styles = {
    backgroundColor: backgroundColor,
    height: height,
    top: 0,
    left: 0,
    zIndex: 10,
  };
  return (
    <div className="loading-icon-entire-viewport" style={styles}>
      {children}
    </div>
  );
};
const Icon = ({
  width,
  strokeWidth,
  strokeColor,
}: {
  width?: number | string;
  strokeWidth?: number | string;
  strokeColor?: string;
}) => {
  return (
    <div className={`loading-icon-container`} style={{ width: width }}>
      <svg className="loading-icon-circle" viewBox="25 25 50 50">
        <circle
          className="loading-icon-path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          strokeWidth={strokeWidth}
          stroke={strokeColor}
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};
export type LoadingIconProps = {
  width?: number | string;
  strokeWidth?: number | string;
  entireViewPort?: boolean;
  backgroundColor?: string;
  height?: string | number;
  strokeColor?: string;
};
const LoadingIcon = ({
  width = 100,
  height,
  strokeWidth = 3,
  strokeColor,
  entireViewPort = false,
  backgroundColor,
}: LoadingIconProps): JSX.Element => {
  return (
    <>
      {entireViewPort ? (
        <ViewPortWrapper backgroundColor={backgroundColor} height={height}>
          <Icon
            width={width}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
          />
        </ViewPortWrapper>
      ) : (
        <Icon
          width={width}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
        />
      )}
    </>
  );
};
export const LoadingIconFillContainer = ({
  background = "#F3F3F3",
  loadingIconProps = {},
}: {
  background?: string;
  loadingIconProps?: LoadingIconProps;
}) => (
  <div
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 3,
      background: background,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <LoadingIcon {...loadingIconProps} />
  </div>
);
export default LoadingIcon;
