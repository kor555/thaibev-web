import type { User } from "@/types/User";
import CreateAxiosInstance from "./rest";

const API_GROUP = '/user'

async function SaveAndGetScore(payload: User) {
    const axiosInstance = CreateAxiosInstance()
    return await axiosInstance
        .post(API_GROUP + '/save', payload)
        .then((res) => res)
        .catch((err) => {
            console.log(err)
            return err;
        })
}

export default {
    SaveAndGetScore
}