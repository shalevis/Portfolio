import React, { useEffect, useState } from "react";

export default function Hero() {
  const lines = [
    "I'm Shalev Issachar",
    "DevOps & Infra Engineer",
    "Kubernetes • CI/CD • VMware • Automation",
  ];

  const [displayed, setDisplayed] = useState(["", "", ""]);
  const [line, setLine] = useState(0);
  const [char, setChar] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayed(prev => {
        const updated = [...prev];
        updated[line] = lines[line].slice(0, char + 1);
        return updated;
      });

      setChar(char + 1);

      // line finished → move to the next line
      if (char + 1 > lines[line].length) {
        if (line < lines.length - 1) {
          setTimeout(() => {
            setLine(line + 1);
            setChar(0);
          }, 400);
        }
        clearInterval(interval);
      }
    }, 45); // typing speed

    return () => clearInterval(interval);
  }, [char, line]);

  return (
    <section>
      <div className="terminal-hero">
        <div>┌───────────────────────────────────────────────┐</div>
        <div>│ ~/portfolio ➜ <span class='accent'>hello</span>                  │</div>
        <div>│                                               │</div>
        <div>{`│  ${displayed[0]}${line === 0 ? "█" : ""}`.padEnd(47) + "│"}</div>
        <div>{`│  ${displayed[1]}${line === 1 ? "█" : ""}`.padEnd(47) + "│"}</div>
        <div>{`│  ${displayed[2]}${line === 2 ? "█" : ""}`.padEnd(47) + "│"}</div>
        <div>└───────────────────────────────────────────────┘</div>
      </div>
    </section>
  );
}
