import AppRoutes from "./Router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./../AuthContext";


function App() {
  return (
    <AuthProvider>
    
        <AppRoutes />
        <Toaster position="top-right" reverseOrder={false} />
      
    </AuthProvider>
  );
}

export default App;
