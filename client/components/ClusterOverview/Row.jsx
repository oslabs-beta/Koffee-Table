import * as React from 'react';
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

const getOffsetsOnLink = (topic, userInfo, setOffsets) => {
  fetch('/getOffsets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      //need to dynamically change
      // ['myapp', 'Joes-Air', '9092']
      clientId: userInfo[0],
      hostName: userInfo[1],
      port: userInfo[2],
      topic: topic,
    }),
  })
    .then((res) => res.json())
    .then((offsets) => setOffsets(offsets));
};

export default function Row({
  userInfo,
  row,
  setOffsets,
  setCurrentTopic,
  percent,
  offsets
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            //send a fetch request to get the topic offsets
            onClick={() => {
              getOffsetsOnLink(row.name, userInfo, setOffsets);
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          <Link
            to={`/overview/${row.name}`}
            onClick={() => {
              getOffsetsOnLink(row.name, userInfo, setOffsets);
              setCurrentTopic(row);
            }}
          >
            {row.name}
          </Link>
        </TableCell>
        <TableCell align='right'>
          {row.partitions.length} ({percent}%)
        </TableCell>
        {/*  0 represents under-replicated partitions -- please fix later to actually present its number  */}
        <TableCell align='right'>{0}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Partitions
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Partition Id</b>
                    </TableCell>
                    <TableCell>
                      <b>Total Messages</b>
                    </TableCell>
                    <TableCell align='right'>
                      <b>Offset</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offsets.map((offsets) => (
                    <TableRow key={offsets.partition}>
                      <TableCell component='th' scope='row'>
                        {offsets.partition}
                      </TableCell>
                      <TableCell>{offsets.high}</TableCell>
                      <TableCell align='right'>{offsets.offset}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
