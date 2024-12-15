import "./App.css";

function App() {
  return (
    <>
      <header className="header">
        <div className="title">Disbook</div>
      </header>

      <div className="container">
        <div className="leftBar">
          <button>Conversations</button>
          <button>Feed</button>
          <button>Group 1</button>
          <button>Group 2</button>
          <button>Group 3</button>
        </div>
        <div className="displayer">
          <div className="conversationsSection">
            <div className="conversationsTop">
              <input
                type="text"
                className="searchConversation"
                placeholder="Find or start a conversation"
              />
            </div>
            <div className="conversationsMiddle">
              <div className="directConversations">
                <div>Direct conversations</div>
                <button>Conversation 1</button>
                <button>Conversation 2</button>
                <button>Conversation 3</button>
              </div>
            </div>
            <div className="conversationsBottom">
              <img src="" alt="Profile picture" />
              <button className="mic">Mic</button>
              <button className="headset">Headset</button>
              <button className="settings">Settings</button>
            </div>
          </div>
          <div className="conversationDisplayer">
            <div className="conversationTop">
              <div>User conversation name and its picture if valid</div>
            </div>
            <div className="conversationMiddle">
              <div className="messagingSection">
                <div className="message">
                  <img src="" alt="Sender picture" />
                  <div className="senderName">Sender name</div>
                  <div className="messageSendDate">Message send date</div>
                  <div className="messageContent">Message content</div>
                </div>
              </div>
              <div className="conversationDetailsSection">
                This might exist and include the user information you talk with
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
