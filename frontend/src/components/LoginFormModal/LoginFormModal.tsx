import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { AnyAction } from "redux";


interface IErrors {
  email: string;
  password:string
}

function LoginFormModal():JSX.Element {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IErrors | AnyAction>({email: "", password: ""});
  const { closeModal } = useModal();

  const handleDemoButton = async (e: any) => {
		e.preventDefault();

    console.log('Demo email:', import.meta.env.VITE_DEMO_EMAIL);
		console.log('Demo password:', import.meta.env.VITE_DEMO_PASSWORD);

		dispatch(thunkLogin({ 
							email: import.meta.env.VITE_DEMO_EMAIL || "", 
							password: import.meta.env.VITE_DEMO_PASSWORD || "" }));
		setEmail("");
		setPassword("");
    closeModal();
	};

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );


    if (serverResponse.ok) {
      closeModal();
    } else {
      setErrors(serverResponse);
    }
  };
  return (
		<>
			<h1>Log In to Pet Woofer</h1>
			<form className='modal-form' onSubmit={(e) => handleSubmit(e)}>
				<label>
					Email or Username
					<input
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errors.email && <p>{errors.email}</p>}
				<label>
					Password
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.password && <p>{errors.password}</p>}
				<button type='submit'>Log In</button>
				<button className='form-button' onClick={handleDemoButton}>
					Demo User
				</button>
			</form>
		</>
	);
}

export default LoginFormModal;
