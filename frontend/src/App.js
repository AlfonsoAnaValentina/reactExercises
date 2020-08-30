import React, { Component } from 'react';
import './App.css';
import Error from './Error/Error';
import Chart from './Chart/Chart';

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
          <Error />
          :
          <div className="cotizadorWrapper">
            <Chart cotizacion={cotizacion} />
          </div>
        }
      </div>
    );
  }
}

export default App;
