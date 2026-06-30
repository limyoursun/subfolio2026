// import component
import Main from "./../component/Main";
import Introduce from "./../component/Introduce";
import Work from "../component/Work";
import Cv from "./../component/Cv";
import Side from "../component/Side";

function Home() {
  return (
    <>
      <Main />
      <Introduce/>
      <Work />
      <div className="flow">
        <div>
          <span>TO GET MORE Event PROJECT</span>
          <span>TO GET MORE Event PROJECT</span>
        </div>
      </div>
      <Side/>
      <Cv/>
    </>
  );
}
export default Home;
