import { axiosClient } from "../../../Api/axios";

export const ParentApi = {

    create: async (payload) => {
        return await axiosClient.post('/admin/parents', payload)
    }


};
