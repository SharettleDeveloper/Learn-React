import ZaikoTable from "./components/table";
import { products } from "./data/products";

const Home = () => {
  return <ZaikoTable products={products} />;
};

export default Home;
