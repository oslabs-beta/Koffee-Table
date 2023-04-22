import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(category, value) {
  return { category, value };
}

export default function OverviewTable({ topics, brokers }) {
  // const { topics } = metadata;

  const totalPartitions = topics.reduce(
    (accumulator, topic) => accumulator + topic.partitions.length,
    0
  );

  const rows = [
    createData('Total Topics', topics.length),
    createData('Total Partitions', totalPartitions),
    createData('Total Under-Replicated Partitions', 0),
  ];

  return (
    <TableContainer component={Paper} id='container'>
      <Table sx={{ minWidth: 650 }} aria-label='a dense table'>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.category}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.category}
              </TableCell>
              <TableCell align='right'>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
