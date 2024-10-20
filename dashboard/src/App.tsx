import AppRoutes from "./Router";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <AppRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
