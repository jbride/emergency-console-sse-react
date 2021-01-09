import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import restAPIs from '@app/utils/apis'
import { Incident } from '@app/models/incident';

const pageSize = 10;

const initialState = {
  loading: true,
  rows: [],
  errorMessage: null
};

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
})

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createIncidentRow(ename: String, numpeople: number, medicalneeded: boolean, phone: String, status: String) {
  return { ename, numpeople, medicalneeded, phone, status };
}

// Based on the action type, the reducer returns a new state object
const incidentsStateReducer = (state, action) => {

  switch (action.type) {
    case "GET_INCIDENTS_REQUEST":
      return {
        ...state,
        loading: true,
        rows: [],
        errorMessage: null
      };
    case "GET_INCIDENTS_SUCCESS":
      // Update state object where payload is the incidents array
      console.log("reducer() action type = "+action.type+" : incidents array size = "+action.payload.length);
      return {
        ...state,
        loading: false,
        rows: action.payload,
        errorMessage: null
      };
    case "GET_INCIDENTS_FAILURE":
      return {
        ...state,
        rows: [],
        loading: false,
        errorMessage: action.error
      };
    default:
      console.log("reducer() returning state");
      return state;
  }
}

// This "functional component" approach uses TypeScript syntax
// FunctionComponent comes w/ one property by default:  children
const Incidents: React.FunctionComponent = () => {

  // The hook typically takes 3 arguments but for this use-case, only 2 will be used
  const [state, dispatch] = useReducer(incidentsStateReducer, initialState);
  const { rows, errorMessage, loading } = state;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  
  const classes = useStyles2();
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // Seed the table with all incidents
  useEffect(() => {

    dispatch({
      type: "GET_INCIDENTS_REQUEST"
    })

    //provideMockIncidents();
    getAllIncidentsFromIncidentService();

  }, []);

  const provideMockIncidents = () => {
    rows.push(createIncidentRow('Jace White', 159, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('Natalie Murphy', 237, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('01Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('02Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('03Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('04Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('05Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('06Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('07Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('08Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('09Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('10Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('11Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('12Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('13Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('14Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('15Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('16Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('17Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('18Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('19Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('20Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.push(createIncidentRow('21Nolan Hernandez', 262, "true", "303-523-7885", "RESCUED"));
    rows.sort((a, b) => (a.ename < b.ename ? -1 : 1));

    console.log("provieMockIncidents() # of rows = " + rows.length);

    dispatch({
      type: "GET_INCIDENTS_SUCCESS",
      payload: rows
    })
  }


  const getAllIncidentsFromIncidentService = () => {
    restAPIs.mock.incident.all()
      .then(resp => {
        const rawResult: Incident[] = resp.data;

        for (const iObj of rawResult) {
          //console.log(iObj.victimName+" , "+iObj.numberOfPeople+" , "+iObj.medicalNeeded+" , "+iObj.victimPhoneNumber+" , "+iObj.status);
          rows.push(createIncidentRow(iObj.victimName, iObj.numberOfPeople, String(iObj.medicalNeeded), iObj.victimPhoneNumber, iObj.status));
        }
        rows.sort((a, b) => (a.ename < b.ename ? -1 : 1));
        console.log("getAllIncidentsFromIncidentService() # of rows = " + rows.length);

        dispatch({
          type: "GET_INCIDENTS_SUCCESS",
          payload: rows
        })

      })
      .catch(err => {
        dispatch({
          type: "GET_INCIDENTS_FAILURE",
          errorMessage: err
        })
      });
  }

  return (
    <div>
      {
        loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 100 }}>Evacuee name</TableCell>
                      <TableCell align="right">Number of people</TableCell>
                      <TableCell align="right">Medical needed</TableCell>
                      <TableCell align="right">Phone number</TableCell>
                      <TableCell align="right">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : rows
                    ).map((row) => (
                      <TableRow key={row.ename}>
                        <TableCell style={{ width: 160 }} component="th" scope="row">
                          {row.ename}
                        </TableCell>
                        <TableCell align="right">
                          {row.numpeople}
                        </TableCell>
                        <TableCell align="right">
                          {row.medicalneeded}
                        </TableCell>
                        <TableCell align="right">
                          {row.phone}
                        </TableCell>
                        <TableCell align="right">
                          {row.status}
                        </TableCell>
                      </TableRow>
                    ))}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { 'aria-label': 'rows per page' },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            )
      }
    </div>
  );
}
export { Incidents };
