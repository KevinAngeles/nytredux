import React from 'react';

// Import sub-components
import Saved from "../containers/Saved/Saved";
import Search from "../containers/Search/Search";
import Results from "../containers/Results/Results";
import NavHeader from "./NavHeader/NavHeader";

const Main = () => (
  <div>
    <NavHeader/>
    <div className="container">
      <Search/>
      <Results/>
      <Saved/>
    </div>
  </div>
);

export default Main;