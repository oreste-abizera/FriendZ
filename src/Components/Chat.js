import React from "react";
import styled from "styled-components";
import { url } from "../helpers/url";
import { FaMinus, FaComments, FaTimes } from "react-icons/fa";
import { FriendZContext } from "../context/context";
import { sendMessage, getMessages } from "../helpers/functions";
import { Link } from "react-router-dom";

export default function Chat() {
  const {
    currentchat,
    closeChat,
    collapseChat,
    openChat,
    users,
    user,
    resolveResponse,
    formatTime,
    formatText,
  } = React.useContext(FriendZContext);

  const [message, setmessage] = React.useState("");
  const [messages, setmessages] = React.useState([]);
  const [load, setload] = React.useState(false);

  const handlemessage = (e) => {
    setmessage(e.target.value);
  };

  const sendmessage = async (e) => {
    e.preventDefault();
    let response = await sendMessage(
      { message, createdAt: new Date().toISOString() },
      currentchat.user,
      user.token
    );
    setload(!load);
    if (response.data.success) setmessage("");
    resolveResponse(response);
  };

  const loadMessages = async () => {
    setmessages(await getMessages(currentchat.user, user.token));
  };

  React.useEffect(() => {
    if (currentchat.user) loadMessages();
  }, [currentchat, load]);

  if (!currentchat.user) {
    return <div></div>;
  }

  let currentuser = users.find((item) => item._id === currentchat.user);

  if (currentchat.state === "collapse") {
    return (
      <ChatWrapper shadow={false}>
        <div className="collapse-chat">
          <button type="button" className="btn btn-tool" onClick={closeChat}>
            <FaTimes className="icon"></FaTimes>
          </button>
          <img
            className="direct-chat-img"
            src={`${url}/uploads/${currentuser.image}`}
            alt="User"
            onClick={() => openChat(null)}
          />
        </div>
      </ChatWrapper>
    );
  }

  if (currentchat.state !== "shown") {
    return <div></div>;
  }

  return (
    <ChatWrapper>
      <div className="card card-primary card-outline direct-chat direct-chat-primary">
        <div className="card-header">
          <h3 className="card-title">Direct Chat</h3>

          <div className="card-tools">
            <span
              data-toggle="tooltip"
              title={`${messages.length} total messages`}
              className="badge bg-primary"
            >
              {messages.length}
            </span>
            <button
              type="button"
              className="btn btn-tool"
              onClick={collapseChat}
            >
              <FaMinus></FaMinus>
            </button>
            <Link
              to="/messages"
              className="btn btn-tool"
              title="Open in Messenger"
              onClick={closeChat}
            >
              <FaComments></FaComments>
            </Link>
            <button type="button" className="btn btn-tool" onClick={closeChat}>
              <FaTimes></FaTimes>
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="direct-chat-messages">
            {messages.length === 0 && (
              <p>
                Start Chatting with{" "}
                {`${currentuser.firstName} ${currentuser.lastName}`}
              </p>
            )}
            {messages.map((item) => {
              let mine = item.from._id === user.info._id;
              return (
                <div
                  key={item._id}
                  className={mine ? "direct-chat-msg right" : "direct-chat-msg"}
                >
                  <div className="direct-chat-info clearfix">
                    <span
                      className={
                        mine
                          ? "direct-chat-name float-right"
                          : "direct-chat-name float-left"
                      }
                    >
                      {`${item.from.firstName} ${item.from.lastName}`}
                    </span>
                    <span
                      className={
                        mine
                          ? "direct-chat-timestamp float-left"
                          : "direct-chat-timestamp float-right"
                      }
                    >
                      {formatTime(item.createdAt)}
                    </span>
                  </div>
                  <img
                    className="direct-chat-img"
                    src={`${url}/uploads/${item.from.image}`}
                    alt="User"
                  />
                  <div className="direct-chat-text">
                    {formatText(item.message)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card-footer">
          <form onSubmit={sendmessage}>
            <div className="input-group">
              <input
                type="text"
                name="message"
                placeholder={`Chat with ${currentuser.firstName} ${currentuser.lastName}`}
                className="form-control"
                value={message}
                onChange={handlemessage}
              />
              <span className="input-group-append">
                <button type="submit" className="btn btn-primary">
                  Send
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </ChatWrapper>
  );
}

const ChatWrapper = styled.div`
  z-index: 5;
  position: fixed;
  bottom: 0;
  left: 4%;
  width: 90%;
  box-shadow: ${(props) =>
    props.shadow === false ? "none" : "var(--primaryBoxShadow)"};

  .collapse-chat {
    margin-left: 98%;
  }
  .collapse-chat img {
    cursor: pointer;
  }
  .collapse-chat .icon {
    margin-left: 100%;
    margin-bottom: -1rem;
  }

  @media screen and (min-width: 768px) {
    left: 60%;
    width: 35%;
  }
`;
