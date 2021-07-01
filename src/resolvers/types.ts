import { IResolvers } from "graphql-tools";

const type: IResolvers = {
  Estudiante: {
    courses: (parent: any) => {
    },
  },
  Course: {
    students: (parent) => {
    },
    path: (parent) => {},
  },
};

export default type;
