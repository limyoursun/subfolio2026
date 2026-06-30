import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// import style
import style from "./Introduce.module.css";

gsap.registerPlugin(ScrollTrigger);

function Introduce() {
  useEffect(() => {
    const matchMedia = gsap.matchMedia();
    matchMedia.add("(min-width: 1025px)", () => {
      gsap.from(".intro", {
        duration: 0.1,
        scrollTrigger: {
          trigger: "#Main",
          start: "top top",
          onEnter: () => gsap.to(".intro", { y: -185, duration: 0.5 }),
          onLeaveBack: () => gsap.to(".intro", { y: 0, duration: 0.2 }),
        },
      });
      gsap.to(".intro_text", {
        scrollTrigger: {
          trigger: "#Main",
          start: "top top",
          onEnter: () =>
            gsap.to(".intro_text", {
              text: "반갑습니다!",
              delay: 0.5,
              duration: 1,
              stagger: 0.2,
            }),
          onLeaveBack: () =>
            gsap.to(".intro_text", {
              text: "안녕하세요!",
              delay: 0.5,
              duration: 1,
              stagger: 0.2,
            }),
        },
      });
    });
    return () => matchMedia.revert();
  }, []);
  return (
    <section className={style.wrap}>
      <div className="intro">
        <p className="intro_text">안녕하세요!</p>
        <p>웹을 만드는 임선입니다.</p>
        <br />
        <br className="m_con" />
        <p>마크업에서 출발해 React, Next.js로 <br className="m_con" />영역을 넓혀가는 중입니다.</p>
        <p>
          재미있는 웹 앞에서 주책맞게 <br className="m_con" />
          두근대는 심장💘이 제 원동력입니다.
        </p>
        <br />
        <br className="m_con" />
        <p>
          기록하는 일에 즐거움을 느끼며, <br className="m_con" />
          기록을 바탕으로 나은 결과를 만들고자 항상 노력합니다.
        </p>
        <br className="m_con" />
        <br className="m_con" />
        <p>멋진 협업으로 함께 성장하는 즐거움을 느끼고 싶습니다!</p>
      </div>
    </section>
  );
}

export default Introduce;
