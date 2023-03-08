import { useAppDispatch, useAppSelector } from "../hooks";
import { selectLogin } from "../slices/loginSlice";
import ClubList from "./ClubList";
import { Link, useParams } from "react-router-dom";
import { selectClubPage, setAppliedClubPage } from "../slices/pageSlice";
import Pagination from "./pagination";

const AppliedClub = () => {
  const lastClubPage = useAppSelector(selectClubPage);
  const isLogin = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();

  const { page } = useParams();

  return (
    <>
    {
      isLogin ?
      <div>
        <ClubList />
        <Pagination 
          total={1000} 
          size={20} 
          curr={page === undefined ? 0 : parseInt(page)}
          updatePage={(page: number) => {dispatch(setAppliedClubPage(page))}}
        />
      </div>
      :
      <div className="grid min-h-full place-items-center bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">woops</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">You are not logged in</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Login to see your applied clubs</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={"/clubs/" + lastClubPage}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link to="/login" className="text-sm font-semibold text-gray-900">
              Login <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    }
    </>
  )
};

export default AppliedClub;