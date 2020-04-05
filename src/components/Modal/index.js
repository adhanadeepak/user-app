import React from 'react';
import Avatar from "components/Avatar";
import styled from "styled-components";

const Container = styled(`div`)`
  width: 100vw;
  height: 100vh;
  background-color: rgb(255,255,255, 0.7);
  position:absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  display: ${props => props.show ? 'block' : 'none'};
`;

const Modal = styled(`div`)`
  width: 440px;
  position:relative;
  top: 25%;
  margin: auto;
  z-index: 3;
  padding: 16px;
  background: #fff;
  border: 1px solid #efefef;
  border-radius: 4px;
  box-shadow: 0 0 8px 4px #d4ebd0;
  
  @media screen and (max-width: 765px){
    width: 280px;
  }

  
  & .modal-header{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  
  & .modal-body{
      .form-group{
          padding: 16px 0;
          
          label{
            padding-bottom: 8px;
            font-size: 14px;
            color: #3f3f3fa3;
          }
          input{
            font-size: 16px;
            display: block;
            color: #333333;
            padding: 8px 0;
            border: none;
            outline: none;
            border-radius: 2px;
          }
        }
        
      .first-row{
        display: flex;
        justify-content: space-between;
        
        @media screen and (max-width: 765px){
          flex-direction: column;
        }
      }
  }
  
`;

function Index(props) {

    return (
        <Container onClick={()=>props.hide(false)} show={props.show}>
            <Modal id={`user-modal`} className={`modal`}>
                <div className={`modal-header`}>
                    <Avatar  src={props.user.avatar} width={`38px`} className={`image`}/>
                </div>
                <div className={`modal-body`}>
                    <div className={`first-row`}>
                        <div className={`form-group`}>
                            <label htmlFor="first-name">First Name</label>
                            <input type="text" id={`first-name`} readOnly value={props.user.first_name}/>
                        </div>
                        <div className={`form-group`}>
                            <label htmlFor="last-name">Last Name</label>
                            <input type="text" id={`last-name`} readOnly value={props.user.last_name}/>
                        </div>
                    </div>
                    <div className={`second-row`}>
                        <div className={`form-group`}>
                            <label htmlFor="email">Email</label>
                            <input type="text" id={`email`} readOnly value={props.user.email}/>
                        </div>
                    </div>
                </div>
            </Modal>
        </Container>
    );
}

export default Index;
