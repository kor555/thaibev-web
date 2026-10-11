import type { QuestionIDList } from "@/types/Question";
import CreateAxiosInstance from "./rest";

const API_GROUP = '/question'

async function GetAllQuestions() {
    const axiosInstance = CreateAxiosInstance()
    return await axiosInstance
        .get(API_GROUP)
        .then((res) => res)
        .catch((err) => {
            console.log(err)
            return err;
        })
}

async function GetQuestionsByIDList(idList: QuestionIDList) {
    const axiosInstance = CreateAxiosInstance()
    return await axiosInstance
        .post(API_GROUP + 'getQuestionsbyIDList')
        .then((res) => res)
        .catch((err) => {
            console.log(err)
            return err;
        })
}

export default {
    GetAllQuestions,
    GetQuestionsByIDList
}