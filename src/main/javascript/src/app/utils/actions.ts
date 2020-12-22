import restAPIs from '@app/utils/apis';
import {
    INCIDENT_LIST_FETCHING,
    INCIDENT_LIST_FETCH_SUCCESS,
    INCIDENT_LIST_FETCH_ERROR
} from '@app/models/actions';

export function incidentsListFetch() {
    console.log("incidentsListFetch() about to invoke");
    return dispatch => {
        dispatch({ type: INCIDENT_LIST_FETCHING });
        return restAPIs.incidents.all()
            .then(resp => {
                console.log("incidentsListFetch() data = "+resp.data);
                return dispatch({ type: INCIDENT_LIST_FETCH_SUCCESS, list: resp.data });
            })
            .catch(err => {
                console.log("incidentsListFetch() error = "+err);
                return dispatch({ type: INCIDENT_LIST_FETCH_ERROR, serverErrors: err })
            }).then(() => {
               console.log("incidentsListFetch() This is always executed.");
            }
        );
    }
}




