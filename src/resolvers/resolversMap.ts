import query from "./query";
import { IResolvers } from "graphql-tools";

const resolversMap: IResolvers = {
  ...query,
};

export default resolversMap;
