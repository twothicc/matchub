import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectClubPage } from '../slices/pageSlice';
import NavBar from '../component/NavBar';
import FunctionalErrorBoundary from '../component/ErrorBoundary';
import { login, logout } from '../slices/loginSlice';

type AppProp = {
  children: ReactNode
};

function App({ children }: AppProp) {
  const lastClubPage = useAppSelector(selectClubPage)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return navigate("/clubs/" + lastClubPage);
  }, [])


  return (
    <div className="min-h-screen">
      <FunctionalErrorBoundary children={
        <>
          <NavBar />
          {children}
        </>
      }/>
    </div>
  );
}

export default App;
