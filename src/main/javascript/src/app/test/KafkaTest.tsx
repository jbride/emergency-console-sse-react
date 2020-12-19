import React, { Component } from 'react';

/*
 * TO-DO:
 *   1) https://auth0.com/blog/developing-real-time-web-applications-with-server-sent-events/
 */
class KafkaTest extends Component {

  incidentUpdateSource: EventSource
  incidentCommandSource: EventSource
  missionSource: EventSource;
  responderLocationUpdateSource: EventSource;
  responderEventSource: EventSource;
  responderCommandSource: EventSource;

  constructor(props) {
    super(props);
    console.log(" ..... starting KafkaTest");
    this.incidentUpdateSource = new EventSource("/incident/event/stream");
    this.incidentCommandSource = new EventSource("/incident/command/stream");
    this.missionSource = new EventSource("/mission/stream");
    this.responderLocationUpdateSource = new EventSource("/responderLocationUpdate/stream");
    this.responderEventSource = new EventSource("/responder/event/stream");
    this.responderCommandSource = new EventSource("/responder/command/stream");
    this.state = {
      incidentUpdate: 'changeme: incidentUpdate',
      incidentCommand: 'changeme: incidentCommand',
      mission: 'changeme: mission',
      responderLocationUpdate: 'changeme: responderLocationUpdate',
      responderUpdate: 'changeme: responderUpdate',
      responderCommand: 'changeme: responderCommand'
    };
  }

  componentDidMount() {
    this.incidentUpdateSource.onmessage = e => {
      this.setState({ incidentUpdate: e.data});
      console.log("incidentUpdate = "+this.state.incidentUpdate);
    }
    this.incidentUpdateSource.addEventListener("closedConnection", e => {
      console.log("stopping incidentUpdate SSE");
      this.incidentUpdateSource.close();
      }
    );
    this.incidentCommandSource.onmessage = e => {
      this.setState({ incidentCommand: e.data});
      console.log("incidentCommand = "+this.state.incidentCommand);
    }
    this.incidentCommandSource.addEventListener("closedConnection", e => {
      console.log("stopping incidentCommand SSE");
      this.incidentCommandSource.close();
      }
    );
    this.missionSource.onmessage = e => {
      this.setState({ mission: e.data});
      console.log("mission = "+this.state.mission);
    }
    this.missionSource.addEventListener("closedConnection", e => {
      console.log("stopping missionSource SSE");
      this.missionSource.close();
      }
    );
    this.responderLocationUpdateSource.onmessage = e => {
      this.setState({ responderLocationUpdate: e.data});
      console.log("mission = "+this.state.responderLocationUpdate);
    }
    this.responderLocationUpdateSource.addEventListener("closedConnection", e => {
      console.log("stopping responderLocationUpdateSource SSE");
      this.responderLocationUpdateSource.close();
      }
    );
    this.responderEventSource.onmessage = e => {
      this.setState({ responderUpdate: e.data});
      console.log("responderUpdate = "+this.state.responderUpdate);
    }
    this.responderEventSource.addEventListener("closedConnection", e => {
      console.log("stopping responderUpdateSource SSE");
      this.responderEventSource.close();
      }
    );
    this.responderCommandSource.onmessage = e => {
      this.setState({ responderCommand: e.data});
      console.log("responderCommand = "+this.state.responderCommand);
    }
    this.responderCommandSource.addEventListener("closedConnection", e => {
      console.log("stopping responderCommandSource SSE");
      this.responderCommandSource.close();
      }
    );
  }

  componentWillUnmount() {
    this.incidentUpdateSource.close();
    this.incidentCommandSource.close();
    this.missionSource.close();
    this.responderLocationUpdateSource.close;
    this.responderEventSource.close;
    this.responderCommandSource.close;
  }

  stopAllUpdates() {
      this.incidentUpdateSource.close();
  }

  render() {
    return (
      <div className="KafkaTest">
        <strong>Kafka Test</strong>
        <div><button onClick={() => this.stopAllUpdates()}>Stop All Server-Side Events Updates</button></div>
        <div>{this.state.incidentUpdate}</div>
        <div>{this.state.incidentCommand}</div>
        <div>{this.state.mission}</div>
        <div>{this.state.responderLocationUpdate}</div>
        <div>{this.state.responderUpdate}</div>
        <div>{this.state.responderCommand}</div>
      </div>
    );
  }
}
export { KafkaTest };;
