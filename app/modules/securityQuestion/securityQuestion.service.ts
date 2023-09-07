import securityQuestionRepo from "./securityQuestion.repo";
import { securityQuestionResponse } from "./securityQuestion.responses";
import { ISecurityQuestion } from "./securityQuestion.types";

const getAllQuestions = async () => {
  try {
    const questions = await securityQuestionRepo.getAll();
    return questions;
  } catch (err) {
    throw securityQuestionResponse.SECURITY_QUESTION_NOT_FOUND;
  }
};

const createQuestion = async (data: ISecurityQuestion) => {
  try {
    await securityQuestionRepo.create(data);
    return securityQuestionResponse.SECURITY_QUESTION_CREATED;
  } catch (err) {
    throw securityQuestionResponse.SECURITY_QUESTION_NOT_CREATED;
  }
};

const getOneById = async (id: string) => {
  try {
    const question = await securityQuestionRepo.getOneById(id);
    return question;
  } catch (err) {
    throw securityQuestionResponse.SECURITY_QUESTION_NOT_FOUND;
  }
};

export default {
  getAllQuestions,
  createQuestion,
  getOneById,
};
