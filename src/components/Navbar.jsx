import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="fixed left-0 top-0 right-0 backdrop:blur h-16 z-50 bg-light border-b">
      <nav className="max-w-[1080px] mx-auto h-full flex justify-between items-center">
        <div className="flex items-center gap-16">
          <Link to="/" className="text-xl text-dark font-bold tracking-wider">
            House Hunter
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-dark">
              Home
            </Link>
            <Link to="/about" className="text-dark">
              About
            </Link>
            <Link to="/contact" className="text-dark">
              Contact
            </Link>
            <Link to="/dashboard" className="text-dark">
              Dashboard
            </Link>
          </div>
        </div>
        <div>
          <Link to="/login" className="py-2 px-4 bg-accent text-dark font-semibold rounded-md">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
