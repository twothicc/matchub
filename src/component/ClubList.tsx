import ClubCard from "./ClubCard";

export type Listing = {
  name: string,
  organizer: string,
  members: number
};

interface ClubListProp {
  listings?: Listing[]
};

const defaultListings = [
  {
    name: "Football Club",
    organizer: "Student Organization",
    members: 132
  },
  {
    name: "Math Society Club",
    organizer: "Faculty of Science and Math",
    members: 32
  },
  {
    name: "Programming Club",
    organizer: "Faculty of Computer Science",
    members: 97
  },
  {
    name: "Programming Club",
    organizer: "Faculty of Computer Science",
    members: 97
  },
  {
    name: "Programming Club",
    organizer: "Faculty of Computer Science",
    members: 97
  },
  {
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