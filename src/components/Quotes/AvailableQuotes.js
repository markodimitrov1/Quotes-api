import React from "react";
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
    console.log("Loading.. " + newQuotes);
    const fetchQuotes = async () => {
      const response = await fetch(
        //"https://type.fit/api/quotes"
        "https://zenquotes.io/api/quotes"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedQuotes = [];

      for (const key in responseData) {
        let author = JSON.stringify(responseData[key].a);
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

        loadedQuotes.push({
          id: key, //responseData[key].c,
          quote: responseData[key].q, //text,
          author: responseData[key].a, //author,
          flag: flag,
        });
        //if (key > 0) break;
      }

      setQuotes(loadedQuotes);
      setIsLoading(false);
    };

    fetchQuotes().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [newQuotes]);

  const NewQuotes = () => {
    setNewQuotes(!newQuotes);
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

  const quotesList = quotes.map((quote) => (
    <QuoteItem
      key={quote.id}
      id={quote.id}
      quote={quote.quote}
      author={quote.author}
      flag={quote.flag}
    />
  ));

  return (
    <section className={classes.quotes}>
      <Card>
        <div className={classes.button}>
          <button onClick={NewQuotes}>New Quotes</button>
          <button>
            <NavLink to="/quote" className={classes.nvlink}>
              Random Quote
            </NavLink>
          </button>
        </div>
        <table>{quotesList}</table>
      </Card>
    </section>
  );
};

export default AvailableQuotes;
