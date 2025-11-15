// readThemeColors(themeName) -> { primary, secondary, accent, neutral, base, text }
export function readThemeColors(themeName) {
  // create an offscreen probe element, apply the theme and read computed vars
  const probe = document.createElement("div");
  probe.setAttribute("data-theme", themeName);
  probe.style.cssText = "position:fixed;left:-9999px;top:-9999px;visibility:hidden;pointer-events:none;";
  document.body.appendChild(probe);

  const s = getComputedStyle(probe);

  const get = (v) => {
    const vval = s.getPropertyValue(v).trim();
    return vval || null;
  };

  const colors = {
    primary:   get("--color-primary")   || get("--p") || get("--primary") || null,
    secondary: get("--color-secondary") || get("--s") || get("--secondary") || null,
    accent:    get("--color-accent")    || get("--a") || get("--accent") || null,
    neutral:   get("--color-neutral")   || get("--n") || get("--neutral") || null,
    base:      get("--color-base-100")  || get("--b1") || get("--base-100") || null,
    text:      get("--color-base-content") || get("--bc") || get("--base-content") || null
  };

  document.body.removeChild(probe);
  return colors;
}
