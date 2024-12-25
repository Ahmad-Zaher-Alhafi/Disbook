import { useEffect, useState } from "react";
import "./disbook.css";
import { useNavigate } from "react-router-dom";
import * as storage from "./storage";
import Error from "./components/Error";
import Loading from "./components/Loading";
import Conversations from "./components/Conversations";
import SocketProvider from "./components/SocketProvider";
import Feed from "./components/feed/Feed";
import { MainTabs } from "./tabs";
import { myInfo, reset, setMyInfo } from "./myInfo";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;

function Disbook() {
  const [isAuthorised, setIsAuthorised] = useState();
  const [openedTap, setOpenedTap] = useState(MainTabs.Feed);
  const [, setMyInfoData] = useState();

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

  useEffect(() => {
    reset();
    const fetchMyInfo = async () => {
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
        return;
      }

      const myInfo = await response.json();
      setMyInfo(myInfo);
      setMyInfoData(myInfo);
    };

    fetchMyInfo();
  }, []);

  if (isAuthorised === undefined || !myInfo) {
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
          <button onClick={() => setOpenedTap(MainTabs.Feed)}>Feed</button>
          <button onClick={() => setOpenedTap(MainTabs.Chat)}>Chat</button>
        </div>
        <div className="displayer">
          {openedTap === MainTabs.Chat && (
            <SocketProvider>
              <Conversations></Conversations>
            </SocketProvider>
          )}

          {openedTap === MainTabs.Feed && <Feed></Feed>}
        </div>
      </div>
    </div>
  );
}

export default Disbook;
