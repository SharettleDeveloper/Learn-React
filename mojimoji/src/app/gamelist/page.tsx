"use client";

const GameList = () => {
  const mygames = [
    {
      title: "かかと落としから逃げろ",
      CreatedDay: "12-13",
      hyouka: 4,
      janru: ["アクション", "パズル"],
    },
    {
      title: "忍者ジャンプマスター",
      CreatedDay: "11-25",
      hyouka: 5,
      janru: ["アクション", "プラットフォーマー"],
    },
    {
      title: "ゾンビサバイバルX",
      CreatedDay: "10-05",
      hyouka: 3,
      janru: ["ホラー", "シューティング"],
    },
    {
      title: "激ムズ迷路",
      CreatedDay: "09-15",
      hyouka: 4,
      janru: ["パズル"],
    },
    {
      title: "カーレースバトル",
      CreatedDay: "08-30",
      hyouka: 5,
      janru: ["レース", "アクション"],
    },
    {
      title: "宇宙探検記",
      CreatedDay: "07-21",
      hyouka: 4,
      janru: ["アドベンチャー", "シミュレーション"],
    },
    {
      title: "ドラゴンファイトRPG",
      CreatedDay: "06-10",
      hyouka: 5,
      janru: ["RPG", "ファンタジー"],
    },
    {
      title: "ワイヤーパズルマスター",
      CreatedDay: "05-05",
      hyouka: 3,
      janru: ["パズル", "カジュアル"],
    },
    {
      title: "タイムトラベル探偵",
      CreatedDay: "04-12",
      hyouka: 4,
      janru: ["アドベンチャー", "ミステリー"],
    },
  ];

  console.log(mygames);

  return (
    <div className="pt-0 mx-0  overflow-hidden touch-none overscroll-none">
      <div className="flex justify-center items-center h-[400px] bg-red-400">
        <h1
          className="group text-white font-bold text-[40px] text-center flex justify-center items-center  bg-yellow-400 w-[400px] h-[80px] rounded-[40px] transition-all duration-300 ease-in-out
         hover:rounded-none "
        >
          Game{" "}
          <span
            id="GameTitle"
            className="text-blue-500 group-hover:text-red-500 transition-colors duration-300 group-hover:delay-300 delay-100"
          >
            一覧
          </span>
        </h1>
      </div>

      <div className="w-full bg-gray-300 flex justify-center ">
        <div className="w-[80%] bg-yellow-200 h-[100%] flex justify-around flex-wrap pt-[20px] p-[20px]">
          {mygames.map((game, index) => (
            <div className="w-[30%]  bg-green-200 aspect-square mb-2" key={index}>
              <div
                className="w-[20px] h-[20px] bg-gradient-to-r from-blue-500 to-blue-600"
                style={{ clipPath: "polygon(0 50%,  50% 100%, 100% 50%, 50% 0%)" }}
              ></div>
              <div className="mt-[10%] w-full h-[20%] bg-purple-200 flex justify-center items-center">
                <div className=" w-[90%] h-full bg-purple-300  ">
                  <p className="text-center font-bold">Title: {game.title}</p>
                </div>
              </div>
              <div className="mt-1 h-[50%] bg-purple-200">
                <div className="bg-purple-400 h-[30%]"></div>
                <div className="h-[30%]"></div>
                <div className=" h-[40%] w-full bg-purple-400 flex items-center">
                  <div className="h-[80%] w-full ml-4  bg-slate-400 flex items-center">
                    <div className="h-[70%] w-[30%] ml-1 bg-yellow-300/70 rounded-full border-white/80 border-2">
                      <p className="text-[10px]">{game.janru[0]}</p>
                    </div>
                    <div className="h-[70%] w-[30%] ml-1 bg-yellow-300/70 rounded-full border-white/80 border-2">
                      <p className="text-[10px] ">{game.janru[1]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <ul>
          {mygames.map((game, index) => {
            return (
              <li key={index}>
                <p>Title:{game.title}</p>
                <p>{game.CreatedDay}</p>
                <p>{game.janru[0]}</p>
                <p>{game.hyouka}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default GameList;
