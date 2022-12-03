import Card from "../UI/Card";
import React from "react";
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
    console.log("Loading.. " + newQuote);
    const fetchQuotes = async () => {
      const response = await fetch("https://zenquotes.io/api/random");

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      let author = JSON.stringify(responseData[0].a);
      author = author.split(" ")[0];
      const response1 = await fetch(
        `https://api.nationalize.io?name=${author}`
      );
      const responseFlag = await response1.json();
      let nat = JSON.stringify(responseFlag.country[0].country_id);
      let flag;
      if (nat.length === 2) flag = `https://flagsapi.com/${nat}/shiny/64.png`;
      //responseFlag.country[1].country_id;
      else
        flag =
          "https://upload.wikimedia.org/wikipedia/commons/3/3a/Globe_Flag.png";

      const loadedQuote = {
        id: responseData[0].c,
        quote: responseData[0].text,
        author: responseData[0].author,
        flag: flag,
      };
      setQuotes(loadedQuote);
      setIsLoading(false);
    };

    fetchQuotes().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [newQuote]);

  const NewQuotes = () => {
    setNewQuote(++newQuote);
  };

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
          <QuoteItem
            key={quotes.id}
            id={quotes.id}
            quote={quotes.quote}
            author={quotes.author}
            flag={quotes.flag}
          />
        </table>
      </Card>
    </section>
  );
};

export default RandomQuote;
