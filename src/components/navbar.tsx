import React from "react";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between border-b p-4">
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}
