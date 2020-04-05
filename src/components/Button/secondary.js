import React from 'react';
import styled from "styled-components";


const Button = styled(`button`)`
    padding: 8px 16px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
    outline: none;
    border: none;
    border-radius: 4px;
    background-color: #FEB23E;
`;

function Secondary({children,...other}) {
    return (
        <div>
            <Button>
                {children}
            </Button>
        </div>
    );
}

export default Secondary;
