import "./user.css";

const user = {
  name: "Hydy Lamarr",
  imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
  imageSize: 20,
};

const getImageSizeClass = (size: number) => {
  if (size <= 50) return "avatar-small";
  if (size <= 90) return "avatar-medium";
  return "avatar-large";
};
export default function Profile() {
  return (
    <>
      <div className="user-profile-body">
        <h2 className="user-profile-name">{user.name}</h2>
        <img
          className={`avatar ${getImageSizeClass(user.imageSize)}`}
          src={user.imageUrl}
          alt={"Photo of" + user.name}
        />
      </div>
    </>
  );
}
