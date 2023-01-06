import Layout from "./components/Layout";
import UserList from "./containers/UserList";
import FormContainer from "./containers/FormContainer";
import { UserContextProvider } from "./context/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Layout>
        <UserList />
        <FormContainer />
      </Layout>
    </UserContextProvider>
  );
}

export default App;
