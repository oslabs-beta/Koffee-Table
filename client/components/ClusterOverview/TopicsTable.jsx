import * as React from 'react';
import Row from './Row.jsx'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link } from 'react-router-dom';

export default function TopicsTable({
  offsets,
  setOffsets,
  userInfo,
  setCurrentTopic,
  topics
}) {

  const totalPartitions = topics.reduce(
    (accumulator, topic) => accumulator + topic.partitions.length,
    0
  );



  return (
    <TableContainer id="container" component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <b>Topic name</b>
            </TableCell>
            <TableCell align="right">
              <b>Number of Partitions (% of Total)</b>
            </TableCell>
            <TableCell align="right">
              <b>Under Replicated Partitions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topics.map((topic) => (
            <Row
              key={topic.name}
              row={topic}
              offsets={offsets}
              percent={Math.floor((topic.partitions.length / totalPartitions) * 100)}
              setOffsets={setOffsets}
              userInfo={userInfo}
              setCurrentTopic={setCurrentTopic}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
