import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../hooks';
import { selectLogin } from '../slices/loginSlice';

const ClubDetailsCard = () => {
  const isLogin = useAppSelector(selectLogin);
  const navigate = useNavigate();

  const [title, setTitle] = useState("Club");
  const [about, setAbout] = useState("This is a Club");
  const [registrationFee, setRegistrationFee] = useState(1);
  const [lastYearActiveMembers, setLastYearActiveMembers] = useState(1);
  const [contactName, setContactName] = useState("John Doe");
  const [contactNumber, setContactNumber] = useState("999");

  useEffect(() => {
    
  }, [])

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
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{title}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">About</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {about}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Registration Fee</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{"$" + registrationFee}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Last Year Active Members</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{lastYearActiveMembers}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Contact Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{contactName}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Contact Number</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{contactNumber}</dd>
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
            isLogin ?
            "group relative flex w-full justify-center max-w-md w-1/4 rounded-md mr-1 bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :
            "group relative flex w-full justify-center max-w-md w-1/4 rounded-md mr-1 bg-gray-400 py-2 px-3 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          }
          disabled={!isLogin}
        >
          Apply
        </button>
      </div>
    </div>
  )
};

export default ClubDetailsCard;