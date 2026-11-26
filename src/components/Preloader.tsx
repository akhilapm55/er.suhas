
import { useEffect, useState } from "react";
import "./Preloader.css";

export default function Preloader() {
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);


useEffect(() => {
  document.body.style.overflow = "hidden";

  const exitTimer = window.setTimeout(() => {
    setExiting(true);
  }, 2300);

  const removeTimer = window.setTimeout(() => {
    setVisible(false);
  }, 3000);

  return () => {
    window.clearTimeout(exitTimer);
    window.clearTimeout(removeTimer);
    document.body.style.overflow = "";
  };
}, []);


  if (!visible) return null;

  const name = "SUHAS KRISHNAN";

  return (
    <div className={`preloader ${exiting ? "preloader-exit" : ""}`}>
      <div className="preloader-content">
        <div className="preloader-label">
          Managing Partner & EV Infra Projects Engineer
        </div>

        <h1 className="preloader-name">
          {name.split("").map((letter, index) => (
            <span
              key={index}
              className={letter === " " ? "letter-space" : ""}
              style={{ animationDelay: `${index * 0.075}s` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>

        <div className="preloader-line">
          <div className="preloader-progress" />
        </div>

        <div className="preloader-bottom">
          <span>PLAN · DESIGN · ENGINEER</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  );
}
