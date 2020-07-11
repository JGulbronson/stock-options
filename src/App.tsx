import React from "react";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  graph: {
    flexGrow: 1,
  },
  controls: {
    width: 200,
  },
});

const data = [
  { name: "Start", uv: 0 },
  { name: "Year 1", uv: 400 },
  { name: "Year 2", uv: 800 },
  { name: "Year 3", uv: 1200 },
  { name: "Year 4", uv: 1600 },
];

const App = () => {
  const classes = useStyles();
  return (
    <Container fixed className={classes.root}>
      <div className={classes.graph}>
        <LineChart width={600} height={300} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </div>
      <div className={classes.controls}>
        <Button variant="contained" color="primary">
          Click me
        </Button>
      </div>
    </Container>
  );
};

export default App;
