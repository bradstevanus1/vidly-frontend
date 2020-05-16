import React from 'react';
import PropTypes from 'prop-types';

function Select({ name, label, options, error, ...rest }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

const optionShape = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape(optionShape)).isRequired,
  error: PropTypes.string,
};

Select.defaultProps = {
  error: '',
};

export default Select;
