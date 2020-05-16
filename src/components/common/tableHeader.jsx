import React from "react";

function TableHeader({ columns, sortColumn, onSort }) {
  const raiseSort = function (path) {
    const sort = { ...sortColumn };
    if (sort.path === path) {
      sort.order = sort.order === "asc" ? "desc" : "asc";
    } else {
      sort.path = path;
      sort.order = "asc";
    }
    onSort(sort);
  };

  function renderSortIcon(column) {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  }

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            style={{ cursor: "pointer" }}
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
