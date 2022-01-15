import React from "react";
import styled from "styled-components";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

const ChatList = ({
  conversationData,
  currentConversation,
  setCurrentConversation,
}) => {
  const addNewChat = async () => {
    await addDoc(collection(db, "messages"), {
      name: "New Chat",
      avatar: `https://avatars.dicebear.com/api/miniavs/${Math.random()}.svg`,
      lastMessage: "",
      lastUpdated: serverTimestamp(),
    });
  };

  return (
    <Wrapper>
      <Title>Chats</Title>
      <Subtitle>Latest Coversation</Subtitle>
      <Conversation>
        {conversationData.map((conversation, index) => (
          <ConversationDataCard
            key={index}
            style={{
              backgroundColor:
                currentConversation.id === conversation.id
                  ? "#1d90f4"
                  : "#282a37",
            }}
            onClick={() => setCurrentConversation(conversation)}
          >
            <Avatar>
              <img src={conversation.avatar} alt={conversation.name} />
            </Avatar>
            <ConversationDataInfo>
              <Name>{conversation.name}</Name>
              <LastMessage>{conversation.lastMessage}</LastMessage>
            </ConversationDataInfo>
          </ConversationDataCard>
        ))}
        <AddNewConversation onClick={addNewChat}>
          <Avatar>
            <i className="fas fa-plus" />
          </Avatar>
          <ConversationInfo>
            <Name>New Chat</Name>
          </ConversationInfo>
        </AddNewConversation>
      </Conversation>
    </Wrapper>
  );
};

export default ChatList;

const Wrapper = styled.div`
  width: 300px;
  height: calc(100vh - 100px);
  padding: 50px 32px;
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 40px;
`;

const Subtitle = styled.div`
  color: #767789;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 40px;
`;
const Conversation = styled.div``;
const ConversationDataCard = styled.div`
  display: flex;
  margin: 12px -12px;
  padding: 12px;
  border-radius: 12px;

  &:hover {
    background-color: #184773 !important;
  }
`;

const Avatar = styled.div`
  width: 60px;
  margin-right: 12px;
  display: grid;
  place-items: center;
  & > img {
    width: 80%;
    object-fit: contain;
    border-radius: 50%;
  }
`;
const ConversationDataInfo = styled.div``;
const Name = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const LastMessage = styled.div`
  font-weight: 500;
`;

const AddNewConversation = styled.div`
  display: flex;
  margin: 12px -12px;
  padding: 12px;
  border-radius: 12px;
  & div,
  i {
    color: #757688;
  }
  &:hover {
    background-color: #184773 !important;
    cursor: pointer;
    & div i {
      color: #eee;
    }
  }
`;

const ConversationInfo = styled.div``;
