import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {thunkAuthenticate} from "../../redux/session";



function Navigation():JSX.Element {

    const dispatch = useAppDispatch();
    const user = useAppSelector((store) => store.session.user);


        useEffect(() => {
        dispatch(thunkAuthenticate());
        }, [dispatch]);     
  




  return (
    <div className="navigation">
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>

      {user && user?.role !== 'Public' && (
      <li>
        <NavLink to="/pet/add">Add a Pet</NavLink>
      </li>
      )}
      {user && (
        <li>
          <p>Your Shelter Id: {user.shelterId}</p>
          <p>Your User Id: {user.id}</p>
        </li>
      )}
    </ul>

    </div>
  );
}

export default Navigation;
