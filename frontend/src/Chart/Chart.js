import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import './Chart.css';

// Generate Sales Data
function createData(data, xAxis, yAxis) {
  const newData = [];
  const xKey = data[0][xAxis];
  const yKey = data[0][yAxis];
  data.forEach((value, key) => {
    if (key > 0) {
      const newObj = {};
      newObj[xKey] = value[xAxis];
      newObj[yKey] = value[yAxis];
      newData.push(newObj)
    }
  });
  return newData;
}

function csvToJson(csv) {
  var csvData = [];
  if (csv !== "") {
    var jsonObject = csv.split(/\r?\n|\r/);
    jsonObject.forEach((columns, i) => {
      csvData.push(columns.split(','));
    });
  }
  console.log(csvData);
  return csvData;
}

const Chart = ({ props }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorAxis, setErrorAxis] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [dataParsed, setDataParsed] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  const [xAxis, setXAxis] = React.useState(0);
  const [yAxis, setYAxis] = React.useState(0);


  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const handleClick = () => {
    const csvParsed = csvToJson(value);
    setDataParsed(csvParsed);
  };

  const handleAxisChange = (event, axisIndex) => {
    const newAxis = event.target.value;
      if (axisIndex === 0) {
        setXAxis(newAxis);
      } else {
        setYAxis(newAxis);
      }
  };

  const handleCreateChart = () => {
    if (dataParsed.length !== 0 ) {
      const newData = createData(dataParsed, xAxis, yAxis);
      setChartData(newData);
      setError(false);
      setLoading(false);
    } else {
      setError(true);
      setLoading(false);
    }

  };

  const renderDataCollector = () => {
    return (
      <Grid item xs={6}>
        <Card className="card">
          <CardContent>
              <TextField
                id="outlined-multiline-flexible"
                label="CSV"
                multiline
                rowsMax={6}
                value={value}
                onChange={handleChange}
                variant="outlined"
              />
              <Button
                className="parse-button-chart"
                variant="contained"
                color="primary"
                onClick={() => handleClick()}
              >
                Parse Data
              </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const renderAxis = (axis, columns) => {
      const axisIndex = axis === 'X' ? 0 : 1;
      const columnsToRender = columns || [axis];
      console.log(dataParsed.length !== 0 ? dataParsed[0][axisIndex] : '');
      return (
        <FormControl  variant="outlined" className="formControl chart-element" disabled={!(dataParsed.length !== 0)}>
          <InputLabel id={`${axis}-column`}>{axis}</InputLabel>
          <Select
            className="chart-element"
            labelId={`${axis}-column`}
            id={`${axis}-column-id`}
            value={axis}
            onChange={(e) => handleAxisChange(e, axisIndex)}
            label={axis}
          >
          {columnsToRender && columnsToRender.map((item, index) => (
              <MenuItem value={index} key={index}>
                {item}
              </MenuItem>
          ))}
          </Select>
          {errorAxis &&
            <FormHelperText className="axis-error-text">Please Pick another axis</FormHelperText>
          }
        </FormControl>
      );
  };

  return (
    <React.Fragment>
    <Grid container spacing={2}>
        {renderDataCollector()}
        <Grid item xs={6}>
          <Card className="card">
            <CardContent>
              {renderAxis('X', dataParsed[0])}
              {renderAxis('Y', dataParsed[0])}
              <Button
                className="parse-button-chart"
                variant="contained"
                color="primary"
                onClick={() => handleCreateChart()}
              >
                Create Chart
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className="card">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Chart
              </Typography>
              {(error || loading) ?
                error ? <div className="error-text">Complete the necessary data first</div> : <CircularProgress color="secondary" />
              :
                <div className="chart-container">
                  <ResponsiveContainer>
                    <LineChart
                      data={chartData}
                      margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                      }}
                    >
                      <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                      <YAxis stroke={theme.palette.text.secondary} />
                      <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default (Chart);
