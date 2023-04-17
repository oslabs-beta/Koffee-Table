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

function Row(props) {
  const { row, setOffsets } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            //send a fetch request to get the topic offsets
            onClick={async () => {
              if (!open) {
                fetch('/getOffsets', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    //need to dynamically change
                    clientId: 'myapp',
                    hostName: 'Jonathans-Air',
                    port: 9092,
                    topic: row.name,
                  }),
                })
                  .then((res) => res.json())
                  .then((offsets) => {
                    let offsetsList = offsets.map((offset) => {
                      return {
                        id: offset.partition,
                        messages: offset.high,
                        offset: offset.offset,
                      };
                    });
                    setOffsets(offsetsList);
                    console.log('offsets: ', offsets);
                  });
              } else
                setOffsets([
                  {
                    id: 0,
                    messages: 0,
                    offset: 0,
                  },
                ]);
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.name}
        </TableCell>
        <TableCell align='right'>
          {row.partitions} ({row.percent}%)
        </TableCell>
        <TableCell align='right'>{row.underReplicatedPartitions}</TableCell>
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
                  {row.viewPartitions.map((viewPartition) => (
                    <TableRow key={viewPartition.id}>
                      <TableCell component='th' scope='row'>
                        {viewPartition.id}
                      </TableCell>
                      <TableCell>{viewPartition.messages}</TableCell>
                      <TableCell align='right'>
                        {viewPartition.offset}
                      </TableCell>
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

export default function TopicsTable({ metadata, offsets, setOffsets }) {
  function createData(
    name,
    partitions,
    percent,
    underReplicatedPartitions,
    viewPartitions
  ) {
    return {
      name,
      partitions,
      percent,
      underReplicatedPartitions,
      viewPartitions,
    };
  }

  //create array of objects holding relevant info
  const { topics } = metadata;

  //iterate through topics, invoking reduce method to accumulate total sum value
  const totalPartitions = topics.reduce(
    (accumulator, topic) => accumulator + topic.partitions.length,
    0
  );

  //create an array of objects, each wit ha topic name, number of parititons, percent of total partitions, and number of under-replicated partitions
  const topicsList = topics.map((topic) => {
    return {
      name: topic.name,
      partitions: topic.partitions.length,
      percent: Math.floor((topic.partitions.length / totalPartitions) * 100),
      underReplicatedPartitions: 0,
    };
  });

  //create an array of objects that will be used to plug into the Material UI interface
  let rows = [];
  rows = topicsList.map((topic) =>
    createData(
      topic.name,
      topic.partitions,
      topic.percent,
      topic.underReplicatedPartitions,
      offsets
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <b>Topic name</b>
            </TableCell>
            <TableCell align='right'>
              <b>Number of Partitions (% of Total)</b>
            </TableCell>
            <TableCell align='right'>
              <b>Under Replicated Partitions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} setOffsets={setOffsets} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
