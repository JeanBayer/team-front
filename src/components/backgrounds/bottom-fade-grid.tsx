export const BottomFadeGrid = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
        backgroundSize: "20px 30px",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
      }}
    />
  );
};
