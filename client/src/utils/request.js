import axios from 'axios';

export default (options, requesOptions = {}) => {
  return axios(options);
};
