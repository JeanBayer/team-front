export const PurpleGlowTop = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background: "#ffffff",
        backgroundImage: `
      radial-gradient(
        circle at top center,
        rgba(173, 109, 244, 0.5),
        transparent 70%
        )
        `,
        filter: "blur(80px)",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};
