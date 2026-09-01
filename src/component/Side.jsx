import React, { useState, useEffect } from "react";

import Data from "../data/project.json";
import SideList from "../component/SideList";

import style from "./Side.module.css";

const baseUrl = `${import.meta.env.BASE_URL}images/`;
const sideProjects = Data.filter((work) => work.type === "side");
const firstProject = sideProjects[0];

function Side() {
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    sideProjects.forEach((work) => {
      new Image().src = `${baseUrl}img_${work.nameAbbr}_1.webp`;
      const bgMatch = work.bg[1].match(/url\(['"]?([^'")\s]+)['"]?\)/);
      if (bgMatch) new Image().src = bgMatch[1];
    });
  }, []);

  const handleHover = (project) => {
    setCurrent(project);
  };

  const extractBgImage = (bg) => {
    const urlMatch = bg.match(/url\([^)]+\)/);
    return urlMatch ? urlMatch[0] : bg;
  };

  const active = current || { nameAbbr: firstProject.nameAbbr, bg: firstProject.bg, images: firstProject.images };

  const bgStyle = { backgroundImage: extractBgImage(active.bg[1]), backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "cover" };

  const previewSrc = `${baseUrl}img_${active.nameAbbr}_1.webp`;

  const previewAlt = active.images?.[0]?.[1]
    || "이벤트 프로젝트의 미리보기 화면입니다.";

  return (
    <section className={style.wrap} style={bgStyle}>
      <div className="browser_frame">
        <div className="browser_bar">
          <span></span><span></span><span></span>
          <div className="browser_url"></div>
        </div>
        <img src={previewSrc} alt={previewAlt}/>
      </div>
      <ul>
        {sideProjects.map((work) => (
          <SideList
            key={work.nameAbbr}
            nameAbbr={work.nameAbbr}
            period={work.period}
            keyword={work.keyword}
            name={work.name}
            images={work.images}
            bg={work.bg}
            detail={work.detail}
            url={work.url}
            onHover={handleHover}
          />
        ))}
      </ul>
    </section>
  );
}

export default Side;
