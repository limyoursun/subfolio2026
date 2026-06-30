import { useParams } from "react-router-dom";

import Data from "../data/project.json";
import Project from "../component/Project";

function Detail() {
  const { id } = useParams();
  const work = Data.find((item) => item.nameAbbr === id);

  if (!work) return null;

  return <Project key={work.nameAbbr} {...work} />;
}
export default Detail;
