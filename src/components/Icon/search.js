import React from 'react';
import PropTypes from 'prop-types';

import SearchIcon from 'Assets/images/search.png';
import styled from "styled-components";


const Search = styled(`img`)`
    width: 24px;
    height: 24px;
    padding: 4px;
    margin: 0 4px;
`;

function Icon(props) {

    return (
        <>
            <Search src={SearchIcon} alt="icon"/>
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