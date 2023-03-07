import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectLogin, logout } from '../slices/loginSlice';
import { selectClubPage } from '../slices/pageSlice';

function App() {
  const isLogin = useAppSelector(selectLogin);
  const lastClubPage = useAppSelector(selectClubPage)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return navigate("/clubs/" + lastClubPage);
  }, [])

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <html className="h-full bg-gray-50">
      <body className="h-full">
        <header className="sticky top-0 z-50 bg-white">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
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
        <Outlet />
      </body>
  </html>
  );
}

export default App;
