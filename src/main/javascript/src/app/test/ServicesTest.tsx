import React, { Component } from 'react';
import restAPIs from '../utils/api'

class ServicesTest extends Component {

    INCIDENT_HOST: String
    RESPONDER_HOST: String
    MISSION_HOST: String
    PROCESS_VIEWER_HOST: String
    RESPONDER_SIMULATOR_HOST: String
    DISASTER_SIMULATOR_HOST: String
    DISASTER_SIMULATOR_ROUTE: String
    DISASTER_HOST: String

    constructor(props) {
        super(props);
        console.log(" .... starting ServicesTest");

        this.state = { 
            value: null,
        };

        this.INCIDENT_HOST = String(process.env.INCIDENT_HOST);
        this.RESPONDER_HOST = String(process.env.RESPONDER_HOST);
        this.MISSION_HOST = String(process.env.MISSION_HOST);
        this.PROCESS_VIEWER_HOST = String(process.env.PROCESS_VIEWER_HOST);
        this.RESPONDER_SIMULATOR_HOST = String(process.env.RESPONDER_SIMULATOR_HOST);
        this.DISASTER_SIMULATOR_HOST = String(process.env.DISASTER_SIMULATOR_HOST);
        this.DISASTER_SIMULATOR_ROUTE = String(process.env.DISASTER_SIMULATOR_ROUTE);
        this.DISASTER_HOST = String(process.env.DISASTER_HOST);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
          <div>
              <div className="ServicesTest">
                  <strong>Services Test</strong>
                  <div>INCIDENT_HOST = { this.INCIDENT_HOST }</div>
                  <button className="responder" onClick={ () => this.setState( this.getResponse ) }>Get responder total from: { this.RESPONDER_HOST }</button>
                  <div>MISSION_HOST = { this.MISSION_HOST }</div>
                  <div>PROCESS_VIEWER_HOST = { this.PROCESS_VIEWER_HOST }</div>
                  <div>RESPONDER_SIMULATOR_HOST = { this.RESPONDER_SIMULATOR_HOST }</div>
                  <div>DISASTER_SIMULATOR_HOST = { this.DISASTER_SIMULATOR_HOST }</div>
                  <div>DISASTER_SIMULATOR_ROUTE = { this.DISASTER_SIMULATOR_ROUTE }</div>
                  <div>DISASTER_HOST = { this.DISASTER_HOST }</div>
              </div>
              <div id="ResponseBody">{ this.state.value }</div>
            </div>
        );
    }

    getResponse(): String {
        const response = restAPIs.responders.total();
        console.log("getResponse() response = "+response);
        return JSON.stringify(response, undefined, 2);
    }
}
export { ServicesTest };;
