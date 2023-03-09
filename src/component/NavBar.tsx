import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectLogin, logout } from '../slices/loginSlice';

const NavBar = () => {
  const navigate = useNavigate();
  const isLogin = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", { 
      method: "get",
      credentials: "include",
    })
    .then(res => {
      if (res.status === 401) {
        throw new Error("logout unsuccessful");
      }

      return res.json()
    })
    .then(res => {
      console.log(res.msg);
      dispatch(logout());
      navigate("/clubs/0");
    })
    .catch(err => console.error(err));
  };

  return (
    <header className="sticky min-h-[10vh] top-0 z-50 flex item-center bg-white">
      <nav className="mx-auto flex min-w-full items-center justify-between p-6 lg:px-24" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="clubs/0" className="text-sm font-semibold leading-6 text-gray-900">
            Clubs List
          </Link>
          <Link to="applied/0" className="text-sm font-semibold leading-6 text-gray-900">
            Applied Clubs
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {
            isLogin ?
            <button
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={handleLogout}
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </button>
            :
            <Link to="login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          }
        </div>
      </nav>
    </header>
  )
};

export default NavBar;