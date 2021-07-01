import { IResolvers } from "graphql-tools";
import fetch from "node-fetch";
import "dotenv/config";
import { Player, Team } from "../types";
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
      if (id < 0 || id > 29) {
        return {
          id: -1,
          abbreviation: "Not exists",
          city: "Not Found",
          conference: " ",
          division: " ",
          full_name: " ",
          name: " ",
        };
      }

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
      if (page < 1 || page > 139) {
        return [{
          id: -1,
          first_name: "Page Not Found",
          height_feet: null,
          height_inches: null,
          last_name: "",
          position: null,
          team: null,
          weight_pounds: null,
        }];
      }

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
      const response: Promise<Player> = fetch(
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
