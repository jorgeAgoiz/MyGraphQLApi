import { IResolvers } from "graphql-tools";
import fetch from "node-fetch";
import "dotenv/config";
import { Team } from "../types";
const apiKey: any = process.env.API_KEY_NBA;
const apiHost: any = process.env.API_NBA_HOST;

const query: IResolvers = {
  Query: {
    teams(): any { // Select all teams
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
    team(__: void, { id }): any { // Select a specific team with the ID
      const response: Promise<Team> = fetch(
        `https://free-nba.p.rapidapi.com/teams/${id}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": `${apiKey}`,
            "x-rapidapi-host": `${apiHost}`,
          },
        },
      )
        .then((res) => res.json())
        .then((results) => {
          return results;
        })
        .catch(
          (error) => {
            console.log(error);
          },
        );
      return response;
    },
    players(__: void, { page }): any { // Select all player but you must pass the page parameter
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
    player(__: void, { id }): any {
      const response = fetch(
        `https://free-nba.p.rapidapi.com/players/${id}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": `${apiKey}`,
            "x-rapidapi-host": `${apiHost}`,
          },
        },
      )
        .then((res) => res.json())
        .then((results) => results)
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
