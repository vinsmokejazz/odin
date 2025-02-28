import {Link} from "react-router-dom";

export default function Navbar(){
  return (
    <nav>
    <ul>
    <li><Link to="/login"></Link></li>
    <li><Link to="/signup">Signup</Link></li>
    <li><Link to="/todos">Todos</Link></li>
    </ul>
    </nav>
  );
}