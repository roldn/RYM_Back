import cors from 'cors';
import express, { Router } from 'express';
import * as dotenv from "dotenv";
import helmet from "helmet";
import appRouter from './routes';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

if (!PORT) {
  console.log(`Error to get ports`);
  process.exit(1);
}

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/characters", express.static(`${__dirname}/public`));
app.use("/", appRouter);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to NodeJs App using TypeScript'));



