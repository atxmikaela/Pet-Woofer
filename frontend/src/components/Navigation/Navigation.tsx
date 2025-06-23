import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {thunkAuthenticate} from "../../redux/session";



function Navigation():JSX.Element {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((store) => store.session.user);

        useEffect(() => {
        dispatch(thunkAuthenticate());
        }, [dispatch]);     
  
  return (
		<div className='navigation'>
			<ul>
				<li>
					<ProfileButton />
				</li>

				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				{user && user?.role !== 'Public' && (
					<li>
						<NavLink to='/pet/add'>Add a Pet</NavLink>
					</li>
				)}
				<li onClick={() => navigate('/?filter=available')}>
          Adoptable Pets
          </li>
				<li onClick={() => navigate('/?filter=missing')}>
          Missing
          </li>
				<li onClick={() => navigate('/?filter=found')}>
          Found
          </li>
				<li onClick={() => navigate('/?filter=shelters')}>
          Shelters
          </li>
			</ul>
		</div>
	);
}

export default Navigation;