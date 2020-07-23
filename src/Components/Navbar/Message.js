import React from "react";
import { FaClock } from "react-icons/fa";
import { url } from "../../helpers/url";
import { Link } from "react-router-dom";
import { FriendZContext } from "../../context/context";
import { getMessages } from "../../helpers/functions";

export default function Message({ currentChat }) {
  const {
    openChat,
    handleDropdown,
    dropdown,
    user,
    formatTime,
    currentchat,
  } = React.useContext(FriendZContext);
  const [lastmessage, setlastmessage] = React.useState();
  async function loadLatestMessages() {
    let messages = await getMessages(currentChat._id, user.token);
    setlastmessage(messages[messages.length - 1]);
  }
  React.useEffect(() => {
    loadLatestMessages();
  }, [dropdown, currentchat]);

  if (!lastmessage) {
    return (
      <div className="p-4">
        Message loading...
        <div className="dropdown-divider"></div>
      </div>
    );
  }
  return (
    <div>
      <Link
        to={`#${currentChat.firstName} ${currentChat.lastName}`}
        className="dropdown-item"
        onClick={() => {
          openChat(currentChat._id);
          handleDropdown("");
        }}
      >
        <div className="media">
          <img
            src={`${url}/uploads/${currentChat.image}`}
            alt="User"
            className="img-size-50 mr-3 img-circle"
          />
          <div className="media-body">
            <h3 className="dropdown-item-title">
              {`${currentChat.firstName} ${currentChat.lastName}`}
              <span
                className={
                  lastmessage.status === "read"
                    ? "float-right text-sm text-success"
                    : "float-right text-sm text-danger"
                }
              >
                {lastmessage.status}
              </span>
            </h3>
            <p className="text-sm mt-2">
              {lastmessage.from._id === user.info._id && <b>me: </b>}
              {lastmessage.message.length > 20
                ? lastmessage.message.slice(0, 20) + "..."
                : lastmessage.message}
            </p>
            <p className="text-sm text-muted">
              <FaClock className="mr-1"></FaClock>{" "}
              {formatTime(lastmessage.createdAt)}
            </p>
          </div>
        </div>
        {/* <!-- Message End --> */}
      </Link>
      <div className="dropdown-divider"></div>
    </div>
  );
}
