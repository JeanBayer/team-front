type VisibleProps = {
  when?: boolean;
  children: React.ReactNode;
};

export const Visible = ({ when = true, children }: VisibleProps) => {
  if (when) return children;
  return null;
};
