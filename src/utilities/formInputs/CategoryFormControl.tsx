import { FormControl } from "@mui/material";
export const CategoryFormControl = ({
  children,
  heading,
  noFormControl,
}: {
  children: JSX.Element | JSX.Element[] | string;
  heading: string;
  noFormControl?: boolean;
}) => {
  const categoryBoxesStyles: React.CSSProperties = {
    marginBottom: "1em",
    padding: "7% 10%",
    boxSizing: "border-box",
    border: "1.5px solid lightgray",
    borderRadius: "0.3em",
  };
  const childrenEls = (
    <>
      <h3
        style={{
          width: "100%",
          marginTop: 0,
          fontFamily: `"Roboto","Helvetica","Arial","sans-serif"`,
        }}
      >
        {heading}
      </h3>
      {children}
    </>
  );
  return noFormControl ? (
    <div style={{ ...categoryBoxesStyles, width: "100%" }}>{childrenEls}</div>
  ) : (
    <FormControl fullWidth style={categoryBoxesStyles}>
      {childrenEls}
    </FormControl>
  );
};
