import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Moneda.css';

const dolar = ({ cotizacion }) => {
  const { moneda, precio } = cotizacion;
  return (
    <div>
        <Card className="card">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Cotizacion
            </Typography>
            <Typography variant="h5" component="h2">
              {moneda}
            </Typography>
            <Typography variant="body2" component="h1">
              {precio}
            </Typography>
          </CardContent>
        </Card>
    </div>
  );
};

export default dolar;
