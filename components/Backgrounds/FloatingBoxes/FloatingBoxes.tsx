import React from "react";
import "./FloatingBoxes.css";
type Props = {};

const FloatingBoxes = (props: Props) => {
  return (
    <div className="relative">
      <div className="area absolute">
        <ul className="circles">
          <li className="dark:bg-slate-50 bg-slate-200" />
          <li className="dark:bg-slate-50 bg-slate-200" />
          <li className="dark:bg-slate-50 bg-slate-200" />
          <li className="dark:bg-slate-50 bg-slate-200" />
          <li className="dark:bg-slate-50 bg-slate-200" />
          <li className="dark:bg-slate-50 bg-slate-200" />
          <li className="dark:bg-slate-50 bg-slate-200" />
          <li className="dark:bg-slate-50 bg-slate-200" />
          <li className="dark:bg-slate-50 bg-slate-200" />
          <li className="dark:bg-slate-50 bg-slate-200" />
        </ul>
      </div>
    </div>
  );
};

export default FloatingBoxes;
