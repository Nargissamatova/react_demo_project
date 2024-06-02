import { useState, useEffect } from "react";
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
  // State for persons data
  const [persons, setPersons] = useState([
    { id: 1, name: "Ross", title: "CEO", age: 29, location: "Helsinki" },
    {
      id: 2,
      name: "Harry Potter",
      title: "developer",
      age: 25,
      location: "London",
    },
    {
      id: 3,
      name: "John Doe",
      title: "designer",
      age: 45,
      location: "New York",
    },
  ]);

  // State for users data
  const [users, setUsers] = useState([]);

  // Fetching users data from an external API
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  // State for posts data
  const [posts, setPosts] = useState([]);

  // Fetching posts data from a local server
  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to toggle the published status of a post
  const setPublishedStatus = (id, currentStatus) => {
    const findPost = posts.find((post) => post.id === id);
    const updateStatus = { ...findPost, published: !currentStatus };

    // Updating the published status of a post on the server
    axios
      .put(`http://localhost:3001/posts/${id}`, updateStatus)
      .then((res) => {
        // Updating the posts state with the modified post
        setPosts(
          posts.map((post) =>
            post.id === id ? { ...post, published: !currentStatus } : post
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Creating the router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/users", element: <Users users={users} /> },
        {
          path: "/posts",
          element: (
            <Posts posts={posts} setPublishedStatus={setPublishedStatus} />
          ),
        },
        { path: "/persons", element: <Persons persons={persons} /> },
      ],
    },
  ]);

  // Rendering the router provider with the configured router
  return <RouterProvider router={router} />;
}

export default App;
