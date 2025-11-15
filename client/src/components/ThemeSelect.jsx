import React, { useState, useEffect, useRef } from "react";
import useThemeStore from "../stores/store.theme";
import { readThemeColors } from "../utils/readThemeColors";

const THEME_NAMES = [ "light","dark","black","claude","corporate","ghibli","gourmet","luxury","mintlify","pastel","perplexity","shadcn","slack","soft","spotify","valorant","vscode" ];

export default function ThemeSelect() {
  const setTheme = useThemeStore(s => s.setTheme);
  const current = useThemeStore(s => s.theme);
  const [open, setOpen] = useState(false);
  const [previews, setPreviews] = useState({});
  const ref = useRef();

  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // build previews the first time dropdown opens
  useEffect(() => {
    if (!open || Object.keys(previews).length) return;
    const map = {};
    THEME_NAMES.forEach(name => {
      map[name] = readThemeColors(name);
    });
    setPreviews(map);
  }, [open, previews]);

  return (
    <div className="relative z-100" ref={ref}>
      <button className="btn btn-primary px-[8px] gap-x-1" onClick={() => setOpen(o => !o)}>
        Theme: {current}
        <span className={`ml-0 ${open ?"icon-[tabler--chevron-down]" : "icon-[tabler--chevron-left]"}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 z-50 w-[min(92vw,560px)] bg-base-100 border border-base-300 shadow-2xl rounded-2xl p-3 grid grid-cols-3 gap-3">
          {THEME_NAMES.map(name => {
            const c = previews[name] || {};
            return (
              <button
                key={name}
                onClick={() => { setTheme(name); document.documentElement.setAttribute('data-theme', name); setOpen(false); }}
                className={`rounded-xl p-3 hover:bg-base-200 transition flex flex-col items-center gap-2 ${name === current ? 'ring-2 ring-primary' : ''}`}
                title={name}
              >
                <div className="flex items-center gap-1">
                  <span className="h-5 w-5 rounded-md ring-1 ring-base-300" style={{ background: c.primary || "#eee" }} />
                  <span className="h-5 w-5 rounded-md ring-1 ring-base-300" style={{ background: c.secondary || "#eee" }} />
                  <span className="h-5 w-5 rounded-md ring-1 ring-base-300" style={{ background: c.accent || "#eee" }} />
                  <span className="h-5 w-5 rounded-md ring-1 ring-base-300" style={{ background: c.neutral || "#eee" }} />
                </div>
                <span className="text-xs font-medium mt-1 text-base-content">{name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
