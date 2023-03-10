import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from '../hooks';
import { selectLogin, selectUser } from '../slices/loginSlice';

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
    await fetch(`http://localhost:5000/clubs/details/${id}`, { 
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
    await fetch(`http://localhost:5000/clubs/status/${id}?userId=${user.id}`, {
      method: "get",
      credentials: "include",
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      setIsApplied(res.isApplied);
    });
  }

  const handleApply = async () => {
    await fetch(`http://localhost:5000/clubs/apply/${id}`, {
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
      setIsApplied(true);
    })
  };

  useEffect(() => {
    fetchClubDetails();

    if (isLogin) {
      checkAppliedClub();
    }
  }, [id])

  const handleBack = () => {
    navigate(-1);
  }

  return (
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
  )
};

export default ClubDetails;