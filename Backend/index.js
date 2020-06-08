const express= require('express');
var http = require("http");

const app = express();

app.set('view engine', 'ejs');
app.get('/cotizacion/:moneda', function(req, res) {

  const codMoneda = obtenerCodigoMoneda(req.params.moneda);

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  var options = {
    host: 'api.cambio.today',
    port: 80,
    path: `/v1/quotes/${codMoneda}/ARS/json?quantity=1&key=4488|oze_OT9s~5b^_rHQq8KANrYtPX_md~a7`,
    method: 'GET'
  };
  try {
    http.request(options, function(resAPI) {
      console.log('STATUS: ' + resAPI.statusCode);
      console.log('HEADERS: ' + JSON.stringify(resAPI.headers));
      resAPI.setEncoding('utf8');
      resAPI.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
        const result = JSON.parse(chunk);
        res.send({
               moneda: req.params.moneda,
               precio: result.result.value
             })
      });
    }).end();
  } catch {
    console.log('Oops algo salio mal :(');
    res.send(
      {
        message: 'error'
      }
    );
  }


})

const obtenerCodigoMoneda = (moneda) => {
  switch (moneda) {
    case 'Dolar':
      return 'USD'
      break;
    case 'Euro':
      return 'EUR'
      break;
    case 'Real':
      return 'BRL'
      break;
    default:
      return 'USD';
  }
};

const server = app.listen(4000, function() {
  console.log('listening to port request 4000');
})
