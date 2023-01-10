import Layout from "./components/Layout";
import UserList from "./containers/UserList";
import FormContainer from "./containers/FormContainer";
import { UserContextProvider } from "./context/UserContext";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <UserContextProvider>
      <Layout>
        <UserList />
        <FormContainer />
        <ToastContainer />
      </Layout>
    </UserContextProvider>
  );
}

export default App;
