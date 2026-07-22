// import { useEffect } from "react";
// import { loginUser } from "../../api/auth.api";

// function HomePage() {
//   useEffect(() => {
//     const login = async () => {
//       try {
//         const response = await loginUser({
//           email: "pujan@gmail.com",

//           password: "Pujan12345!",
//         });

//         console.log(response.data);
//       } catch (error) {
//         console.log(error.response?.data);
//       }
//     };

//     login();
//   }, []);

//   return <h1>Home</h1>;
// }

// export default HomePage;

import { useDispatch } from "react-redux";
import { login } from "../../store/slices/auth.slice";

function HomePage() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      login({
        email: "pujan@gmail.com",

        password: "Pujan12345!",
      }),
    );
  };

  return <button onClick={handleLogin}>Test Login</button>;
}

export default HomePage;
