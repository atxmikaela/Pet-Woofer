import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import SinglePet from '../pages/SinglePet';
import CreatePet from '../pages/CreatePet';
import Splash from '../pages/Splash';
import SingleShelter from '../pages/SingleShelter';
import CreateShelter from '../pages/CreateShelter';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Splash />,
      },
      {
        path: "/pet/:id",
        element: <SinglePet />,
      },
      {
        path: "/pet/add",
        element: <CreatePet />,
      },
      {
        path: "/shelter/:id",
        element: <SingleShelter />,
      },
      {
        path: "/shelter/add",
        element: <CreateShelter />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
