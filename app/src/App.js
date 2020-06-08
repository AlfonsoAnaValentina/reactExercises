import React, { Component } from 'react';
import logo from './logo.svg';
import error404 from './images/404.png';

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
    moneda: 'Dolar',
    cotizacion: {},
    isError: false
  }
  componentDidMount() {
    this.obtenerCotizacion(this.state.moneda);
    this.interval = setInterval(() => this.obtenerCotizacion(this.state.moneda), 300000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  obtenerCotizacion(moneda) {
    fetch(`http://localhost:4000/cotizacion/${moneda || this.state.moneda}`)
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
    return (
      <div className="App">
        {this.state.isError ?
          <Paper elevation={3} className="errorImgWrapper">
            <img className="errorImg" src={require('./images/404.png')} />
            <Typography variant="h4" component="h4">
              Oops estamos teniendo problema con nuestro proveedor de datos!
            </Typography>
          </Paper>
          :
          <div className="cotizadorWrapper">
            <Moneda cotizacion={this.state.cotizacion} />
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
