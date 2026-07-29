import React from "react";
import BossImg from "./bossImg";
import { FaSearch } from "react-icons/fa";
import AiSearch from "./aiSearch";

const BossNayeam = () => {
  return (
    <>
      <div className="text-white mt-10">
        <div className="flex justify-evenly">
          <BossImg />
          <div>
            {/* <h4>Ask Ai for myself</h4>
            <div>
              <input
                type="text"
                name="AIinput"
                id=""
                className="border rounded-lg"
                placeholder="Ask ai for muself"
              />
              <FaSearch />
            </div> */}
            <AiSearch />
          </div>
        </div>
      </div>
    </>
  );
};

export default BossNayeam;
