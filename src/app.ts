import dotenv from 'dotenv';
import express from 'express';
const mongoose = require('mongoose');
import cors from "cors";
import { DestinatarioController } from './controllers/destinatario.controller';
import { TransferenciaController } from './controllers/transferencia.controller';
import { UsuarioController } from './controllers/usuario.controller';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';

const CONFIG = require('./configs/config');

dotenv.config({
  path: '.env'
});

class Server {
  public app = express();
  public destinatarioController = new DestinatarioController();
  public transferenciaController = new TransferenciaController();
  public usuarioController = new UsuarioController();
  public authController = new AuthController();
  public authMiddleware = new AuthMiddleware();
}

const server = new Server();

server.app.use(express.json());
server.app.use(cors({
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token","Authorization"],
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  credentials: true,
  origin: CONFIG.CORS_ORIGIN
}));

console.log(JSON.stringify(process.env.NODE_ENV));

server.app.use('/destinatario', server.authMiddleware.auth, server.destinatarioController.router);
server.app.use('/transferencia', server.authMiddleware.auth, server.transferenciaController.router);
server.app.use('/usuario', server.authMiddleware.auth, server.usuarioController.router);
server.app.use('/auth', server.authController.router);

// make server listen on some port
((port = CONFIG.PORT) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
  mongoose.connect(CONFIG.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
    .then(()=> console.log('Conectado a MongoDB APP'))
    .catch(()=> console.log('No fue posible conectar a MongoDB'));
})();

