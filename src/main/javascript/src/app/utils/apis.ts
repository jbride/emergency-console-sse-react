import axios from 'axios';
import { Incident } from '@app/models/incident';

// What is special about this "default" object in that it doesn't need to be referenced by clients ?
export default {
    mock: {
        incident: {
          all: () => {
            const url= "/mock/incident/all";
            return axios.get<Incident[]>(url);
          },
          byId: (incidentId: String) => {
            const url = "mock/incident/byId/"+incidentId;
            return axios.get<Incident>(url);
          }
        }
    },
    responder: {
        total: () => {
            const url = 'responder/stats';
            return axios.get(url);
        }
    },
    incident: {
      all: () => {
        const url = "incident/all";
        return axios.get<Incident[]>(url);
      }
    }
}