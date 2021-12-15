import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

// Create a server:
const app = express();

// Create a schema and a root resolver:
const schema = buildSchema(/* GraphQL */ `
  type Book {
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
  }
`);

const rootValue = {
  books: [
    {
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
    },
    {
      title: "The Wise Man's Fear",
      author: 'Patrick Rothfuss',
    },
  ],
};

// Use those to handle incoming requests:
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

// Start the server:
app.listen(4000, () => console.log('Server started on port 4000'));
