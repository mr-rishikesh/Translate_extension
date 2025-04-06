let currentTooltip = null;

document.addEventListener("mouseup", async (event) => {
  const selection = window.getSelection().toString().trim();

  // If no text selected, do nothing
  if (!selection) return;

  const lang = "hi"; // Translate to Hindi
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(selection)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const translated = data[0][0][0];

    showTooltip(translated, event);
  } catch (err) {
    console.error("Translation error:", err);
  }
});

function showTooltip(text, event) {
  // Remove old tooltip if any
  if (currentTooltip) currentTooltip.remove();

  const tooltip = document.createElement("div");
  tooltip.innerText = text;
  tooltip.className = "translator-tooltip";

  Object.assign(tooltip.style, {
    position: "absolute",
    top: `${event.pageY + 10}px`,
    left: `${event.pageX + 10}px`,
    backgroundColor: "#333",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "6px",
    fontSize: "14px",
    zIndex: 9999,
    maxWidth: "300px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
    userSelect: "none",
    cursor: "default"
  });

  // Hide the tooltip when mouse leaves it
  tooltip.addEventListener("mouseleave", () => {
    tooltip.remove();
    currentTooltip = null;
  });

  document.body.appendChild(tooltip);
  currentTooltip = tooltip;
}
