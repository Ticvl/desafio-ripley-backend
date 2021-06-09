import dotenv from 'dotenv';
import express from 'express';
const mongoose = require('mongoose');
import cors from "cors";
import { Destinatario } from './controllers/destinatario';
import { Transferencia } from './controllers/transferencia';
import { Usuario } from './controllers/usuario';

dotenv.config({
  path: '.env'
});

class Server {
  public app = express();
  public destinatario = new Destinatario();
  public transferencia = new Transferencia();
  public usuario = new Usuario();
}

const server = new Server();

server.app.use(express.json());
server.app.use(cors({
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token","Authorization"],
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  credentials: true,
  origin: ["http://ec2-18-232-148-217.compute-1.amazonaws.com:8080","http://localhost:4200"]
}));


server.app.use('/destinatario', server.destinatario.router);
server.app.use('/transferencia', server.transferencia.router);
server.app.use('/usuario', server.usuario.router);

// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
  mongoose.connect('mongodb://localhost:27017/desafio-ripley', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(()=> console.log('Conectado a MongoDB APP'))
    .catch(()=> console.log('No fue posible conectar a MongoDB'));
})();

