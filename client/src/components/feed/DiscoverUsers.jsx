import User from "../User";
import style from "/src/styles/feed/discoverUsers.module.css";

function DiscoverUsers({ discoverUsers, onUserClicked }) {
  return (
    <div className={style.discoverUsers}>
      {discoverUsers?.map((discoverUser) => (
        <User
          key={discoverUser.id}
          id={discoverUser.id}
          imgUrl={discoverUser.imgUrl}
          onClick={onUserClicked}
          fullName={discoverUser.fullName}
          username={discoverUser.username}
        ></User>
      ))}
    </div>
  );
}

export default DiscoverUsers;
