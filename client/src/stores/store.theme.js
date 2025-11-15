import { create } from "zustand";

let useThemeStore = create((set) => ({
    theme: localStorage.getItem("app-theme") || "light",
    setTheme: (theme) => {
        localStorage.setItem("app-theme",theme)
        document.documentElement.setAttribute("data-theme",theme)
        set({theme})
    }
}))

export default useThemeStore;