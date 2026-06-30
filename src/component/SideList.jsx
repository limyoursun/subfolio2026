import React from "react";
import { Link } from "react-router-dom";

function SideList({name, nameAbbr, keyword, period, images, bg, detail, url, onHover}) {
  const inner = (
    <>
      <span>{period}</span>
      <ul>
        {keyword.map((kw, index) =>
          <li key={index}>&nbsp;{kw}</li>
        )}
      </ul>
      <div><h4>{name}</h4><p aria-hidden="true">{name}</p></div>
    </>
  );

  const wrapper = (detail === false)
    ? url
      ? <a href={url} target="_blank" rel="noopener noreferrer">{inner}</a>
      : <div>{inner}</div>
    : <Link to={`work/${nameAbbr}`}>{inner}</Link>;

  return (
    <li
      onMouseEnter={() => onHover({ nameAbbr, bg, images })}
      onMouseLeave={() => onHover(null)}>
      {wrapper}
    </li>
  );
}

export default SideList;
