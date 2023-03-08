import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { selectClubPage } from '../slices/pageSlice';
import Home from '../component/Home';

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
    <html className="h-full bg-gray-50">
      <body className="h-full">
        <Home children={children}/>
      </body>
    </html>
  );
}

export default App;
