"use client";
import { useMemo, useState } from "react";
import { Product } from "../data/products";

const ZaikoTable = ({ products }: { products: Product[] }) => {
  const [isLoginpush, setIsLoginPush] = useState(false);
  const handleLogin = () => {
    setIsLoginPush(!isLoginpush);
  };
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByStock, setSortByStock] = useState(false);

  const displayedProducts = useMemo(() => {
    // 両方がtrueの場合、例えば price でのソートを優先する場合
    if (sortByPrice) {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (sortByStock) {
      return [...products].sort((a, b) => a.stock - b.stock);
    }
    return products;
  }, [products, sortByPrice, sortByStock]);
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map((num) => num * 2);
  const filtered = doubled.filter((num) => num % 2 === 0);
  const total = filtered.reduce((acc, num) => acc + num, 0);

  console.log("Total(Functionnal):", total);
  return (
    <>
      <h1>在庫管理テーブル</h1>
      <button
        onClick={() => {
          setSortByPrice(!sortByPrice);
          if (sortByStock) {
            setSortByStock(false);
          }
        }}
        className="mb-4 px-3 py-1 bg-blue-500 text-white rounded"
      >
        {sortByPrice ? "元の順に戻す" : "価格順に並び替え"}
      </button>
      <button
        onClick={() => {
          setSortByStock(!sortByStock);
          if (sortByPrice) {
            setSortByPrice(false);
          }
        }}
        className="mb-4 px-3 py-1 bg-blue-400 text-white rounded"
      >
        {sortByStock ? "ストックで戻す " : "ストックで並び替え"}
      </button>
      <table className="border-separate border-spacing-1">
        <thead>
          <tr>
            <th>Prodcut_name</th>
            <th>Category</th>
            <th className="pl-5">Price</th>
            <th className="pl-5">Stock</th>
          </tr>
        </thead>
        <tbody>
          {displayedProducts.map((value, index) => (
            <tr key={index}>
              {/* 左側のセル（角を丸くする） */}
              <td className="bg-slate-400 px-3 py-2 border-blue-400 border-l-2 border-t border-b rounded-tl-2xl rounded-bl-2xl">
                {value.product_name}
              </td>

              {/* 中央のセル */}
              <td className="bg-slate-500 px-3 py-2 border-green-400 border-t border-b border-r">{value.category}</td>

              {/* 右側のセル（必要なら丸くする） */}
              <td className="px-5 py-6 border-white border-t-purple-500 border-t-4 border-b-4 border-b-red-500 border-r-yellow-400 border-r-4 border-l-orange-500 border-l-4 text-black bg-white">
                {value.price}
              </td>

              <td className="px-5 py-2 border-white border-t border-r border-b rounded-tr-2xl rounded-br-2xl">{value.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center min-h-screen bg-yellow-500">
        <button
          className="group flex justify-center items-center w-[150px] h-[90px] 
                bg-gradient-to-br from-green-600/50
                via-lime-500/80 to-lime-300/50 
                hover:from-green-600/100 hover:via-lime-500 hover:to-lime-300
                rounded-br-3xl rounded-tl-3xl hover:rounded-tr-[50px] hover:rounded-bl-[50px] 
                hover:rounded-br-none hover:rounded-tl-none shadow-lg 
                transition-all duration-600 hover:duration-300 hover:cursor-pointer"
          onClick={handleLogin}
        >
          {!isLoginpush ? (
            <h2
              className="text-center font-bold text-gray-200 text-lg 
                 group-hover:text-[20px] transition-all duration-600 hover:duration-300"
            >
              Login
            </h2>
          ) : (
            <p className="animate-custom-animation">Loading...</p>
          )}
        </button>
      </div>
    </>
  );
};

export default ZaikoTable;
