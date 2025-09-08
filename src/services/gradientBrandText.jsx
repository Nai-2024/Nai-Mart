

// --- Gradient Brand Text (component) ---
export function GradientBrandText({ text = "Nai Mart", className = "", ...props }) {
  return (
    <span
      className={`font-bold ${className}`}
      style={{
        background: "linear-gradient(135deg, #ED4930, #F7A823)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      {...props}
    >
      {text}
    </span>
  );
}
