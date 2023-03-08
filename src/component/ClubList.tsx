import ClubCard from "./ClubCard";
import { Link, useParams } from "react-router-dom";
import Pagination from "./pagination";
import { selectClubPage, setAppliedClubPage, setClubPage } from "../slices/pageSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import { selectLogin } from "../slices/loginSlice";

export type Listing = {
  id: number,
  name: string,
  organizer: string,
  members: number
};

interface ClubListProp {
  listings?: Listing[],
  isApplied: boolean
};

const defaultListings = [
  {
    id: 1,
    name: "Football Club",
    organizer: "Student Organization",
    members: 132
  },
  {
    id: 2,
    name: "Math Society Club",
    organizer: "Faculty of Science and Math",
    members: 32
  },
  {
    id: 3,
    name: "Programming Club",
    organizer: "Faculty of Computer Science",
    members: 97
  },
  {
    id: 4,
    name: "Programming Club",
    organizer: "Faculty of Computer Science",
    members: 97
  },
  {
    id: 5,
    name: "Programming Club",
    organizer: "Faculty of Computer Science",
    members: 97
  },
  {
    id: 6,
    name: "Programming Club",
    organizer: "Faculty of Computer Science",
    members: 97
  },
];

const ClubList = ({listings = defaultListings, isApplied = false}: ClubListProp) => {
  const { page } = useParams();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectLogin);
  const lastClubPage = useAppSelector(selectClubPage);

  const handleUpdateClubPage = (page: number) => {
    dispatch(setClubPage(page));
  }

  const handleUpdateAppliedClubPage = (page: number) => {
    dispatch(setAppliedClubPage(page));
  }
    
  return (
    <>
      <div className="flex flex-col h-full bg-white item-center overflow-auto">
        {
          !isApplied || isLogin ?
            listings.map((listing) => (
              <ClubCard key={listing.id} listing={listing} />
            ))
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
      </div>
      <Pagination 
        total={1000} 
        size={20} 
        curr={page === undefined ? 0 : parseInt(page)}
        updatePage={isApplied ? handleUpdateAppliedClubPage : handleUpdateClubPage}
      />
    </>
  )
};

export default ClubList;