import React from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// import style
import style from "./Cv.module.css";

gsap.registerPlugin(TextPlugin);

function Cv() {
  return (
    <section className={style.wrap}>
      <div>
        <div>
          더 많은
          <div className={style.scrolling}>
            <ul>
              <li style={{ color: "#ffcafd" }}>기본 이력</li>
              <li style={{ color: "#63dbff" }}>경력 활동</li>
              <li style={{ color: "#b5ff63" }}>프로젝트</li>
              <li style={{ color: "#ffda6e" }}>기술 스택</li>
              <li style={{ color: "#ffcafd" }}>기본 이력</li>
            </ul>
          </div>
          정보가 궁금하신가요?
        </div>
        <Link
          className="btn_arrow"
          to="https://www.rallit.com/resumes/1612631@limyoursun/%EC%9E%84%EC%84%A0"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="경력기술서 및 이력서 페이지로 이동"
        >
          <span>경력기술서 / 이력서로 이동</span>
          <span className="btn_arrow_icon" aria-hidden="true">
            이동 화살표
          </span>
        </Link>
      </div>
    </section>
  );
}

export default Cv;
