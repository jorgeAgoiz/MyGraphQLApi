import express from "express";
import "dotenv/config";
import cors from "cors";
import schema from "./schema/index";
import { ApolloServer } from "apollo-server-express";
import ExpressPlaygroundMiddleware from "graphql-playground-middleware-express";

const app = express();
const server = new ApolloServer({
  schema,
  introspection: true,
});

app.use(cors());
server.applyMiddleware({ app });

app.get(
  "/",
  ExpressPlaygroundMiddleware({
    endpoint: "/graphql",
  }),
);

app.listen(process.env.PORT, () => {
  console.log(`Listening in port ${process.env.PORT}...`);
});
