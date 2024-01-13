import AccountProvider from "./Context API/AccountProvider";
import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const clientid='88209064434-nnt9g11drudd4rovn3in9lk3n6i9apch.apps.googleusercontent.com';
  return (
   
      <GoogleOAuthProvider clientId={clientid}>
        <AccountProvider>
          <Messenger/>
          </AccountProvider>
        
        </GoogleOAuthProvider>
     
  
  );
}

export default App;
