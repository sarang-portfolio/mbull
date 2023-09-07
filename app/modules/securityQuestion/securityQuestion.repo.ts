import { securityQuestionModel } from "./securityQuestion.schema";
import { ISecurityQuestion } from "./securityQuestion.types";

const getAll = () =>
  securityQuestionModel.aggregate([
    {
      $match: {
        isDeleted: false,
      },
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $project: {
        question: 1,
      },
    },
  ]);

const getOneById = (id: string) => securityQuestionModel.findById(id);

const create = (data: ISecurityQuestion) => securityQuestionModel.create(data);

export default {
  getAll,
  create,
  getOneById,
};
