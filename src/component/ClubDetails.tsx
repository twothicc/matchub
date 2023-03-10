import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout, selectLogin, selectUser } from '../slices/loginSlice';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type ClubDetails = {
  title: string,
  about: string,
  registrationFee: number,
  lastYearActiveMembers: number,
  contactName: string,
  contactNumber: string,
}

const ClubDetails = () => {
  const { id } = useParams();
  const isLogin = useAppSelector(selectLogin);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isApplied, setIsApplied] = useState(true); 
  const [clubDetails, setClubDetails] = useState({
    title: "dummy club",
    about: "dummy club description",
    registrationFee: 0,
    lastYearActiveMembers: 0,
    contactPersonName: "John Doe",
    contactPersonNumber: "999",
  });

  const fetchClubDetails = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND}/clubs/details/${id}`, { 
      method: "get",
      credentials: "include",
    })
    .then(res => res.json())
    .then(res => {
      console.log(res.msg);
      setClubDetails(res.data);
    })
  };

  const checkAppliedClub = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND}/clubs/status/${id}?userId=${user.id}`, {
      method: "get",
      credentials: "include",
    })
    .then(res => {
      if (res.status === 401) {
        throw new Error("auth unsuccessful");
      }

      return res.json();
    })
    .then(res => {
      console.log(res);
      setIsApplied(res.isApplied);
    }).catch(err => {
      console.error(err);
      toast("login session has expired");
      dispatch(logout);
    });
  }

  const handleApply = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND}/clubs/apply/${id}`, {
      method: "post",
      body: JSON.stringify({
        userId: user.id,
        clubId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    .then(res => res.json())
    .then(res => {
      console.log(res.msg);
      toast("application successful");
      setIsApplied(true);
    })
  };

  useEffect(() => {
    fetchClubDetails();

    if (isLogin) {
      checkAppliedClub();
    }
  }, [id, isLogin])

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <>
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Club Details</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Application Information</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Title</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{clubDetails.title}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {clubDetails.about}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Registration Fee</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{"$" + clubDetails.registrationFee}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Last Year Active Members</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{clubDetails.lastYearActiveMembers}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Contact Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{clubDetails.contactPersonName}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{clubDetails.contactPersonNumber}</dd>
            </div>
          </dl>
        </div>
        <div className="flex flex-row justify-evenly mx-5 my-3">
          <button
            type="button"
            className="group relative flex w-full justify-center max-w-md w-1/4 rounded-md mr-1 bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            type="button"
            className={
              isLogin && !isApplied ?
              "group relative flex w-full justify-center max-w-md w-1/4 rounded-md mr-1 bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              :
              "group relative flex w-full justify-center max-w-md w-1/4 rounded-md mr-1 bg-gray-400 py-2 px-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            }
            disabled={!isLogin}
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
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

export default ClubDetails;