

import React from "react";

type Status = "Active" | "Inactive";

const Badge: React.FC<{ status: Status }> = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
      status === "Active"
        ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
        : "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200"
    }`}
  >
    <span
      className={`mr-1 h-2 w-2 rounded-full ${
        status === "Active" ? "bg-emerald-500" : "bg-rose-500"
      }`}
    />
    {status}
  </span>
);

export default Badge;

// const Badge: React.FC<{ status: Status }> = ({ status }) => (
//   <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
//       status === "Active"
//         ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200"
//         : "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200"
//     }`}>
//     <span className={`mr-1 h-2 w-2 rounded-full ${status === "Active" ? "bg-emerald-500" : "bg-rose-500"}`} />
//     {status}
//   </span>
// );
// export default Badge;