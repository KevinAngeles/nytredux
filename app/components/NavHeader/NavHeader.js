// Include React
const React = require("react");
import { getDateNewsFormat } from "../../utils";

const Results = () => {
	return (
    <nav id="navHeader">
      <h1 id="pageTitle">New York Times Article Scrubber</h1>
      <h2 id="pageSubTitle">AUSTIN, TX - {getDateNewsFormat()} - Search for and anotate articles of interest</h2>
    </nav>
  );
}

export default Results;
