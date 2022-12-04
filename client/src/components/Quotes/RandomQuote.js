import Card from "../UI/Card";
import React from "react";
import Axios from "axios";
import classes from "./AvailableQuotes.module.css";
import { useEffect, useState } from "react";
import { NavLink, Router } from "react-router-dom";
import QuoteItem from "./QuoteItem/QuoteItem";

const RandomQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  var [newQuote, setNewQuote] = useState(0);

  useEffect(() => {
    const fetchQuotes = async () => {
      const response = await Axios.get("http://localhost:3001/random");
      setQuotes(await response.data[0]);
    };
    fetchQuotes().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    setIsLoading(false);
  }, [newQuote]);

  const NewQuotes = () => {
    setNewQuote(++newQuote);
  };

  const quotesList = (
    <QuoteItem
      key={quotes.oip}
      id={quotes.oip}
      quote={quotes.quote}
      author={quotes.author}
      flag={quotes.flag}
    />
  );

  if (isLoading) {
    return (
      <section className={classes.QuotesLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.QuotesError}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.quotes}>
      <Card>
        <div className={classes.button}>
          <button>
            <NavLink to="/" className={classes.nvlink}>
              Back to Quotes
            </NavLink>
          </button>
          <button onClick={NewQuotes}>New Random Quote</button>
        </div>
        <table>
          <tbody>{quotesList}</tbody>
        </table>
      </Card>
    </section>
  );
};

export default RandomQuote;
