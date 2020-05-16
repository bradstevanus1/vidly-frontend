import React from "react";
import PropTypes from "prop-types";

function ListGroup({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onGroupSelect,
}) {
  return (
    <div className="list-group">
      {items.map((item) => {
        let className = "list-group-item list-group-item-action";
        if (item === selectedItem) className += " active";
        return (
          <button
            key={item[valueProperty]}
            type="button"
            className={className}
            onClick={() => onGroupSelect(item)}
          >
            {item[textProperty]}
          </button>
        );
      })}
    </div>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

ListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  textProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired,
  selectedItem: PropTypes.object.isRequired,
  onGroupSelect: PropTypes.func.isRequired,
};

export default ListGroup;
