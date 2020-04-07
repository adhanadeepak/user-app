import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Avatar from "components/Avatar/index";
import Icon from 'components/Icon/index';
import Modal from 'components/Modal/index';

import BackIcon from 'Assets/images/back.png';
import ForwardIcon from 'Assets/images/next.png';

const Container = styled(`div`)`
  padding: 16px;
  height: 100vh;
  width: 100%;
  background-color: #fff;
  
  .w-full{
    width: 100%;
  }
  
  @media screen and (max-width: 765px){
    button:focus, li:focus{
      outline: none;
    }
    button:active, li:active{
      outline: none;
    }
  }
`;

const UserTable = styled(`div`)`
  margin: 32px 0;
  table{
  border: 1px solid #efefef;
  border-collapse: collapse;
    width: 100%;
      thead{
          tr{
            border-bottom: 1px solid #efefef;
          }
          tr > th{
            padding: 8px;
            text-align: left;
          }
          
          @media screen and (max-width: 765px){
            display: none;
            
          }
      }
      
      tbody{
          tr {
            border-bottom: 1px solid #efefef;
            td{
              padding: 8px;
            }
            td.name-cell{
              display: flex;
              align-items: center;
              
              .content{
                display: flex;
                align-items: center;
                
                .email{
                  display: none;
                }
              }
              .content > .name{
                margin: 0;
                padding: 0 16px;
              }
            }
            
            td.email-cell{
              .email{
                
              }
            }
            
            @media screen and (max-width: 765px){
              display: flex;
              td.name-cell{
                width: 100%;
                .content{
                   flex-direction: column;
                   text-align: left; 
                   align-items: flex-start;
                   margin-left: 24px;
                   
                   .name{
                    padding: 0;
                   }
                  .email{
                    display: inline-block;
                    margin: 0;
                    font-size: 12px;
                  }
                }
              }
              
              td.email-cell{
               display: none;
            }
              
              td.number-cell{
                display: none;
              }
              
            }
          }
      }
  }
  
  @media screen and (max-width: 765px){
    margin: 16px 0 0 0;
  }
 
`;

const Pagination = styled(`div`)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
    & .load-more-btn{
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 14px;
    } 
    
    && button.active{
      border-radius: 50%;
      background-color: #f3c623;
    }
    
    .page{
      cursor:pointer;
      padding: 8px 16px;
    }
    
    .page:hover{
      background-color: #f3c623;
      opacity: 0.6;      
      border-radius: 50%;
      
    }
    
    .list{
        padding: 0;
        display: flex;
        list-style: none;
        align-items: center;
          
        li{
          margin: 0 4px;
          display: flex;
          align-items: center;
        }  
        .forward , .back{
          width: 32px;
          cursor: pointer;
        }
        
        .number{
        font-size: 18px;
        }
    }
    
    .clear{
      border: none;
      outline: none;
      background-color: transparent;
      
      @media screen and (max-width: 765px){
        border: unset;
        outline: unset;
      }
     
    }   
`;

const SearchContainer = styled(`div`)`
  background-color: #333333;
  border: 1px solid #f3c623;
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: 260px;
  
  &:focus, &:hover{
    box-shadow: 0 0 4px 2px #f3c623;
  }
  
  @media screen and (max-width: 765px){
    width: 100%;
  }
`;

const SearchBar = styled(`input`)`
  width: 100%;
  outline: none;
  border: none;
  color: #f3c623;
  padding: 8px 16px;
  height: 34px;
  font-size: 14px;
  font-weight: 500;
  background-color: #333333;
`;

function Home() {

    const[users, setUsers] = useState([]);
    const[searchList, setSearchList] = useState([]);
    const[page, setPage] = useState(1);
    const[totalPage, setTotalPage] = useState(0);
    const[selectedUser, setSelectedUser] = useState({});

    const[showModal, hideModal] = useState(false);

    const getList = (page) => {
        fetch(`https://reqres.in/api/users?page=${page}`)
            .then((response)=>{
                return response.json();
            })
            .then((response)=>{
                if(response && Object.keys(response).length > 0){
                    setUsers(response.data);
                    setSearchList(response.data);
                    setPage(response.page);
                    setTotalPage(response.total_pages);
                }
                else{
                    return false;
                }
            })
            .catch((e)=>{
                console.error(e)
            })
    };

    const getUserList = (type) => {
        let currentPage = page;
        if(type === 'next'){
            currentPage++;
        }
        else if(type === 'previous'){
            currentPage--;
        }
        else if(type === 'first'){
            currentPage = 0;
        }
        else if(type === 'last'){
            currentPage = totalPage;
        }
        if(currentPage <= totalPage && currentPage > 0 ) getList(currentPage);

    };

    useEffect(()=>{
        getList(1);
    }, []);

    let search = '';

    const searchUser = (e) => {
        e.preventDefault();
        let usersList = [...searchList];
        search = (e.target.value).toLowerCase();

        if(search !== '' && search.length > 0){
            let tempList = usersList.filter(user => {
                if(user.first_name.toLowerCase().includes(search) || user.last_name.toLowerCase().includes(search)){
                    return user;
                }
            });
            setUsers(tempList);
        }
        else if(search === ''){
            setUsers(searchList);
        }
    };


    return (
        <Container className={``}>
            <div style={{margin: '0 auto'}}>
                <SearchContainer>
                    <Icon type={`search`}/>
                    <SearchBar placeholder={`Search user`} onChange={searchUser} />
                </SearchContainer>
               <UserTable>
                   <table className={`table`}>
                       <thead>
                       <tr>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Phone</th>
                       </tr>
                       </thead>
                        <tbody>
                        {
                            users && users.map((user,index) => (
                                <tr>
                                    <td className={`name-cell`}>
                                        <Avatar  src={user.avatar} width={`54px`} onClick={()=>{
                                            hideModal(true);
                                            setSelectedUser(user);
                                        }
                                        } className={`image`}/>
                                        <div className={`content`}>
                                            <h5 className={`name`}>{user.first_name} {user.last_name}</h5>
                                            <h5 className={`email`}>{user.email}</h5>
                                        </div>
                                    </td>
                                    <td className={`email-cell`}>
                                        <h5 className={`email`}>{user.email}</h5>
                                    </td>
                                    <td className={`number-cell`}>{`+91 9876543210`}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                   </table>
               </UserTable>
                <Pagination>
                    <ul className={`list`}>
                        <li>
                            <button className={`back clear`} onClick={()=> getUserList('previous')}>
                                <img
                                    className={`w-full`}
                                    src={BackIcon}
                                    alt=""/>
                            </button>
                        </li>
                        <li>
                            <button className={`clear number ${page === 1 ? 'active' : ''} page`} onClick={()=> getList(1)}>1</button>
                        </li>
                        <li>
                            <button className={`clear number ${page === 2 ? 'active' : ''} page`} onClick={()=> getList(2)}>2</button>
                        </li>
                        <li>
                            <button className={`forward clear`} onClick={()=> getUserList('next')}>
                                <img
                                    className={`w-full`}
                                    src={ForwardIcon}
                                    alt=""/>
                            </button>
                        </li>
                    </ul>
                </Pagination>
            </div>
            <Modal show={showModal} hide={hideModal} user={selectedUser}/>
        </Container>
    );
}

export default Home;
