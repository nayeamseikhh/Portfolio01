// import { useEffect, useState } from "react";
// import { getDatabaseStatus } from "../..//service/api";

// const BackendTest = () => {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const testBackend = async () => {
//       try {
//         const result = await getDatabaseStatus();

//         console.log("Backend response:", result);

//         setData(result);
//       } catch (error) {
//         console.error(error);

//         setError(error.message);
//       }
//     };

//     testBackend();
//   }, []);

//   return (
//     <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
//       <h2>Backend Connection</h2>

//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default BackendTest;
