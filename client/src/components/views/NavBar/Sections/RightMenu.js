/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import './Navbar.css';

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login" style={{'color': 'rgb(37, 141, 252)'}}>Sign In</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register" style={{'color': 'rgb(37, 141, 252)'}}>Sign Up</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="Upload">
          <a href="/video/upload" style={{'color': 'rgb(37, 141, 252)'}}>Upload</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler} style={{'color': 'rgb(37, 141, 252)'}}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

