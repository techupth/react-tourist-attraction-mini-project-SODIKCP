import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export function HomePage() {
  const [inputText, setInputText] = useState("");
  const [tarvelList, setTarvelList] = useState([]);
  const [copied, setCopied] = useState(false);

  const getData = async (input) => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${input}`
    );
    console.log(result.data.data);
    setTarvelList(result.data.data);
  };

  const handleTextCopy = (items) => {
    if (!inputText) {
      setInputText(items);
    } else if (!inputText.includes(items)) {
      setInputText(`${inputText} ${items}`);
    }
  };

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset copied state after 2 seconds
  };

  useEffect(() => {
    getData(inputText);
  }, [inputText]);

  return (
    <div className="App flex flex-col justify-center items-center  p-[30px]">
      <div>
        <h1 className="font text-sky-500 font-bold text-[40px] pt-3 pb-[30px]">
          เที่ยวไหนดี
        </h1>
      </div>
      <div className="input">
        <p>ค้นหาที่เที่ยว</p>
        <input
          type="text"
          className="placeholder:text-slate-400 border-none w-[1000px] text-center p-[10px] "
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        ></input>
        <hr></hr>
      </div>
      {tarvelList.map((items, index) => {
        return (
          <div className="w-[1100px] h-[270px] relative flex bg-white  rounded-[30px] border-2 border-slate-200 border-solid mt-[30px]">
            <img
              src={items.photos[0]}
              alt=""
              className="w-[350px] h-[270px] rounded-[30px] mr-[20px]"
            />
            <div className=" mainContainer flex flex-col pt-[10px] ">
              <a href={items.url} className=" font-bold text-[20px]">
                {items.title}
              </a>
              <p>{items.description.slice(0, 100)} ...</p>
              <a href={items.url} className="underline  text-sky-400">
                อ่านต่อ
              </a>
              <div className="flex mb-[20px]">
                หมวด
                {items.tags.map((items, index) => {
                  return (
                    <p
                      className="pl-3  underline"
                      onClick={() => handleTextCopy(items)}
                    >
                      {items}
                    </p>
                  );
                })}
              </div>
              <div className="flex w-[500px] gap-[30px]">
                <img
                  src={items.photos[1]}
                  alt=""
                  className="w-[100px] h-[100px] rounded-lg"
                />
                <img
                  src={items.photos[2]}
                  alt=""
                  className="w-[100px] h-[100px] rounded-lg"
                />
                <img
                  src={items.photos[3]}
                  alt=""
                  className="w-[100px] h-[100px] rounded-lg"
                />
              </div>
              <svg
                onClick={() => handleCopyLink(items.url)}
                className="w-10 h-10 absolute right-8 bottom-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
