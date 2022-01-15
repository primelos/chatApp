import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatList from "../components/chatList";
import ChatView from "../components/chatView";
import SideBar from "../components/sideBar";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function Home({ user, setUser }) {
  const [conversationData, setConversationData] = useState([]);
  const [currentConversation, setCurrentConversation] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("lastUpdated", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const conversations = [];
      snapshot.docs.map((doc) => {
        conversations.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setConversationData(conversations);
    });
    return () => unsubscribe();
  }, []);
  console.log("conversat", conversationData);
  console.log("curr", currentConversation);

  return (
    <Wrapper>
      <SideBar user={user} />
      <ChatList
        conversationData={conversationData}
        currentConversation={currentConversation}
        setCurrentConversation={setCurrentConversation}
      />
      <Main>
        <ChatView currentConversation={currentConversation} user={user} />
      </Main>
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.div`
  background-color: #282a37;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  display: flex;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;
