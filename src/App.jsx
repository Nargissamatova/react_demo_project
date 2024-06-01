import { useRef, useState, useEffect } from "react";
import axios from "axios";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home.jsx";
import About from "./routes/About.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Persons from "./routes/Persons.jsx";
import Users from "./routes/Users.jsx";
import Posts from "./routes/Posts.jsx";
import Root from "./routes/Root.jsx";

function App() {
  const [persons, setPersons] = useState([
    { id: 1, name: "Margit", title: "CEO", age: 29, location: "Helsinki" },
    { id: 2, name: "Kati", title: "developer", age: 25, location: "NY" },
    { id: 3, name: "Karin", title: "designer", age: 45, location: "Tartu" },
  ]);

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  console.log(users);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/users", element: <Users users={users} /> },
        { path: "/posts", element: <Posts /> },
        { path: "/persons", element: <Persons persons={persons} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

/*
const [posts, setPosts] = 

*/
