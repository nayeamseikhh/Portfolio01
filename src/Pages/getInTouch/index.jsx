// import React from "react";
// import GetintouchBanner from "./getintouchBanner";
// import RelationalPart from "./relationalPart";
// import Container from "../../GlobalComponents/Container";
// import GetInTouchText from "./getInTouchText";

// const GetInTouch = () => {
//   return (
//     <>
//       <Container>
//         <GetintouchBanner />
//         <GetInTouchText />
//         <RelationalPart />
//       </Container>
//     </>
//   );
// };

// export default GetInTouch;

import React, { useEffect, useState } from "react";
import GetintouchBanner from "./getintouchBanner";
import RelationalPart from "./relationalPart";
import Container from "../../GlobalComponents/Container";
import GetInTouchText from "./getInTouchText";
import { getContact } from "../../Service/api";

const GetInTouch = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadContact = async () => {
      try {
        const data = await getContact();

        setContact(data);
      } catch (err) {
        console.error("Contact API error:", err);

        setError(err.message || "Failed to load contact information.");
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-700 border-t-orange" />

          <p className="mt-4 font-poppins text-sm text-white/50">
            Loading contact information...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
        <p className="font-poppins text-sm text-red-400">{error}</p>
      </main>
    );
  }
  console.log(contact);
  return (
    <>
      <Container>
        <GetintouchBanner contact={contact} />

        <GetInTouchText contact={contact} />

        <RelationalPart contact={contact} />
      </Container>
    </>
  );
};

export default GetInTouch;
