import React, { Component } from 'react';
import './App.css';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EuroOutlinedIcon from '@material-ui/icons/EuroOutlined';
import AttachMoneyOutlinedIcon from '@material-ui/icons/AttachMoneyOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Moneda from './Moneda/Moneda';

class App extends Component {
  state = {
    url: 'http://localhost:4000',
    moneda: 'Dolar',
    cotizacion: {},
    isError: false
  }
  componentDidMount() {
    const { moneda } = this.state;
    this.obtenerCotizacion(moneda);
    this.interval = setInterval(() => this.obtenerCotizacion(moneda), 300000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  obtenerCotizacion(monedaNueva) {
    const { url, moneda } =  this.state;
    fetch(`${url}/cotizacion/${monedaNueva || moneda}`)
     .then(res => res.json())
     .then((data) => {
       this.setState({ cotizacion: data })
     })
     .catch(() => {
       this.setState({ isError: true });
       console.error('Algo no salio como lo esperabamos.');
     })
  }

  cambiarMoneda(moneda) {
    if(moneda !== this.state.moneda) {
      this.setState({moneda});
      this.obtenerCotizacion(moneda);
    }
  }

  render() {
    const { isError, cotizacion } = this.state;
    return (
      <div className="App">
        {isError ?
          <Paper elevation={3} className="errorImgWrapper">
            <img alt="404" className="errorImg" src={require('./images/404.png')} />
            <Typography variant="h4" component="h4">
              Oops estamos teniendo problema con nuestro proveedor de datos!
            </Typography>
          </Paper>
          :
          <div className="cotizadorWrapper">
            <Moneda cotizacion={cotizacion} />
            <BottomNavigation
              className="bottomNav"
              showLabels
            >
              <BottomNavigationAction
                label="Dolar"
                icon={<AttachMoneyOutlinedIcon />}
                onClick={() => this.cambiarMoneda('Dolar')}
              />
              <BottomNavigationAction
                label="Euro"
                icon={<EuroOutlinedIcon />}
                onClick={() => this.cambiarMoneda('Euro')}
              />
              <BottomNavigationAction
                label="Real"
                icon={<AttachMoneyOutlinedIcon />}
                onClick={() => this.cambiarMoneda('Real')}
              />
            </BottomNavigation>
          </div>
        }
      </div>
    );
  }
}

export default App;
