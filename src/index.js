import { h, Component } from "preact";
import { Router } from "preact-router";
import { Link } from "preact-router/match";

import "tailwindcss/dist/tailwind.min.css";

// Code-splitting is automated for routes
import Home from "./routes/home.js";
import Form from "./routes/form.js";

// Constants
const SEARCH = process.env.PREACT_APP_DATA_SOURCE;

export default class App extends Component {
   state = {
      results: {},
      isHomepage: true
   };

   handleRoute = e => {
      this.currentUrl = e.url;
      this.setState({ isHomepage: e.url === "/" });
   };

   componentDidMount() {
      fetch(
         `${SEARCH}?q=${Math.random()
            .toString(36)
            .split(".")}`
      )
         .then(r => r.json())
         .then(json => {
            this.setState({
               results: json,
               resultBkp: json
            });
         });
   }

   render(props, { isHomepage, results }) {
      return (
         <div id="app" class="px-5 max-w-screen-md mx-auto">
            <nav class="flex justify-center md:justify-end items-center">
               {isHomepage ? null : (
                  <Link class="m-5 text-blue-500 hover:text-blue-800" href="/">
                     Ritorna alla ricerca
                  </Link>
               )}
               {isHomepage ? (
                  <Link
                     class="m-5 bg-blue-500 inline-block hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
                     href="/form"
                  >
                     Aggiungi un'attività
                  </Link>
               ) : null}
            </nav>
            <h1 class="font-sans text-4xl md:text-5xl lg:text-6xl pt-10 text-gray-800 text-center capitalize">
               <span
                  class="block sm:inline-block"
                  role="img"
                  aria-label="biker"
               >
                  🚴
               </span>
               {`${process.env.PREACT_APP_CITY} a Domicilio`}
            </h1>
            <Router onChange={this.handleRoute}>
               <Home path="/" results={results} />
               <Form path="/form" />
            </Router>
         </div>
      );
   }
}
