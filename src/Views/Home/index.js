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
    height: 53vh;
    overflow: auto;
    
    @media screen and (max-width: 765px){
      height: 60vh;
    }
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
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
    & .load-more-btn{
      background-color: transparent;
      border: none;
      outline: none;
      font-size: 14px;
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
    const[loadMore, disableLoadMore] = useState(false);
    const[selectedUser, setSelectedUser] = useState({});

    const[showModal, hideModal] = useState(false);

    const getList = (page) => {
        fetch(`https://reqres.in/api/users?page=${page}`)
            .then((response)=>{
                return response.json();
            })
            .then((response)=>{
                if(response && Object.keys(response).length > 0){
                    setUsers((prevUsers)=> ([ ...prevUsers, ...response.data]));
                    setAd(response.ad);
                    setSearchList((prevUsers)=> ([ ...prevUsers, ...response.data]));
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
        else disableLoadMore(true);

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
                    {
                        !loadMore ?
                        <Pagination>
                            <button className={`load-more-btn`} onClick={()=> getUserList(`next`)}>Load more..</button>
                        </Pagination>
                        :
                        null
                    }
                </UserList>
            </div>
            <Modal show={showModal} hide={hideModal} user={selectedUser}/>
        </Container>
    );
}

export default Home;
