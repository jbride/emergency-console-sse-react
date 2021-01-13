import React, { useState, useEffect, useReducer } from 'react';
import { PageSection, Title } from '@patternfly/react-core';

import MapGL, { Marker } from 'react-map-gl';

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
  loading: true,
  incidents: [],
  errorMessage: null,
  disasterCenter: {},
  viewPort: {}
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

// Based on the action type, the reducer returns a new state object
const dashboardStateReducer = (state, action) => {

  switch (action.type) {
    case "GET_DISASTER_CENTER_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "GET_DISASTER_CENTER_SUCCESS":
      return {
        ...state,
        loading: false,
        disasterCenter: action.payload,
        viewport: {
          latitude: action.payload.lat,
          longitude: action.payload.lon,
          zoom: action.payload.zoom,
          bearing: 0,
          pitch: 0
        },
        errorMessage: null
      };
    case "GET_DISASTER_CENTER_FAILURE":
      return {
        ...state,
        disasterCenter: {},
        loading: false,
        errorMessage: action.error
      };
    default:
      console.error("reducer() returning default state due to unknown action: "+action.type);
      return state;
  }
}

const Dashboard: React.FunctionComponent = () => {

  // The hook typically takes 3 arguments but for this use-case, only 2 will be used
  const [state, dispatch] = useReducer(dashboardStateReducer, initialState);
  const { incidents, errorMessage, loading, disasterCenter, viewport } = state;

  const getDisasterCenter = () => {
    restAPIs.mock.disaster.center()
      .then(resp => {
        const dCenter: DisasterCenter = resp.data;
        console.log("getDisasterCenter() name = "+dCenter.name);
        dispatch({
          type: "GET_DISASTER_CENTER_SUCCESS",
          payload: dCenter
        })
      })
      .catch(err => {
        dispatch({
          type: "GET_DISASTER_CENTER_FAILURE",
          errorMessage: err
        })
      });
  }

  // Acquire the Disaster Center from disaster service
  useEffect(() => {
    dispatch({
      type: "GET_DISASTER_CENTER_REQUEST"
    })
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
  const onViewportChange = viewport => {
    console.log("onViewportChange() viewport lat = "+viewport.lat);
  }
  
  return (
    <div>
      <PageSection>
        <Title headingLevel="h1" size="lg">Dashboard Page Title</Title>
      </PageSection>
      <MapGL
        {...viewport}
        {...mapControlSettings}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={ onViewportChange }
        mapboxApiAccessToken={accessToken}
      />
      { incidents.map(renderIncident) }
    </div>

  )
}

export { Dashboard };
