const products = [
  { name: "gyouza", price: 200, id: 1 },
  { name: "karaage", price: 300, id: 2 },
  { name: "mabou", price: 605, id: 3 },
  { name: "tyahan", price: 500, id: 4 },
];

const listItem = products.map((item) => (
  <li key={item.id}>
    {" "}
    Name:{item.name} Price: {item.price}{" "}
  </li>
));

const filterdproducts = products.filter((item) => item.price % 2 == 0);
function MyButton() {
  return <button>I'm button</button>;
}

const user = {
  name: "Hedy Lamarr",
  imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
  imageSize: 90,
};

function Profile() {
  return (
    <>
      <div className="bg-white h-[140px] w-[50%] rounded-[10px]">
        <div className="pl-2 pt-2">
          <h1 className="text-black font-bold text-[20px] pb-1">{user.name}</h1>
          <img
            className="rounded-[50%/50%] bg-transparent"
            src={user.imageUrl}
            alt={"Photo of" + user.name}
            style={{
              width: user.imageSize,
              height: user.imageSize,
            }}
          />
        </div>
      </div>
    </>
  );
}
const Home = () => {
  return (
    <>
      <h1
        className="bg-white  text-black font-bold w-60 h-10 flex items-center justify-center rounded-[10%/50%] hover:bg-black hover:text-white border-[1px] border-transparent hover:border-white  hover:cursor-auto hover:rounded-[20%/50%] transition-all duration-200 
      "
      >
        Welcome to my app
      </h1>
      <MyButton />
      <ul>{listItem}</ul>
      <ul>
        {filterdproducts.map((item) => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
      <div className="pl-4 pt-4">
        <Profile />
      </div>
    </>
  );
};
export default Home;
