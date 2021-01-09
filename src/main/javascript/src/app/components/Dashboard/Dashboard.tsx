import React, { useState, useEffect, useReducer } from 'react';
import { PageSection, Title } from '@patternfly/react-core';

import MapGL from 'react-map-gl';

import { default as DrawStyles } from '@app/utils/draw-styles';
import { AppUtil } from '@app/utils/app-util';
import { Incident } from '@app/models/incident';
import { Responder } from '@app/models/responder';
import { Shelter } from '@app/models/shelter';
import { Mission } from '@app/models/mission';
import { PriorityZone } from '@app/models/priority-zone';
import { DisasterCenter } from '@app/models/disaster-center';
import Axios from 'axios';

const accessToken = process.env.TOKEN;

let responders: Responder[];
let incidents: Incident[];
let shelters: Shelter[];
let missions: Mission[];
let priorityZones: PriorityZone[];
let center: DisasterCenter;
let incidentCommander: boolean;

let pickupData: GeoJSON.FeatureCollection<GeoJSON.LineString> = AppUtil.initGeoJson();
let deliverData: GeoJSON.FeatureCollection<GeoJSON.LineString> = AppUtil.initGeoJson();
let enableDrawingPriorityZones = false;  // TODO make a button to toggle this?
let priZoneButtonText = 'Create Priority Zone';

const GREY = '#a4b7c1';
const YELLOW = '#ffc107';
const BLUE = '#20a8d8';
const RED = '#f86c6b';
const GREEN = '#4dbd74';

let shelterStyle: any = {
  'background-image': 'url(assets/img/circle-shelter-hospital-colored.svg)'
 };

const currentIncidents = (): Incident[] => {
  return incidents.filter(i => i.status !== 'RESCUED');
}

const activeResponders = (): Responder[] => {
  return responders;
}

const markerClick = (lngLat: number[]) => {
  center.lon = lngLat[0];
  center.lat = lngLat[1];
}

// RED if REPORTED, YELLOW otherwise (I guess assigned is the only other state right now)
const getIncidentIcon = (incident: Incident): string  => {
  return !incident.status || incident.status === 'REPORTED' ? 'marker-incident-helpme-colored2.svg' : 'marker-incident-helpassigned-colored2.svg';
}

const getResponderIcon = (person: boolean): string => {
  return (person ? 'circle-responder-boat-colored.svg' : 'circle-responder-boat-simulated-colored.svg');
}

const getResponderMission = (responder: Responder) => {
  return missions.find(m => m.responderId === responder.id && m.status !== 'COMPLETED');
}

const getIncidentMission = (incident: Incident) => {
  return missions.find(m => m.incidentId === incident.id);
}

const onResponderPopup = (responder: Responder): void => {
  const mission = getResponderMission(responder);
  if (!mission) {
    return;
  }
  onPopup(mission);
}

const onIncidentPopup = (incident: Incident): void => {
  const mission = getIncidentMission(incident);
  if (!mission) {
    return;
  }
  onPopup(mission);
}

const onPopup = (mission: Mission): void => {
  if (!mission || mission.status === 'COMPLETED') {
    return;
  }

  pickupData.features[0].geometry.coordinates = [];
  pickupData = { ...pickupData };
  deliverData.features[0].geometry.coordinates = [];
  deliverData = { ...deliverData };
  const missionRoute = AppUtil.getRoute(mission.id, mission.steps);
  if (!missionRoute) {
    return;
  }

  pickupData.features[0].geometry.coordinates = missionRoute.pickupRoute;
  deliverData.features[0].geometry.coordinates = missionRoute.deliverRoute;
  pickupData = { ...pickupData };
  deliverData = { ...deliverData };
  //bounds = AppUtil.getBounds(missionRoute.pickupRoute.concat(missionRoute.deliverRoute));
}


// Fired when a feature is created. The following interactions will trigger this event:
// Finish drawing a feature.
// Simply clicking will create a Point.
// A LineString or Polygon is only created when the user has finished drawing it
// i.e. double-clicked the last vertex or hit Enter — and the drawn feature is valid.
//
// The event data is an object - features: Array<Object>
const createdDrawArea = (event) => {
  // TODO?
}

  // Fired when one or more features are updated. The following interactions will trigger
  // this event, which can be subcategorized by action:
  // action: 'move'
  //   * Finish moving one or more selected features in simple_select mode.
  //     The event will only fire when the movement is finished (i.e. when the user
  //     releases the mouse button or hits Enter).
  // action: 'change_coordinates'
  //   * Finish moving one or more vertices of a selected feature in direct_select mode.
  //     The event will only fire when the movement is finished (i.e. when the user releases
  //     the mouse button or hits Enter, or her mouse leaves the map container).
  //   * Delete one or more vertices of a selected feature in direct_select mode, which can
  //     be done by hitting the Backspace or Delete keys, clicking the Trash button, or invoking draw.trash().
  //   * Add a vertex to the selected feature by clicking a midpoint on that feature in direct_select mode.
  //
  // This event will not fire when a feature is created or deleted. To track those interactions, listen for draw.create and draw.delete events.
  //
  // The event data is an object - features: Array<Feature>, action: string
const updatedDrawArea = (event) => {
  if (event.features && event.features.length === 0) {
      return;
  }
  var feature = event.features[0];
  if (feature.properties.isCircle === true) {
      addedOrUpdatedPriorityZone(feature.id, feature.properties.center[0], feature.properties.center[1], feature.properties.radiusInKm);
 }
}



const addedOrUpdatedPriorityZone = (id, lon, lat, radiusInKm) => {
    const json = {
      lon: lon.toString(),
      lat: lat.toString(),
      radius: radiusInKm.toString()
    };
    Axios.post<any>(`incident-priority-service/priority-zone/${id}`, json);
}




const Dashboard: React.FunctionComponent = () => {

  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    bearing: 0,
    pitch: 0
  });
  
  return (
    <div>
      <PageSection>
        <Title headingLevel="h1" size="lg">Dashboard Page Title</Title>
      </PageSection>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/light-v9"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={accessToken}
      />
    </div>

  )
}

export { Dashboard };
