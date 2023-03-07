import ClubCard from "./ClubCard";

export type Listing = {
  id: number,
  name: string,
  organizer: string,
  members: number
};

interface ClubListProp {
  listings?: Listing[]
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

const ClubList = ({listings = defaultListings}: ClubListProp) => {
    return (
      <div className="flex flex-col h-full bg-white item-center overflow-auto">
        {
          listings.map((listing) => (
            <ClubCard 
              listing={listing}
            />
          ))
        }
      </div>
    )
};

export default ClubList;