import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(id, host, port, controller) {
  return { id, host, port, controller };
}

export default function OverviewTable({ brokers }) {
  const { controller } = brokers;

  let brokersList;
  brokersList = brokers.brokers.map((broker) => {
    return {
      id: broker.nodeId,
      host: broker.host,
      port: broker.port,
      controller: brokers.controller === controller ? 'Yes' : 'No',
    };
  });

  //iterate through each broker and create data for each broker
  let rows = [];
  rows = brokersList.map((broker) =>
    createData(broker.id, broker.host, broker.port, broker.controller)
  );

  return (
    <TableContainer component={Paper} id="container">
      <Table sx={{ minWidth: 650 }} aria-label='a dense table'>
        <TableHead >
          <TableRow>
            <TableCell>
              <b>Broker Id</b>
            </TableCell>
            <TableCell align='right'>
              <b>Host</b>
            </TableCell>
            <TableCell align='right'>
              <b>Port</b>
            </TableCell>
            <TableCell align='right'>
              <b>Controller</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>
              <TableCell align='right'>{row.host}</TableCell>
              <TableCell align='right'>{row.port}</TableCell>
              <TableCell align='right'>{row.controller}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
