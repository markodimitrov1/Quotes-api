import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import QuoteItem from "./QuoteItem/QuoteItem";
import classes from "./AvailableQuotes.module.css";
import { NavLink, Router } from "react-router-dom";

const AvailableQuotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [newQuotes, setNewQuotes] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      setQuotes(response.data);
    });
    setIsLoading(false);
    console.log("loadira  ")
  }, [newQuotes]);

  const NewQuote = () => {
    setNewQuotes(!newQuotes);
    console.log("Kopce");
  };

  if (isLoading) {
    return (
      <section className={classes.QuotesLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  // if (httpError) {
  //   return (
  //     <section className={classes.QuotesError}>
  //       <p>{httpError}</p>
  //     </section>
  //   );
  // }

  const quotesList = quotes.map((quote) => (
    <QuoteItem
      key={quote._id}
      id={quote.oip}
      quote={quote.quote}
      author={quote.author}
      flag={quote.flag}
    />
  ));

  return (
    <section className={classes.quotes}>
      <Card>
        <div className={classes.button}>
          <button onClick={NewQuote}>New Quotes</button>
          <button>
            <NavLink to="/quote" className={classes.nvlink}>
              Random Quote
            </NavLink>
          </button>
        </div>
        <table><tbody>{quotesList}</tbody></table>
      </Card>
    </section>
  );
};

export default AvailableQuotes;
