import React, { Component } from 'react';
import { incidentsListFetch } from '@app/utils/actions'
import { IIncidents, Incident } from '@app/models/incident';
import restAPIs from '@app/utils/apis';



class ServicesTest extends Component {


    constructor(props) {
        super(props);
        console.log(" .... starting ServicesTest");

        this.state = { 
            incidents: []
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    invokeIncidentsAction() {
        const response = incidentsListFetch();
        //this.setState({ responseValue: response});
    }

    createIncidentRow(ename: String, numpeople: number, medicalneeded: boolean, phone: String, status: String) {
        return { ename, numpeople, medicalneeded, phone, status };
    }

    invokeIncidentsAPI() {
        let iRows = [];
        restAPIs.incidents.all()
        .then(resp => {
            const rawResult: Incident[] = resp.data;
            //console.log("rawResult = "+JSON.stringify(rawResult));
            let rows = [];
            for(const iObj of rawResult){
                console.log("iObj = "+JSON.stringify(iObj));
                let row = this.createIncidentRow(iObj.victimName, iObj.numberOfPeople, iObj.medicalNeeded, iObj.victimPhoneNumber, iObj.status);
                iRows.push( row );
            }
        })
        .catch(err => {
            console.log("error = " + err);
        });
    }



    render() {
        return (
          <div>
              <div>
                  <strong>Incident Test</strong>
                  <div><button onClick={ () => this.invokeIncidentsAction() }>Incident test via action</button></div>
                  <div><button onClick={ () => this.invokeIncidentsAPI() }>Incident test via api</button></div>
              </div>
              {/*<div>Incidents = { this.state.incidents}</div> */}
          </div>
        );
    }

}
export { ServicesTest };;
