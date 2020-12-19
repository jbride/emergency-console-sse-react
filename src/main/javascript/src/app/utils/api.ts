import { ApperIcon } from '@patternfly/react-icons';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

function responderApi(): AxiosInstance {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 10000,
    baseURL: process.env.RESPONDER_HOST
  }
  return axios.create(axiosConfig)
};

export default {
    responders: {
        total: () => {
            const url = 'responder/stats';
            return responderApi().get(url);
        }
    }
}