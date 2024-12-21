import { useEffect, useState } from "react";
import "./disbook.css";
import { useNavigate } from "react-router-dom";
import * as storage from "./storage";
import Error from "./components/Error";
import Loading from "./components/Loading";
import Conversations from "./components/Conversations";
import SocketProvider from "./components/SocketProvider";
import Feed from "./components/Feed";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;

function Disbook() {
  const [isAuthorised, setIsAuthorised] = useState();
  const [isChatOpened, setIsChatOpened] = useState();

  const navigate = useNavigate();
  const token = storage.getToken();

  useEffect(() => {
    if (!token) {
      navigate("/signup");
      return;
    }

    const checkAuthuntication = async () => {
      const response = await fetch(disbookApiUrl + "/users/isAuthorised", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((err) => {
        console.error("Could not log in", err);
        throw new Error("");
      });

      if (!response.ok) {
        setIsAuthorised(false);
        navigate("/login");
        return;
      }

      setIsAuthorised(true);
    };

    checkAuthuntication();
  }, []);

  if (isAuthorised === undefined) {
    return <Loading></Loading>;
  }

  if (!isAuthorised) {
    return <Error></Error>;
  }

  return (
    <div className="disbook">
      <header className="header">
        <div className="title">Disbook</div>
      </header>

      <div className="container">
        <div className="leftBar">
          <button onClick={() => setIsChatOpened(false)}>Feed</button>
          <button onClick={() => setIsChatOpened(true)}>Chat</button>
        </div>
        <div className="displayer">
          {isChatOpened ? (
            <SocketProvider>
              <Conversations></Conversations>
            </SocketProvider>
          ) : (
            <Feed></Feed>
          )}
        </div>
      </div>
    </div>
  );
}

export default Disbook;
