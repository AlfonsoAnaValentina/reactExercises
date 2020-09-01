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
import Select from '@material-ui/core/Select';
import CanvasJSReact from '../assets/canvasjs.react';
import './Chart.css';


function createData(data, xAxis, yAxis) {
  const newData = [];
  data.map((value, key) => {
    if (key > 0) {
      const newObj = {};
      newObj.x = Number(value[xAxis]);
      newObj.y = Number(value[yAxis]);
      newData.push(newObj);
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
  return csvData;
}

const Chart = ({ props }) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [dataParsed, setDataParsed] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);
  const [xAxis, setXAxis] = React.useState(0);
  const [yAxis, setYAxis] = React.useState(1);
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  const options = {
			animationEnabled: true,
			theme: "light2",
			axisY: {
				title: dataParsed.length !== 0 ? dataParsed[0][yAxis] : "Y",
			},
			axisX: {
				title: dataParsed.length !== 0 ? dataParsed[0][xAxis] : "X",
			},
			data: [{
				type: "line",
				toolTipContent: "Point {x}: {y}",
				dataPoints: chartData
			}]
		}

  const handleChange = (event) => {
    setValue(event.target.value);
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
      <Grid item xs={6} sm={5}>
        <Card className="card">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              CVS Data
            </Typography>
            <TextField
              className="textfield-element"
              id="outlined-multiline-flexible"
              label="CSV"
              multiline
              rows={6}
              value={value}
              onChange={handleChange}
              variant="outlined"
            />
            <Button
              className="parse-button-chart"
              variant="contained"
              color="secondary"
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
      return (
        <FormControl  variant="outlined" className="formControl chart-element" disabled={!(dataParsed.length !== 0)}>
          <InputLabel id={`${axis}-column`}>{axis}</InputLabel>
          <Select
            className="chart-element"
            labelId={`${axis}-column`}
            id={`${axis}-column-id`}
            value={axis === 'X' ? xAxis : yAxis}
            onChange={(e) => handleAxisChange(e, axisIndex)}
            label={axis}
          >
          {columnsToRender && columnsToRender.map((item, index) => (
              <MenuItem value={index} key={index}>
                {item}
              </MenuItem>
          ))}
          </Select>
        </FormControl>
      );
  };

  return (
    <React.Fragment>
    <Grid container spacing={3} justify="center">
        {renderDataCollector()}
        <Grid item xs={6} sm={5}>
          <Card className="card">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Axis
              </Typography>
              {renderAxis('X', dataParsed[0])}
              {renderAxis('Y', dataParsed[0])}
              <Button
                className="parse-button-chart"
                variant="contained"
                color="secondary"
                onClick={() => handleCreateChart()}
              >
                Create Chart
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}  sm={12}>
          <Card className="card">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Chart
              </Typography>
              {(error || loading) ?
                error ? <div className="error-text">Complete the necessary data first</div> : <CircularProgress color="secondary" />
              :
                <div className="chart-container">
                <CanvasJSChart options = {options}
                  /* onRef={ref => this.chart = ref} */
                />
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
