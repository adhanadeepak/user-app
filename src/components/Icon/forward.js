import React from 'react';
import PropTypes from 'prop-types';

import ForwardIcon from 'Assets/images/next.png';

function Icon(props) {

    return (
        <>
            <img src={ForwardIcon} alt="icon"/>
        </>

    )
}

Icon.propTypes = {
    fontSize: PropTypes.number,
    fill: PropTypes.string,
    color: PropTypes.string,
};

Icon.defaultProps = {
    fontSize: 10,
    fill: 'none',
};

export default Icon;