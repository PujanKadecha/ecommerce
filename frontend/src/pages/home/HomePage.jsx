import { useSelector } from "react-redux";

function HomePage() {

    const auth = useSelector(

        state => state.auth

    );

    console.log(auth);

    return <h1>Home Page</h1>;

}

export default HomePage;