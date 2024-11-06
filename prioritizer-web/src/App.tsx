import { ToastContainer } from 'react-toastify';
import { Login } from './features/auth/components/Login';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Login />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
