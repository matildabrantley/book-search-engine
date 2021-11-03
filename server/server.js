const express = require('express');
//const { typeDefs, resolvers } = require('./schemas');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

//toggle to use GraphQL or REST API
let usingApolloServer = false;
if (usingApolloServer) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  apolloServer.applyMiddleware({ app });
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//If using apolloServer, don't use routes.
if (usingApolloServer){
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}
else 
  app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});