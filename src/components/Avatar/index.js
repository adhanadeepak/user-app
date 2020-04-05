import React from 'react';
import styled from "styled-components";

const RoundImage = styled(`img`)`
    border: 1px solid #efefef;
    border-radius: 50%;
    width: ${props => props.width || '32px'};
`;

function Avatar(props) {
    return (
        <div className={props.className}>
            <RoundImage {...props} src={props.src} alt="profile" onClick={props.onClick}/>
        </div>
    );
}

export default Avatar;
