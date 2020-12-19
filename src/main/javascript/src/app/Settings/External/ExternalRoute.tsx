import React, { Component } from 'react';

class ExternalRoute extends Component {
  
  constructor(props) {
    super(props);
    console.log("ExternalRoute() path = "+this.state.path);
    window.location = this.state.path;
  }

  componentDidMount() {
    console.log("ExternalRoute.componentDidMount() : path = "+this.state.path);
  }
  
  render() {
    return (<section>Redirecting ... </section>);
  }

};

export { ExternalRoute };