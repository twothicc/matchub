import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ClubList from "../component/ClubList";
import Pagination from "../component/pagination";
import { setClubPage } from "../slices/pageSlice";

const Club = () => {
  const { page } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <ClubList />
      <Pagination 
        total={1000} 
        size={20} 
        curr={page === undefined ? 0 : parseInt(page)}
        updatePage={(page: number) => {dispatch(setClubPage(page))}}
      />
    </div>
  )
};

export default Club;
