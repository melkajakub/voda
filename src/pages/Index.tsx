import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TITLE = "DENNÍ SPOTŘEBA CIZÍ VODY NA JATEČNÍM ZÁVODĚ";

const Index = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [lineExpanded, setLineExpanded] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedText(TITLE.slice(0, i));
      if (i >= TITLE.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typingDone) {
      const timeout = setTimeout(() => setLineExpanded(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [typingDone]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-12">
      <div className="w-full max-w-[960px] flex flex-col items-center">
        <h1
          className="text-foreground text-center text-xl md:text-2xl lg:text-3xl tracking-tight uppercase"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700, minHeight: "2em" }}
        >
          {displayedText}
          {!typingDone && (
            <span className="inline-block w-[2px] h-[1em] bg-foreground ml-1 animate-pulse align-baseline" />
          )}
        </h1>

        <div className="w-full flex justify-center mt-3 mb-4">
          <motion.div
            className="h-[2px] bg-primary"
            initial={{ width: 0 }}
            animate={{ width: typingDone ? "100%" : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: lineExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="responsive-graf"
        >
          <img
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR3cHr88oVDKOfcwzF52WvshleGxh-sBYJpJQJz6eHnEq172WZSev7DwtFQ5vRnNcKUUi9RG_8MaAEd/pubchart?oid=1755788134&format=image"
            alt="Denní spotřeba obecní vody na jatečním závodě"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
