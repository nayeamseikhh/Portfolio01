import nayeamImg from "../../../../src/assets/myImages/nayeam.png";

const LeftLayout = ({ contact }) => {
  console.log(contact);
  return (
    <div
      className="
        w-full
        max-w-[330px]
        sm:max-w-[380px]
        md:max-w-[430px]
        lg:max-w-[500px]

        min-h-[390px]
        sm:min-h-[490px]
        md:min-h-[590px]
        lg:min-h-[650px]

        mx-auto

        border
        border-transparent
        hover:border-orange-500

        bg-transparent
        rounded-2xl

        flex
        items-center
        justify-center
        text-center

        overflow-hidden

        transition-all
        duration-300
        ease-in-out

        hover:-translate-y-2
        hover:scale-[1.02]
      "
    >
      <img
        src={contact?.ImgNayeam}
        alt="Nayeam"
        className="
          w-full
          h-full
          object-cover
          rounded-2xl
        "
      />
    </div>
  );
};

export default LeftLayout;
