import ClubCard from "./ClubCard";
import { useParams, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { setAppliedClubPage, setClubPage } from "../slices/pageSlice";
import { useAppSelector, useAppDispatch } from "../hooks";
import { logout, selectLogin, selectUser } from "../slices/loginSlice";
import { useEffect, useState } from "react";
import NoLogin from "./NoLogin";
import NoClubs from "./NoClubs";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export type Listing = {
  id: number,
  name: string,
  organizer: string,
  members: number
};

interface ClubListProp {
  isApplied: boolean
};

const size = parseInt(process.env.REACT_APP_PAGE_SIZE === undefined ? "5" : process.env.REACT_APP_PAGE_SIZE);

const ClubList = ({ isApplied = false }: ClubListProp) => {
  const { pageString } = useParams();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogin = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [listings, setListings] = useState<Listing[]>([]);

  const fetchAppliedClubs = async (page: number, userId: number) => {
    await fetch(`${process.env.REACT_APP_BACKEND}/clubs/applied/${page}?userId=${userId}`, { 
      method: "get",
      credentials: "include",
    })
    .then(res => {
      if (res.status === 401) {
        throw new Error("auth unsuccessful")
      }

      return res.json();
    })
    .then(res => {
      console.log(res.msg);
      setCount(res.data.count);
      setListings(res.data.rows);
    }).catch(err => {
      toast("login session has expired");
      console.error(err);
      dispatch(logout);
    })
  }

  const fetchClubs = async (page: number) => {
    await fetch(`${process.env.REACT_APP_BACKEND}/clubs/${page}`, { 
      method: "get" ,
      credentials: "include",
    })
    .then(res => res.json())
    .then(res => {
      console.log(res.msg);
      setCount(res.data.count);
      setListings(res.data.rows);
    })
  }

  useEffect(() => {
    const tempPage = pageString === undefined ? 0 : parseInt(pageString);
    if (tempPage < 0) {
      if (isApplied) {
        navigate('/applied/0');
      } else {
        navigate('/clubs/0');
      }
    } else {
      setPage(tempPage);
    }
  }, [pageString]);

  useEffect(() => {
    if (isApplied) {
      if (isLogin) {
        fetchAppliedClubs(page, user.id);
      } else {
        setCount(0);
        setListings([]);
      }
    } else {
      fetchClubs(page);
    }
  }, [isLogin, page, isApplied]);

  useEffect(() => {
    const totalPages = Math.ceil(count / size);
    const maxPage = totalPages === 0 ? 0 : totalPages - 1;

    if (page > maxPage) {
      if (isApplied) {
        navigate(`/applied/${maxPage}`);
      } else {
        navigate(`/clubs/${maxPage}`);
      }
    }
  }, [count])

  const handleUpdateClubPage = (page: number) => {
    dispatch(setClubPage(page));
    setPage(page);
  }

  const handleUpdateAppliedClubPage = (page: number) => {
    dispatch(setAppliedClubPage(page));
    setPage(page);
  }
    
  return (
    <>
      {
        !isApplied ?
          <div className="flex flex-col min-h-full bg-white item-center">
            {
              listings.map((listing) => (
                <ClubCard key={listing.id} listing={listing} />
              ))
            }
            <Pagination
              key={`club_${count}_${page}`}
              total={count}
              curr={page}
              pageUrl="/clubs/"
              updatePage={handleUpdateClubPage}
            />
          </div>
        :
          isLogin ?
          <div className="flex flex-col min-h-[90vh] bg-white item-center">
            {
              listings.length == 0 ?
              <NoClubs lastClubPage={page} />
              :
              listings.map((listing) => (
                <ClubCard key={listing.id} listing={listing} />
              ))
            }
            <Pagination 
              key={`applied_club_${count}_${page}`}
              total={count}
              curr={page}
              pageUrl="/applied/"
              updatePage={handleUpdateAppliedClubPage}
            />
          </div>
          :
          <NoLogin lastClubPage={page} />
      }
      <ToastContainer 
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
};

export default ClubList;