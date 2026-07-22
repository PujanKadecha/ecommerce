import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { fetchCurrentUser } from "./store/slices/auth.slice";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchCurrentUser());

    }, [dispatch]);

    return <AppRoutes />;
   

}

export default App;
