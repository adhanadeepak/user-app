import React from 'react';
import PropTypes from 'prop-types';

import Profile from 'Assets/images/73.jpg';
import styled from "styled-components";

const RoundImage = styled(`img`)`
    border: 1px solid #efefef;
    border-radius: 50%;
    width: ${props => props.width || '32px'};
    //box-shadow: 0px 1px 10px 2px #aaaaaa;
`;

function Avatar(props) {
    return (
        <div className={props.className}>
            <RoundImage {...props} src={props.src} alt="profile" onClick={props.onClick}/>
        </div>
    );
}

Avatar.propTypes = {};
Avatar.defaultProps = {};

export default Avatar;
