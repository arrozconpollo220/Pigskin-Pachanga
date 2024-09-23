import './App.css';
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Footer from './components/Footer';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Headers from './components/Headers';
import Dashboard from './pages/Dashboard'
import Draft from './pages/Draft'
import Matchup from './pages/Matchup';
import 'bootstrap/dist/css/bootstrap.css';

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' ? 'https://pigskin-pachanga.up.railway.app/graphql' : 'http://localhost:3001/graphql'
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registered: ', registration);
      }).catch(registrationError => {
        console.log('ServiceWorker registration failed: ', registrationError);
      });
  });
}

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <video
          autoPlay
          muted
          className="background-video"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1
          }}
        >
          <source src="/football-bg.mp4" type="video/mp4" />
        </video>
        <Router>
          <div>
            <Headers />
            <main className="mx-3">
              <Routes>
                <Route
                  path="/"
                  element={<Home
                  // email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} 
                  />}
                />
                <Route
                  path="/signup"
                  element={<SignUp
                  // setLoggedIn={setLoggedIn} setEmail={setEmail} 
                  />}
                />
                <Route
                  path="/dashboard"
                  element={<Dashboard
                  // setLoggedIn={setLoggedIn} setEmail={setEmail} 
                  />}
                />
                <Route
                  path="/draft"
                  element={<Draft
                  // setLoggedIn={setLoggedIn} setEmail={setEmail} 
                  />}
                />
                <Route
                  path="/matchup"
                  element={<Matchup
                  // setLoggedIn={setLoggedIn} setEmail={setEmail} 
                  />}
                />
                <Route
                  path="/login"
                  element={<Login
                  // setLoggedIn={setLoggedIn} setEmail={setEmail} 
                  />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;