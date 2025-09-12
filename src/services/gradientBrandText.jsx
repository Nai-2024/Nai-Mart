

// --- Gradient Brand Text (component) ---
// A React functional component to display text with a gradient color effect
export function GradientBrandText({ text = "Nai Mart", className = "", ...props }) {
  return (
    <span
      // Combine default font-bold class with any additional classes passed via props
      className={`font-bold ${className}`}
      
      // Inline style for gradient text
      style={{
        background: "linear-gradient(135deg, #ED4930, #F7A823)", // Gradient from orange-red to yellow-orange
        WebkitBackgroundClip: "text",  // Ensures the background gradient only applies to text (Chrome, Safari)
        WebkitTextFillColor: "transparent", // Makes the text itself transparent so the gradient shows through
      }}
      
      // Spread any additional props (like onClick, id, etc.) to the span
      {...props}
    >
      {text} {/* Display the text content passed as a prop (default "Nai Mart") */}
    </span>
  );
}