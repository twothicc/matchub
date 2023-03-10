import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { selectClubPage } from '../slices/pageSlice';
import NavBar from '../component/NavBar';
import FunctionalErrorBoundary from '../component/ErrorBoundary';

type AppProp = {
  children: ReactNode
};

function App({ children }: AppProp) {
  const lastClubPage = useAppSelector(selectClubPage)
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
