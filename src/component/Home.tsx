import { ReactNode } from "react";
import NavBar from "./NavBar";

type HomeProp = {
  children: ReactNode
}

const Home = ({ children }: HomeProp) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  )
};

export default Home;