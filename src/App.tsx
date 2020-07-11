import React, { useState } from "react";
import { Box, Button, Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  graph: {
    flexGrow: 1,
  },
  controls: {
    width: 200,
    marginTop: 20,
  },
  lineChart: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

const App = () => {
  const classes = useStyles();

  const [numberOfOptions, setNumberOfOptions] = useState(100);
  const [preferredPrice, setPreferredPrice] = useState(1);

  const data = [
    { name: "Start", amount: 0 },
    { name: "Year 1", amount: (numberOfOptions / 4) * preferredPrice },
    { name: "Year 2", amount: (numberOfOptions / 2) * preferredPrice },
    { name: "Year 3", amount: (numberOfOptions / 4) * 3 * preferredPrice },
    { name: "Year 4", amount: numberOfOptions * preferredPrice },
  ];

  return (
    <Container fixed className={classes.root}>
      <div className={classes.graph}>
        <LineChart
          width={700}
          height={450}
          data={data}
          className={classes.lineChart}
        >
          <Tooltip
            formatter={(value) => new Intl.NumberFormat("en").format(+value)}
          />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis type="number" width={100} />
        </LineChart>
      </div>
      <Box className={classes.controls}>
        <Box m={2}>
          <TextField
            label="Number of options"
            type="number"
            value={numberOfOptions}
            onChange={(e) => {
              setNumberOfOptions(+e.target.value);
            }}
          />
        </Box>
        <Box m={2}>
          <TextField
            label="Preferred Price"
            type="number"
            value={preferredPrice}
            onChange={(e) => {
              setPreferredPrice(+e.target.value);
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default App;
