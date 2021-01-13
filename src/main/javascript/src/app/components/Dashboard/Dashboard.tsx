import React, { useState, useEffect, useReducer } from 'react';
import { PageSection, Title } from '@patternfly/react-core';

import ReactMapGL, { Marker } from 'react-map-gl';

import Axios from 'axios';

import { default as DrawStyles } from '@app/utils/draw-styles';
import { AppUtil } from '@app/utils/app-util';
import { Incident } from '@app/models/incident';
import { Responder } from '@app/models/responder';
import { Shelter } from '@app/models/shelter';
import { Mission } from '@app/models/mission';
import { PriorityZone } from '@app/models/priority-zone';
import { DisasterCenter } from '@app/models/disaster-center';
import restAPIs from '@app/utils/apis'
//import ERDEMO_STYLES from '@app/erdemo-styles';

const accessToken = process.env.TOKEN;

const initialState = {
  dCenterError: null,
  shelters: null,
  sheltersError: null,
  incidents: null,
  loading: true,
  errorsExist: true,
  viewport: null
};

const renderIncident = (station, i) => {
  const {name, coordinates} = station;
  return (
    <Marker
      key={i}
      longitude={coordinates[0]}
      latitude={coordinates[1]}
      captureDrag={false}
      captureDoubleClick={false}
    >
      <div className="station">
        <span>{name}</span>
      </div>
    </Marker>
  );
}

const getMapComponent = (thisviewport, mapControlSettings, shelters: Shelter[]) => {
  console.log("getMapComponent() viewport lat = "+thisviewport.latitude +" : # of shelters = "+shelters.length);

  // build an array of <Marker ... /> components
  let shelterMarkers = shelters.map( (shelter: Shelter, i) => {
      const marker = <Marker
        key={i}
        longitude={shelter.lon}
        latitude={shelter.lat}
        captureDrag={false}
        captureDoubleClick={false}
      >
        <div className="shelter">
          <span>{ shelter.name }</span>
        </div>
      </Marker>
  
      return marker;
  });

  return (
    <ReactMapGL
            {...thisviewport}
            {...mapControlSettings}
            width="100vw"
            height="100vh"
            mapStyle="mapbox://styles/mapbox/light-v9"
            mapboxApiAccessToken={accessToken} >
      { shelterMarkers }
    </ReactMapGL>
  );
}

// Based on the action type, the reducer returns a new state object
const dashboardStateReducer = (state, action) => {

  switch (action.type) {
    case "GET_DISASTER_CENTER_REQUEST":
      return {
        ...state,
        loading: true,
        dCenterError: null,
        errorsExist: false
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
        },
        dCenterError: null
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
          sheltersError: null,
          shelters: []
        };
    case "GET_SHELTERS_SUCCESS":
        return {
          ...state,
          loading: false,
          shelters: action.payload,
          sheltersError: null
        };
    case "GET_SHELTERS_FAILURE":
        return {
          ...state,
          shelters: [],
          loading: false,
          sheltersError: action.error,
          errorsExist: true
        };
    default:
      const errorMessage = "dashboardReducer: invoked with unknown action: "+action.type;
      console.error(errorMessage);
      throw new Error(errorMessage);
  }
}

const Dashboard: React.FunctionComponent = () => {

  // The hook typically takes 3 arguments but for this use-case, only 2 will be used
  const [state, dispatch] = useReducer(dashboardStateReducer, initialState);
  const { dCenterError, shelters, sheltersError, incidents, loading, errorsExist, viewport } = state;
  
  const getDisasterCenter = () => {
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
        getShelters();
        
      })
      .catch(err => {
        dispatch({
          type: "GET_DISASTER_CENTER_FAILURE",
          errorMessage: err
        })
      });
    }
    
  const getShelters = () => {
    dispatch({
      type: "GET_SHELTERS_REQUEST"
    })
    restAPIs.mock.disaster.shelters()
      .then(resp => {
        const sPayload: Shelter[] = resp.data;
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


  // Kick things off by fetching the Disaster Center from disaster service
  // This only needs to execute one time
  useEffect(() => {
    getDisasterCenter();
  }, []);

  const [mapControlSettings, setMapControlSettings] = React.useState({
    dragPan: true,
    dragRotate: true,
    scrollZoom: true,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    doubleClickZoom: true,
    minZoom: 0,
    maxZoom: 20,
    minPitch: 0,
    maxPitch: 85
  });

  // Let MapGL viewport state changes be controlled by Dashboard reducer
  const onViewportChange = newviewport => {
    console.log("onViewportChange() newviewport lat = "+newviewport.lat+ " : oldviewport = "+state.viewport.lat);
    console.log("onViewportChange() newviewport = "+newviewport.length);
  }

  return (
    <div>
    {
      loading && !errorsExist ? (
        <span>loading... </span>
      ) : errorsExist ? (
        <div>Errors Exist; Check Logs</div>
      ) : (
        <div>
          {shelters !== null && getMapComponent(viewport, mapControlSettings, shelters) } 
        </div>
      )
    }
    </div>
  )
}

export { Dashboard };
