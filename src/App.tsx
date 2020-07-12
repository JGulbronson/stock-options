import React, { useState } from "react";
import { Box, Button, Container, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { start } from "repl";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
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

type Grant = {
  ordinal: string;
  numberOfOptions: number;
  strikePrice: number;
  startMonth: number;
};

const dummyData = [
  {
    name: "1",
    ["0"]: 0,
  },
  {
    name: "1",
    ["1"]: 1,
  },
];

const GRAPH_COLORS = ["#4D342F", "#E4521B", "#d5c755"];

const App = () => {
  const classes = useStyles();

  const [numberOfOptions, setNumberOfOptions] = useState(100);
  const [strikePrice, setStrikePrice] = useState(1);
  const [startMonth, setStartMonth] = useState(0);
  const [preferredPrice, setPreferredPrice] = useState(1);

  const [grants, setGrants] = useState<Array<Grant>>([]);

  const data = [];
  for (let grant of grants) {
    for (let month = grant.startMonth + 1; month <= 8 * 12; month++) {
      let value: number;
      if (month < 12 + grant.startMonth) {
        value = 0;
      } else if (month > 48 + grant.startMonth) {
        value = grant.numberOfOptions * preferredPrice;
      } else {
        value =
          ((grant.numberOfOptions * preferredPrice) / 48) *
          (month - grant.startMonth);
      }
      const existingData = data.find((it) => it.name === month);
      if (existingData) {
        existingData[grant.ordinal] = value;
      } else {
        data.push({
          name: month,
          [grant.ordinal]: value,
        });
      }
    }
  }

  let bars;
  if (grants.length > 0) {
    bars = grants.map((grant, index) => {
      return (
        <Bar
          dataKey={grant.ordinal}
          fill={GRAPH_COLORS[index % GRAPH_COLORS.length]}
          isAnimationActive={false}
          stackId={1}
        />
      );
    });
  } else {
    bars = (
      <Bar dataKey={"1"} fill="#8884d8" isAnimationActive={false} stackId={1} />
    );
  }

  return (
    <Container fixed className={classes.root}>
      <div className={classes.graph}>
        <BarChart
          width={900}
          height={450}
          data={data.length > 0 ? data : dummyData}
          className={classes.lineChart}
        >
          <Tooltip
            formatter={(value) => new Intl.NumberFormat("en").format(+value)}
          />
          {bars}
          <XAxis dataKey="name" interval={3} />
          <YAxis type="number" width={100} />
        </BarChart>
      </div>
      <Box className={classes.controls}>
        <Box m={2}>
          <TextField
            label="Number of Options"
            type="number"
            value={numberOfOptions}
            onChange={(e) => {
              setNumberOfOptions(+e.target.value);
            }}
          />
        </Box>
        <Box m={2}>
          <TextField
            label="Strike Price"
            type="number"
            value={strikePrice}
            onChange={(e) => {
              setStrikePrice(+e.target.value);
            }}
          />
        </Box>
        <Box m={2}>
          <TextField
            label="Start Month"
            type="number"
            value={startMonth}
            onChange={(e) => {
              setStartMonth(+e.target.value);
            }}
          />
        </Box>
        <Box m={2}>
          <Button
            color={"primary"}
            variant={"contained"}
            onClick={() =>
              setGrants([
                ...grants,
                {
                  ordinal: `Grant ${grants.length + 1}`,
                  strikePrice: strikePrice,
                  numberOfOptions: numberOfOptions,
                  startMonth: startMonth,
                },
              ])
            }
          >
            Add grant
          </Button>
        </Box>
      </Box>
      <Box>
        <TextField
          label="Preferred Price"
          type="number"
          value={preferredPrice}
          onChange={(e) => {
            setPreferredPrice(+e.target.value);
          }}
        />
      </Box>
    </Container>
  );
};

export default App;
