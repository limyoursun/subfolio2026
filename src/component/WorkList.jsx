import React from "react";
import { Link } from "react-router-dom";

// import style
import style from "./WorkList.module.css";

function WorkList({ client, nameAbbr, name, description, images, bg, detail, url }) {
  return (
    <li>
      <div className={style.main} style={{background: `${bg[1]}`}}>
        <span>{client}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{name}</span>
        <div className={`${style.info} info_wrap`}>
          <div>
            <span>{client}</span>
            <h2>{name}</h2>
            {detail === false
            ? url && <a href={url} target="_blank" rel="noopener noreferrer">프로젝트 상세보기</a>
            : <Link to={`work/${nameAbbr}`}>프로젝트 상세보기</Link>
          }
          </div>
          <p>{description}</p>
        </div>
        <div className={style.image}>
          {images.slice(0, 3).map((image, index) =>
            image[0] && (
              index === 0 ? (
                <div key={index} className={`image_${index + 1} browser_frame`}>
                  <div className="browser_bar">
                    <span></span><span></span><span></span>
                    <div className="browser_url"></div>
                  </div>
                  <img
                    src={`${import.meta.env.BASE_URL}images/img_${nameAbbr}_${index + 1}.webp`}
                    alt={image[1]}
                  />
                </div>
              ) : (
                <img
                  key={index}
                  className={`image_${index + 1}`}
                  src={`${import.meta.env.BASE_URL}images/img_${nameAbbr}_${index + 1}.webp`}
                  alt={image[1]}
                />
              )
            )
          )}
        </div>
      </div>
    </li>
  );
}

export default WorkList;
