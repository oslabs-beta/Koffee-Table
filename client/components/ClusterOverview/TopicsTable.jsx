import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, partitions, percent, underReplicatedPartitions) {
  return { name, partitions, percent, underReplicatedPartitions };
}

export default function OverviewTable({ metadata }) {
  const { topics } = metadata;

  const totalPartitions = topics.reduce(
    (accumulator, topic) => accumulator + topic.partitions.length,
    0
  );

  const topicsList = topics.map((topic) => {
    return {
      name: topic.name,
      partitions: topic.partitions.length,
      percent: Math.floor((topic.partitions.length / totalPartitions) * 100),
      underReplicatedPartitions: 0,
    };
  });
  console.log('topicsList: ', topicsList);

  //iterate through each broker and create data for each broker
  let rows = [];
  rows = topicsList.map((topic) =>
    createData(
      topic.name,
      topic.partitions,
      topic.percent,
      topic.underReplicatedPartitions
    )
  );
  console.log('rows: ', rows);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell><b>Topic Name</b></TableCell>
            <TableCell align='right'>
            <b>Number of Partitions (% of Total)</b>
            </TableCell>
            <TableCell align='right'><b>Under Replicated Partitions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>
                <b>{row.partitions}</b> ({row.percent}%)
              </TableCell>
              <TableCell align='right'>
                {row.underReplicatedPartitions}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
