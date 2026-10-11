import configs from '@/configs';
import Axios from 'axios';

const CreateAxiosInstance = () => {
    const instance = Axios.create({
        baseURL: configs.API_ENDPOINT + '/api', 
    });

    return instance;
}

export default CreateAxiosInstance;