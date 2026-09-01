import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

/* style */
import style from "./Project.module.css";

const baseUrl = `${import.meta.env.BASE_URL}images/`;
gsap.registerPlugin(ScrollTrigger, SplitType);

const escHtml = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const KEYWORDS = new Set(["export","function","return","const","let","var","if","else","await","async","import","from","new","typeof","this"]);
const BOOLEANS = new Set(["true","false","null","undefined"]);

function highlightCode(code) {
  const t = [];
  let i = 0;
  while (i < code.length) {
    if (code[i] === "/" && code[i+1] === "/") {
      let e = code.indexOf("\n", i); if (e === -1) e = code.length;
      t.push(`<span class="hl-cm">${escHtml(code.slice(i, e))}</span>`);
      i = e;
    } else if (code[i] === '"' || code[i] === "'" || code[i] === "`") {
      const q = code[i]; let j = i + 1;
      while (j < code.length && code[j] !== q) { if (code[j] === "\\") j++; j++; }
      t.push(`<span class="hl-str">${escHtml(code.slice(i, j + 1))}</span>`);
      i = j + 1;
    } else if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const w = code.slice(i, j);
      if (KEYWORDS.has(w)) t.push(`<span class="hl-kw">${w}</span>`);
      else if (BOOLEANS.has(w)) t.push(`<span class="hl-bool">${w}</span>`);
      else t.push(`<span class="hl-id">${escHtml(w)}</span>`);
      i = j;
    } else if (/[0-9]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[0-9.]/.test(code[j])) j++;
      t.push(`<span class="hl-num">${code.slice(i, j)}</span>`);
      i = j;
    } else {
      t.push(escHtml(code[i]));
      i++;
    }
  }
  return t.join("");
}

function Project({nameAbbr, bg, summary, client, period, keyword, name, url, duties, story, images, code}) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const detailRef = useRef(null);

  useEffect(() => {
    const ourText = new SplitType("span.tit", { types: "chars" });
    const chars = ourText.chars;
    gsap.fromTo(chars, { y: 200, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.03, duration: 1, ease: "power4.out"});
    gsap.fromTo(".img_tit", {width: "0", height: "0"},{width: "100%", height: "100%", duration: 1.3, delay: 0.2, ease: "back.inOut"});
    gsap.fromTo(".title_info > *", {y: 100, opacity: 0}, {y: 0, opacity: 1, stagger: 0.1, duration: 1.3, delay: 0.7, ease: "power4.inOut"});
    
    const checkImagesLoaded = () => {
      const imageElements = detailRef.current.querySelectorAll('img');
      const allLoaded = Array.from(imageElements).every(img => img.complete);
      return allLoaded;
    };

    const interval = setInterval(() => {
      if (checkImagesLoaded()) {
        setImagesLoaded(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    if (imagesLoaded) {
      function top_centered(num) {
        return "'top " + num + "%'";
      }
      gsap.to(".info_l", {
        scrollTrigger: {trigger: ".info_l", start: `${top_centered(13)} top`, end: "bottom bottom", scrub: 0.7, pin: true}});
      gsap.to(".screen_pin", {
        scrollTrigger: {trigger: ".screen_pin", start: `${top_centered(40)} center`, pin: true, scrub: 0.7,
        onEnter: () => {
            gsap.to(".screen_pin p", { "color": "#fff" });
            gsap.to(".screen>img:first-of-type", {"background":`${bg[1]}`, "transform":"scale(1.01)" });
          },
          onLeaveBack: () => {
            gsap.to(".screen_pin p", { "color": "transparent" });
            gsap.to(".screen>img:first-of-type", {"background":"#fff", "transform":"scale(1)" });
          },
        },
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.refresh();
    };
  }, [imagesLoaded]);

  return (
    <section className={style.wrap}>
      <div className={style.title} style={{background: `${bg[1]}`, backgroundSize: "cover"}}>
        <div className="img_tit" style={{background: `${bg[0]}`}} aria-hidden="true"></div>
        <h2>
          {name.split("").map((title, index) => (
            <span key={index} className="tit">{title}</span>
          ))}
        </h2>
        <div className={`${style.title_info} title_info`}>
          <div>
            <dl>
              <dt>Client</dt>
              <dd>{client}</dd>
              <dt>Period</dt>
              <dd>{period}</dd>
              <dt>Keyword</dt>
              <dd>
                {keyword.map((kw, index) => (
                  <div key={index}>{kw}</div>
                ))}
              </dd>
            </dl>
            {url ?
              <Link to={url} target="_blank" className="btn_arrow">
                <span>Go to the Site</span>
                <span className="btn_arrow_icon" aria-hidden="true">이동 화살표</span>
              </Link>
            :
            <></>
            }
          </div>
          <div><p>{summary}</p></div>
        </div>
      </div>
      <div ref={detailRef} className={`${style.info} detail`}>
        <div className="info_l">
          <ol>
            <li>
              <h4>Brief</h4>
              <p>&nbsp;{duties}</p>
            </li>
            <li>
              <h4>Story</h4>
              {story.map((paragraph, index) => (
                <p key={index}>&nbsp;{paragraph}</p>
              ))}
            </li>
          </ol>
        </div>
        <div>
          {images.slice(3, 6).map((img, index) => img[0] && (
            <div key={index} className="browser_frame">
              <div className="browser_bar">
                <span></span><span></span><span></span>
                <div className="browser_url"></div>
              </div>
              <img src={`${baseUrl}img_${nameAbbr}_${index + 1}.webp`} alt={img[1]} />
            </div>
          ))}
          {code && code.map((block, index) => (
            <div key={index} className={style.code_block}>
              <div className={style.code_header}>
                <span></span><span></span><span></span>
                <p>{block.title}</p>
              </div>
              <pre><code dangerouslySetInnerHTML={{ __html: highlightCode(block.content) }} /></pre>
            </div>
          ))}
        </div>
      </div>
      <div className={`${style.screen} screen`}>
        <div className="screen_pin">
          <div>
            <p>TO GET MORE Information</p>
            <p>프로젝트의 더 다양한 페이지 디자인을 확인하세요</p>
          </div>
        </div>
        <ul className={style.screen_wrap} style={{ "background": `${bg[0]}`}}>
          <li><img key={nameAbbr} src={`${baseUrl}img_${nameAbbr}_1.webp`} alt={images[0][1]}/></li>
        {images.slice(6, 9).map((img, index) => img[0] && (
          <li key={index}>
            <img src={`${baseUrl}img_${nameAbbr}_detail_${index + 1}.webp`} alt={img[1]} />
          </li>
        ))}
        </ul>
      </div>
    </section>
  );
}

export default Project;