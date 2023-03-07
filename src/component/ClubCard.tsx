import { UsersIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router';
import { Listing } from './ClubList';

type ClubProps = {
  listing: Listing
}

const ClubCard = ({listing}: ClubProps) => {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate("/clubdetails/" + listing.id);
  }

  return (
    <div 
      className="flex justify-center item-center mx-0.5 my-2"
      onClick={handleDetails}
    >
      <div
        className="block max-w-xl w-3/4 rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-700">
        <h3 className="mb-2 text-xl font-medium leading-tight mb-2 text-neutral-800 dark:text-neutral-50">
          {listing.name}
        </h3>
        <p className="mb-4 text-sm text-neutral-600 mb-1 dark:text-neutral-200">
          {listing.organizer}
        </p>
        <div className="flex flex-row-reverse w-full">
          <div className="flex justify-start w-20 px-2 mb-4 text-sm text-neutral-600 mb-0 dark:text-neutral-200">
            <span className="px-1">
              <UsersIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            <p className="w-full flex justify-center">
              {listing.members}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubCard;