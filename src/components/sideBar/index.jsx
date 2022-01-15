import React, { useState } from "react";
import styled from "styled-components";
// import profilePic from "../assets/profilePic.png";
import { getAuth, signOut } from "firebase/auth";

const Sidebar = ({ user, setUser }) => {
  const [activeIcon, setActiveIcon] = useState("inbox");
  const auth = getAuth();

  return (
    <Wrapper>
      <LogoContainer>
        <i className="far fa-comments"></i>
      </LogoContainer>
      <SidebarIcons>
        <SidebarIcon onClick={() => setActiveIcon("inbox")}>
          <i
            className="fas fa-inbox"
            style={{ color: activeIcon == "inbox" && "#1d90f4" }}
          />
        </SidebarIcon>
        <SidebarIcon onClick={() => setActiveIcon("cog")}>
          <i
            className="fas fa-cog"
            style={{ color: activeIcon == "cog" && "#1d90f4" }}
          />
        </SidebarIcon>
        <SidebarIcon onClick={() => setActiveIcon("user")}>
          <i
            className="fas fa-user-circle"
            style={{ color: activeIcon == "user" && "#1d90f4" }}
          />
        </SidebarIcon>
        <SidebarIcon onClick={() => setActiveIcon("bolt")}>
          <i
            className="fas fa-bolt"
            style={{ color: activeIcon == "bolt" && "#1d90f4" }}
          />
        </SidebarIcon>
      </SidebarIcons>
      <ProfileIcon onClick={() => signOut(auth)}>
        <img src={user.avatar} alt="user image" />
      </ProfileIcon>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  height: calc(100vh-100px);
  padding: 50px 0;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  height: 70px;
  object-fit: contain;
  & > i {
    height: 100%;
  }
`;

const SidebarIcons = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SidebarIcon = styled.div`
  & > i {
    color: #767789;
    font-size: 28px;
    padding: 28px;
    border-radius: 50%;

    &:hover {
      color: #184773;
      cursor: pointer;
    }
  }
`;
const ProfileIcon = styled.div`
  height: 70px;
  object-fit: contain;
  display: flex;

  & > img {
    height: 80%;
    border-radius: 50%;
    object-fit: contain;

    &:hover {
      -webkit-box-shadow: 0px 5px 24px -3 #000;
      box-shadow: 0px 5px 24px -3 #000;
    }
  }
  & :hover {
    cursor: pointer;
    transform: scale(1.01);
  }
`;
