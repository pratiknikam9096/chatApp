import "./App.css";
import { Button } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/homePage";
import ChatPage from "./pages/chatPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/chats",
      element: <ChatPage />,
    },
    {
      path:"*",
      element:<h1>error</h1>
    }
  ]);
  return (
    <>
      <RouterProvider router={router}>
        <Button variant="contained">Contained</Button>
      </RouterProvider>
    </>
  );
}

export default App;
