/**
 * Site-wide content width: see `.maaleen-container` in globals.css
 */
export function Container({ as: Tag = "div", className = "", children, ...rest }) {
  const classes = ["maaleen-container", className].filter(Boolean).join(" ");
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
