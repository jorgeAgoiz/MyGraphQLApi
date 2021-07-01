import { IResolvers } from "graphql-tools";
import fetch from "node-fetch";
import "dotenv/config";
import { Team } from "../types";
const apiKey: any = process.env.API_KEY_NBA;
const apiHost: any = process.env.API_NBA_HOST;

const query: IResolvers = {
  Query: {
    teams(): any {
      const response: Promise<Array<Team>> = fetch(
        "https://free-nba.p.rapidapi.com/teams",
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": `${apiKey}`,
            "x-rapidapi-host": `${apiHost}`,
          },
        },
      )
        .then((res) => res.json())
        .then((results) => results.data)
        .catch((error) => {
          console.log(error);
        });
      return response;
    },
    players(__: void, { page }): any {
      const response = fetch(
        `https://free-nba.p.rapidapi.com/players?per_page=50&page=${page}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": `${apiKey}`,
            "x-rapidapi-host": `${apiHost}`,
          },
        },
      )
        .then((res) => res.json())
        .then((results) => results.data)
        .catch(
          (error) => {
            console.log(error);
          },
        );
      return response;
    },
  },
};

export default query;
