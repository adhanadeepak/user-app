import React from 'react';
import styled from "styled-components";


const Button = styled(`button`)`
    padding: 8px 16px;
    color: #1b62b3;
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
    outline: none;
    border: 1px solid #1b62b3;
    border-radius: 4px;
}
`;

function Primary({children,...other}) {
    return (
        <div>
            <Button>
                {children}
            </Button>
        </div>
    );
}

export default Primary;
