// src/Services/Api/AdminApi.js
import { axiosClient } from "../../Api/axios";
const AdminApi = {
    all: (params = {}) => axiosClient.get('/admin/users', { params: { ...params, role: 'admin' } }),
};
export default AdminApi;
// // src/Services/Api/ClassApi.js
// import { axiosClient } from "../../Api/axios";

// const getPrefix = (role) => (role === 'admin' ? '/admin' : (role === 'teacher' ? '/teacher' : ''));
// const ClassApi = {
//     getAll: ({ role, params = {} }) => axiosClient.get(`${getPrefix(role)}/classes`, { params }),
// };