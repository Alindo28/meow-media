import React, { useState, useEffect } from "react";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary/30 text-white/80 rounded-full shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:bg-primary-700"
          aria-label="Back to top"
        >
          <span className="icon-[icons8--up-round] text-[40px]"></span>
        </button>
      )}
    </>
  );
};

export default BackToTop;
