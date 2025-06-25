import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";

export default function Layout (): JSX.Element {

useEffect(() => {
const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    target.value = target.value.replace(/^\s+/, '');
  }
};

document.addEventListener('input', handleInput);

return () => {
  document.removeEventListener('input', handleInput);
};
}, []);


  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() =>
  {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
           <ModalProvider>
            <Navigation />
            { isLoaded && <Outlet /> }
            <Modal />
          </ModalProvider>
    </>
  );
}
