import GetInTouchText from "../getInTouchText";
import RelationalPart from "../relationalPart";
import LeftLayout from "./leftlayout";
import RightLayout from "./rightLayout";

const GetintouchBanner = ({ contact }) => {
  return (
    <>
      <div className="dark:text-white my-20 pt-10 ">
        {/* left part */}
        <div className="grid grid-cols-2 justify-between  text-white02">
          <LeftLayout contact={contact} />

          {/* right Part  */}
          <RightLayout contact={contact} />
        </div>
      </div>
    </>
  );
};

export default GetintouchBanner;
