import React from "react";
import classes from "./QuoteItem.module.css";

const QuoteItem = (props) => {
  let id = Number(props.id) + 1;

  return (
    <tr>
      <td className={classes.id}>{id}</td>
      <td className={classes.quote}>{props.quote}</td>
      <td className={classes.author}>{props.author}</td>
      <td className={classes.img}>
        <img src={props.flag} alt="zname"/>
      </td>
    </tr>
  );
};

export default QuoteItem;
