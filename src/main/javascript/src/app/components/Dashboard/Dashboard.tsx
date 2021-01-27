import React, { useLayoutEffect } from 'react';
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

//import ControlPanel from '@app/utils/control-panel';
import {ShelterProvider, useShelter} from '@app/globalstate/shelter-context'

// https://github.com/patternfly/patternfly-react-seed/issues/72
import sheltericon from '!!url-loader!@app/img/circle-shelter-hospital-colored.svg';


//import ERDEMO_STYLES from '@app/erdemo-styles';

const accessToken = process.env.MAP_BOX_TOKEN;
let getDisasterLocationFunction;
let disasterLocationDispatch;

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
      
const Dashboard: React.FunctionComponent = () => {

  const [interactionState, setInteractionState] = React.useState({});

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

  const MapComponent = () => {
    
    const {state, dispatch, getDisasterCenter} = useShelter();
    if(typeof disasterLocationDispatch === 'undefined') {
      disasterLocationDispatch = dispatch;
      getDisasterLocationFunction = getDisasterCenter;
      console.log("Inside MapComponent :  just set method and dispatch");
    }
  
    // build an array of <Marker ... /> components for each shelter
    let shelterMarkers = state.shelters.map( (shelter: Shelter, i) => {
          const marker = <Marker
            key={i}
            longitude={shelter.lon}
            latitude={shelter.lat}
            captureDrag={false}
            captureDoubleClick={false}
            name={ shelter.name }
          >
            <img src={ sheltericon } />
          </Marker>
          return marker;
    });
  
    return (
      
        state.loading && !state.errorsExist ? (
          <span>loading... </span>
        ) : state.errorsExist ? (
          <div>Errors Exist; { state.dCenterError }</div>
        ) : (
          <ReactMapGL
                  {...state.viewport}
                  {...mapControlSettings}
                  width="100vw"
                  height="100vh"
                  mapStyle="mapbox://styles/mapbox/light-v9"
                  onInteractionStateChange={ setInteractionState }
                  mapboxApiAccessToken={accessToken} >
            { shelterMarkers }
            { /*<ControlPanel
              settings={ mapControlSettings }
              interactionState={{ ...interactionState }}
            onChange={ setMapControlSettings } /> */}
          </ReactMapGL>
        )
      
    );
  }

  // Let MapGL viewport state changes be controlled by Dashboard reducer
  const onViewportChange = newviewport => {
    console.log("onViewportChange() newviewport lat = "+newviewport.lat+ " : oldviewport = "+state.viewport.lat);
    console.log("onViewportChange() newviewport = "+newviewport.length);
  }

  useLayoutEffect(() => {
      console.log("useLayoutEffect() getting disaster center and shelters");
      getDisasterLocationFunction( disasterLocationDispatch );
  }, []);
  
  return (
    <ShelterProvider>
      <div><MapComponent /></div>
    </ShelterProvider>
  )
}

export { Dashboard };
