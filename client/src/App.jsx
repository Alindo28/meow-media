import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useAccountStore from "./stores/store.account";
import useThemeStore from "./stores/store.theme";
import ThemeSelect from "./components/ThemeSelect";
import LoadingLogo from "./components/LoadingLogo";


const App = () => {
  const { authUser, checkAuthStore, isCheckingAuth } = useAccountStore();
  const theme = useThemeStore((state) => state.theme);

  // Apply theme whenever it changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    checkAuthStore();
  }, [checkAuthStore]);

  if (!authUser && isCheckingAuth) {
    return (
      <LoadingLogo />
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-base-100/20">
      <div className="fixed left-0 right-0 top-0 z-100"><Navbar /></div>
      <div className="absolute top-20 right-5 z-50">
        <ThemeSelect />
      </div>

      <div className="flex-1 mt-[80px] z-10">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={authUser ? <HomePage /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/chats"
            element={authUser ? <ChatPage /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate replace to="/home" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate replace to="/home" />}
          />
        </Routes>
      </div>

      
      <Toaster position="top-center" />
    </div>
  );
};

export default App;
