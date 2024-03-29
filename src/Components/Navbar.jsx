import { FaGithub } from "react-icons/fa";
const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14 ">
        <div className="logo font-bold text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>
        <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="">
              Home
            </a>
            <a className="hover:font-bold" href="">
              About
            </a>
            <a className="hover:font-bold" href="">
              Services
            </a>
            <a className="hover:font-bold" href="">
              Contact Us
            </a>
          </li>
        </ul>
        <button className="bg-green-500 text-white my-5 rounded-full flex gap-4 justify-between items-center py-1 ring-white ring-1">
          <FaGithub size={30} />
          <span className="font-bold px-4">Github</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
