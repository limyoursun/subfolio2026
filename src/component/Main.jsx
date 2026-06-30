import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

// import style
import style from "./Main.module.css";

// import main image
import img_main_1 from "../assets/images/img_main_1.webp";
import img_main_2 from "../assets/images/img_main_2.webp";
import img_main_3 from "../assets/images/img_main_3.webp";

gsap.registerPlugin(ScrollTrigger);

function Main() {
  const trailRef = useRef(null);

  useEffect(() => {
    gsap.matchMedia().add("(min-width: 1025px)", () => {
      gsap.fromTo("h1 > *", {rotateX: 90, duration: 1, stagger: 0.1}, {rotateX: 0, opacity: 1, delay: 0.2, duration: 1, stagger: 0.1});
      function mainGsap(target, rotate, targetX, targetY, delay) {
        gsap.from(target, {
          duration: 0.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#Main",
            start: "top top",
            onEnter: () => gsap.to(target, {rotate: rotate, x: targetX, y: targetY, duration: 0.5, delay: delay}),
            onLeaveBack: () => gsap.to(target, {rotate: 0, x: 0, y: 0, duration: 0.5}),
          },
        });
      }
      mainGsap(".mainL", -50, -150, 110, 0.4);
      mainGsap(".mainI", -160, -190, -180, 0.2);
      mainGsap(".mainM", -40, -100, -200, 0.15);
      mainGsap(".mainS", 40, 100, -300, 0.15);
      mainGsap(".mainU", 30, 100, -250, 0.22);
      mainGsap(".mainN", 60, 250, 100, 0.3);

      gsap.from(".triangle_top", {
        duration: 0.1,
        scrollTrigger: {
          trigger: "#Main",
          start: "top top",
          onEnter: () => {
            gsap.to(".Main p", { y: -399, opacity: 0, duration: 0.1 });
            gsap.to(".triangle_top", { y: -399, duration: 0.5 });
          },
          onLeaveBack: () => {
            gsap.to(".Main p", { y: 0, opacity: 1, duration: 0.1 });
            gsap.to(".triangle_top", { y: 0, duration: 0.5 });
          },
        },
      });
      gsap.from("h1 > div", {
        duration: 0.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#Main",
          start: "top top",
          onEnter: () => gsap.to("h1 > div", {rotate: 10, x: 40, y: 50, duration: 0.5, delay: 0.1}),
          onLeaveBack: () => gsap.to("h1 > div", {rotate: 0, x: 0, y: 0, duration: 0.5}),
        },
      });
    })

    // Image Trail
    const trail = trailRef.current;
    const settings = {isEnabled: false, count: 1, time: 100};
    const basePath = import.meta.env.BASE_URL;
    const images = [
      `${basePath}mouse/img_main_ (1).png`,
      `${basePath}mouse/img_main_ (2).png`,
      `${basePath}mouse/img_main_ (3).png`,
      `${basePath}mouse/img_main_ (4).png`,
      `${basePath}mouse/img_main_ (5).png`,
      `${basePath}mouse/img_main_ (6).png`,
      `${basePath}mouse/img_main_ (7).png`,
      `${basePath}mouse/img_main_ (8).png`,
      `${basePath}mouse/img_main_ (9).png`,
    ];

    const preloadImages = () => {
      for (let i = 0; i < images.length; i++) {
        let link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = images[i];
        document.head.appendChild(link);
      }
    };

    const calcIndex = (length) => {
      settings.count++;
      if (settings.count === length) settings.count = 0;
      return settings.count;
    };

    const animateImages = (event) => {
      const image = document.createElement("img");
      const imageSize = 14;
      const countIndex = calcIndex(images.length);
      const trailRect = trail.getBoundingClientRect();

      image.classList.add("trail_media");
      image.setAttribute("src", images[countIndex]);
      image.style.width = `${imageSize}rem`;
      image.style.height = `${imageSize}rem`;
      image.style.left = `${event.clientX - trailRect.left - imageSize * 5}px`;
      image.style.top = `${event.clientY - trailRect.top - imageSize * 5}px`;
      trail.appendChild(image);
      setTimeout(() => (image.style.opacity = "1"), 200);
      setTimeout(() => (image.style.opacity = "0"), 200);
      setTimeout(() => trail.removeChild(image), 2500);
    };

    const handleMouseMove = (event) => {
      if (!settings.isEnabled) {
        settings.isEnabled = true;
        setTimeout(() => {
          settings.isEnabled = false;
        }, settings.time);
        animateImages(event);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    preloadImages();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section id="Main" className={style.wrap}>
      <article ref={trailRef} className="trail"></article>
      <h1>
        <span className="mainL">L</span>
        <span className="mainI">i</span>
        <span className="mainM font_point">M</span>
        <div>
          <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]}>
            <SwiperSlide><img src={img_main_1} alt="카드 이미지"/></SwiperSlide>
            <SwiperSlide><img src={img_main_2} alt="카드 이미지"/></SwiperSlide>
            <SwiperSlide><img src={img_main_3} alt="카드 이미지"/></SwiperSlide>
          </Swiper>
        </div>
        <span className="mainS">S</span>
        <span className="mainU">U</span>
        <span className="mainN font_point">N</span>
      </h1>
      <div className="triangle_top" aria-hidden="true"></div>
    </section>
  );
}

export default Main;
