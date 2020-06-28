import React from "react";
import { FriendZContext } from "../../context/context";

export default function ControlSidebar() {
  const { controlSidebar } = React.useContext(FriendZContext);
  return (
    <aside
      className={
        controlSidebar
          ? "control-sidebar control-sidebar-dark right-0"
          : "control-sidebar control-sidebar-dark d-none"
      }
    >
      <div className="p-3">
        <h5>Title</h5>
        <p>Sidebar content</p>
      </div>
    </aside>
  );
}
