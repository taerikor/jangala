import React, { useEffect, useRef } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Sections/Message";
import { List, Avatar } from "antd";
import { RobotOutlined, SmileOutlined } from "@ant-design/icons";
import Card from "./Sections/Card";
import { saveMessage } from "../../../_actions/chatbot";
import styled from "styled-components";

const ChatbotWrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Chatbot({ onClickOutside }) {
  const dispatch = useDispatch();
  const getMessage = useSelector((state) => state.chatbot.messages);

  let ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  useEffect(() => {
    eventQuery("hello");
  }, []);

  const textQuery = async (text) => {
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
    };
    dispatch(saveMessage(conversation));
    const textQueryVariable = {
      text,
    };

    try {
      const response = await Axios.post(
        "/api/dialogFlow/textQuery",
        textQueryVariable
      );
      for (let content of response.data.fulfillmentMessages) {
        conversation = {
          who: "bot",
          content: content,
        };
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: " Error just occured, please check the problem",
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };
  const eventQuery = async (event) => {
    const eventQueryVariable = {
      event,
    };

    try {
      const response = await Axios.post(
        "/api/dialogFlow/eventQuery",
        eventQueryVariable
      );
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content: content,
        };
        dispatch(saveMessage(conversation));
      }
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: " Error just occured, please check the problem",
          },
        },
      };
      dispatch(saveMessage(conversation));
    }
  };

  const keyPressHanlder = (e) => {
    if (e.key === "Enter") {
      if (!e.target.value) {
        return alert("is blank");
      }
      textQuery(e.target.value);

      e.target.value = "";
    }
  };

  const renderCards = (cards) => {
    return cards.map((card, i) => <Card key={i} cardInfo={card.structValue} />);
  };

  const renderMessage = (message, i) => {
    if (message.content?.text?.text) {
      return (
        <Message key={i} who={message.who} text={message.content.text.text} />
      );
    } else if (message.content && message.content.payload.fields.card) {
      const AvatarSrc =
        message.who === "bot" ? <RobotOutlined /> : <SmileOutlined />;

      return (
        <div key={i}>
          <List.Item style={{ padding: "1rem" }}>
            <List.Item.Meta
              avatar={<Avatar icon={AvatarSrc} />}
              title={message.who}
              description={renderCards(
                message.content.payload.fields.card.listValue.values
              )}
            />
          </List.Item>
        </div>
      );
    } else if (message.content.text.text === [""]) {
      return null;
    }
  };

  const renderMessages = (messages) => {
    if (messages) {
      return messages.map((message, i) => {
        return renderMessage(message, i);
      });
    } else {
      return null;
    }
  };

  return (
    <ChatbotWrapper>
      <div
        style={{
          height: 700,
          width: 700,
          border: "3px solid black",
          borderRadius: "7px",
          backgroundColor: "white",
        }}
        ref={ref}
      >
        <div style={{ height: 644, width: "100%", overflow: "auto" }}>
          {renderMessages(getMessage)}
        </div>
        <input
          style={{
            margin: 0,
            width: "100%",
            height: 50,
            borderRadius: "4px",
            padding: "5px",
            fontSize: "1rem",
            color: "black",
          }}
          placeholder="Send a message..."
          onKeyPress={keyPressHanlder}
          type="text"
        />
      </div>
    </ChatbotWrapper>
  );
}

export default Chatbot;
