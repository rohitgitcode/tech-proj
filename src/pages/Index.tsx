// import { Navigate } from 'react-router-dom';

// const Index = () => {
//   return <Navigate to="/onboarding" replace />;
// };

// export default Index;
// import { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { fetchRoutes } from "../lib/firestore"; // import your Firestore function

// const Index = () => {
//   useEffect(() => {
//     // Test Firestore connection
//     fetchRoutes().then((data) => {
//       console.log("Routes from Firestore:", data);
//     });
//   }, []);

//   // Keep your existing redirect
//   return <Navigate to="/onboarding" replace />;
// };

// export default Index;
// import { addRoute } from "../lib/firestore";

// <button onClick={() => {
//   addRoute({ name: "Test Route", start: "Point A", end: "Point B" });
// }}>
//   Add Test Route
// </button>
import React from "react";
import { addRoute } from "../lib/firestore"; // make sure addRoute exists in firestore.ts

const TestButton: React.FC = () => {
  return (
    <button
      onClick={() => {
        addRoute({ name: "Demo Route", start: "Campus", end: "Library" });
      }}
      style={{
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "20px"
      }}
    >
      Add Test Route
    </button>
  );
};

export default TestButton;