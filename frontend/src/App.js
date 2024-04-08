import './App.css';
import { Button, Card, Nav } from "react-bootstrap"
import HomeNavbar from './components/Navbar';
import Navigation from './navigation/Navigation';
import { UserProvider } from './context/allContext';

function App() {
  return (
    <div>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </div>
  );
}

export default App;
