import React, { Component } from 'react';

class ServicesTest extends Component {

    INCIDENT_HOST: String
    RESPONDER_HOST: String
    MISSION_HOST: String
    PROCESS_VIEWER_HOST: String
    RESPONDER_SIMULATOR_HOST: String
    DISASTER_SIMULATOR_HOST: String
    DISASTER_HOST: String

    constructor(props) {
        super(props);
        console.log(" .... starting ServicesTest");

        this.INCIDENT_HOST = String(process.env.INCIDENT_HOST);
        this.RESPONDER_HOST = String(process.env.RESPONDER_HOST);
        this.MISSION_HOST = String(process.env.MISSION_HOST);
        this.PROCESS_VIEWER_HOST = String(process.env.PROCESS_VIEWER_HOST);
        this.RESPONDER_SIMULATOR_HOST = String(process.env.RESPONDER_SIMULATOR_HOST);
        this.DISASTER_SIMULATOR_HOST = String(process.env.DISASTER_SIMULATOR_HOST);
        this.DISASTER_HOST = String(process.env.DISASTER_HOST);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className="ServicesTest">
                <strong>Services Test</strong>
                <div>INCIDENT_HOST = { this.INCIDENT_HOST }</div>
                <div>RESPONDER_HOST = { this.RESPONDER_HOST }</div>
                <div>MISSION_HOST = { this.MISSION_HOST }</div>
                <div>PROCESS_VIEWER_HOST = { this.PROCESS_VIEWER_HOST }</div>
                <div>RESPONDER_SIMULATOR_HOST = { this.RESPONDER_SIMULATOR_HOST }</div>
                <div>DISASTER_SIMULATOR_HOST = { this.DISASTER_SIMULATOR_HOST }</div>
                <div>DISASTER_HOST = { this.DISASTER_HOST }</div>
            </div>
        );
    }
}
export { ServicesTest };;
