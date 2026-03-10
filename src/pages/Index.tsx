import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TITLE = "DENNÍ SPOTŘEBA OBECNÍ VODY NA JATEČNÍM ZÁVODĚ";

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
    <div className="flex min-h-screen items-center justify-center p-8 md:p-16">
      <div className="w-full max-w-[900px] flex flex-col items-center">
        <h1
          className="text-foreground text-center text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 700, minHeight: "2.5em" }}
        >
          {displayedText}
          {!typingDone && (
            <span className="inline-block w-[2px] h-[1em] bg-foreground ml-1 animate-pulse align-baseline" />
          )}
        </h1>

        <div className="w-full flex justify-center mt-4 mb-8">
          <motion.div
            className="h-[2px] bg-primary"
            initial={{ width: 0 }}
            animate={{ width: typingDone ? "100%" : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: lineExpanded ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <iframe
            width="100%"
            height="539"
            seamless
            frameBorder="0"
            scrolling="no"
            src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR3cHr88oVDKOfcwzF52WvshleGxh-sBYJpJQJz6eHnEq172WZSev7DwtFQ5vRnNcKUUi9RG_8MaAEd/pubchart?oid=1755788134&format=interactive"
            title="Denní spotřeba obecní vody na jatečním závodě"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
