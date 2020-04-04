import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Avatar from "components/Avatar/index";
import Icon from 'components/Icon/index';
import Modal from 'components/Modal/index';

const Container = styled(`div`)`
  padding: 16px;
  height: 100vh;
  width: 100%;
  display: flex;
  background-color: #f3c623;
`;

const UserList = styled(`div`)`
  width: 310px;
  padding: 16px;
  background: #d4ebd0;
  border: 1px solid #efefef;
  box-shadow: 0 0 8px 0 #efefef;
  
  & .list{
    list-style: none;
    padding: 0;
  }
  & li:last-child{
    border-bottom: none !important;
  }
  
  & .list > .list-item{
    display: flex;
    margin : 16px 0;
    border-bottom: 1px solid #927a22;
      .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        margin-left: 42px;
        
        .name{
          width: 100%;
          margin: 0;  
          text-transform: capitalize; 
          text-align: left;     
        }
        .email{
          width: 100%;
          margin: 0;
          text-transform: lowercase;
          color: #6a6a6a;
          font-weight: 400;
          text-align: left;
        }      
      }
  }
`;

const Pagination = styled(`div`)`
  
  & .pagination-list{
    display: flex;
    list-style: none;
    padding: 0;
    justify-content: space-around;
    
    .current{
      padding: 4px 8px;
    }
    
    .page-item{
    cursor:pointer;
    }
    
    .button{
      padding: 4px 8px;
      border: 1px solid #323232;
      border-radius: 4px;
      cursor:pointer;
      
      &:hover{
        background-color: #d4ebd0;
        color: #333333;
        transition: background-color ease-in-out 300ms;
      }
    }
  }
`;

const SearchContainer = styled(`div`)`
  background-color: #333333;
  border: 1px solid #f3c623;
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: 100%;
  
  &:focus, &:hover{
    box-shadow: 0 0 4px 2px #f3c623;
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

function Home(props) {

    const[users, setUsers] = useState([]);
    const[searchList, setSearchList] = useState([]);
    const[ad,setAd] = useState({});
    const[page, setPage] = useState(1);
    const[totalPage, setLastPage] = useState(0);
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
                    setAd(response.ad);
                    setSearchList(response.data);
                    setPage(response.page);
                    setLastPage(response.total_pages);
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
        search = (e.target.value).toLowerCase();
        let usersList = [...searchList];
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
                <h4>Users</h4>
                <UserList >
                    <SearchContainer>
                        <Icon type={`search`}/>
                        <SearchBar placeholder={`Search user`} onChange={searchUser} />
                    </SearchContainer>
                    <ul className={`list`}>
                        { users && users.map((user, index)=> (
                            <li className={`list-item`} key={index+user.id-1}>
                                <Avatar  src={user.avatar} width={`54px`} onClick={()=>{
                                    hideModal(true);
                                    setSelectedUser(user);
                                }
                                } className={`image`}/>
                                <div className={`content`}>
                                    <h5 className={`name`}>{user.first_name} {user.last_name}</h5>
                                    <h6 className={`email`}>{user.email}</h6>
                                </div>
                            </li>
                        ))}
                    </ul>
                </UserList>
                <Pagination>
                    <ul className={`pagination-list`}>
                        <li className={`page-item`} onClick={()=> getUserList('previous')}>
                            <Icon type={`back`} />
                        </li>
                        <li className={`page-item button`} onClick={()=> getUserList('first')}>
                            First
                        </li>
                        <li className={`page-item current`}>
                            {page}
                        </li>
                        <li className={`page-item button`} onClick={()=> getUserList('last')}>
                            Last
                        </li>
                        <li className={`page-item`} onClick={()=> getUserList('next')}>
                            <Icon type={`forward`}/>
                        </li>
                    </ul>
                </Pagination>
            </div>
            <Modal show={showModal} hide={hideModal} user={selectedUser}/>
        </Container>
    );
}

export default Home;
