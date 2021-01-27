import React, { createContext, useContext, useReducer } from 'react'
import restAPIs from '@app/utils/apis';
import { DisasterCenter } from '@app/models/disaster-center';
import { Shelter } from '@app/models/shelter';

const ShelterContext = React.createContext();

const initialState = {
    shelters: [],
    loading: false,
    errorsExist: false,
    viewport: null,
    dCenterError: null
};

// Based on the action type, the reducer returns a new state object
const dashboardStateReducer = (state, action) => {

    switch (action.type) {
      case "GET_DISASTER_CENTER_REQUEST":
        return {
          ...state,
          loading: true
        };
      case "GET_DISASTER_CENTER_SUCCESS":
        return {
          ...state,
          disasterCenter: action.payload,
          viewport: {
            latitude: action.payload.lat,
            longitude: action.payload.lon,
            zoom: action.payload.zoom,
            bearing: 0,
            pitch: 0
          }
        };
      case "GET_DISASTER_CENTER_FAILURE":
        return {
            ...state,
            disasterCenter: {},
            loading: false,
            dCenterError: action.error,
            errorsExist: true
        };
      case "GET_SHELTERS_REQUEST":
         return {
            ...state,
          };
          case "GET_SHELTERS_SUCCESS":
            return {
              ...state,
              shelters: action.payload,
              loading: false
         };
      case "GET_SHELTERS_FAILURE":
         return {
            ...state,
            loading: false,
            dCenterError: action.error,
            errorsExist: true
          };
      default:
        const errorMessage = "dashboardReducer: invoked with unknown action: "+action.type;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
}

function ShelterProvider(props) {
    const [state, dispatch] = React.useReducer(dashboardStateReducer, initialState);
    const value = React.useMemo(() => [state, dispatch], [state])
    return <ShelterContext.Provider value={value} {...props} />
}

const getDisasterCenter = (dispatch) => {
  dispatch({
    type: "GET_DISASTER_CENTER_REQUEST"
  })
  restAPIs.mock.disaster.center()
    .then(resp => {
      const dCenter: DisasterCenter = resp.data;
      console.log("getDisasterCenter() name = "+dCenter.name);
      dispatch({
        type: "GET_DISASTER_CENTER_SUCCESS",
        payload: dCenter
      })

      // Now that async response with disastercenter has returned, retrieve shelters 
      getShelters(dispatch);
      
    })
    .catch(err => {
      dispatch({
        type: "GET_DISASTER_CENTER_FAILURE",
        errorMessage: err
      })
    });
}
  
const getShelters = (dispatch) => {
  dispatch({
    type: "GET_SHELTERS_REQUEST"
  })
  restAPIs.mock.disaster.shelters()
    .then(resp => {
      const sPayload = resp.data;
      if (sPayload.length > 0 && sPayload[0].id !== undefined) {
        console.log("getShelters() # of shelters = " + sPayload.length);
        dispatch({
          type: "GET_SHELTERS_SUCCESS",
          payload: sPayload
        })
      } else {
        const eMessage = "getShelters() unknown response: \n\t" + resp.data;
        console.log(eMessage);
        dispatch({
          type: "GET_SHELTERS_FAILURE",
          errorMessage: eMessage
        })
      }
    })
    .catch(err => {
      dispatch({
        type: "GET_SHELTERS_FAILURE",
        errorMessage: err
      })
    });
}

function useShelter() {
    const context = useContext(ShelterContext);
    if (!context) {
        throw new Error("useShelter must be used within a ShelterProvider");
    }
    const [state, dispatch] = context

    return {
        state,
        dispatch,
        getDisasterCenter
    }
}

export {ShelterProvider, useShelter}
