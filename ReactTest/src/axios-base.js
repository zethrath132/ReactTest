import axios from 'axios';

const userInstance = axios.create(
  {
    baseURL: 'http://localhost:4200/api'
  }
);

//userInstance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default userInstance;
