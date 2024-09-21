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
import 'bootstrap/dist/css/bootstrap.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});

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
      <div>
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
                  path="/draft"
                  element={<Draft 
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
