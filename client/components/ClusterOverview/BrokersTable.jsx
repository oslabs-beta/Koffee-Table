import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function OverviewTable({ brokers }) {
  
  let brokersList; 

  if (brokers) {
    const { controller } = brokers;
    brokersList = brokers.brokers.map((broker) => {
      return {
        id: broker.nodeId,
        host: broker.host,
        port: broker.port,
        controller: brokers.controller === controller ? 'Yes' : 'No',
      };
    });
  } 

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
         {brokersList ? brokersList.map((topic) => (
            <TableRow
              key={topic.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {topic.id}
              </TableCell>
              <TableCell align='right'>{topic.host}</TableCell>
              <TableCell align='right'>{topic.port}</TableCell>
              <TableCell align='right'>{topic.controller}</TableCell>
            </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
