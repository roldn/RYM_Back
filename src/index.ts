import cors from 'cors';
import express from 'express';
import * as dotenv from "dotenv";
import helmet from "helmet";
import * as crud from '../src/router/character-crud';
import { PrismaClient } from '@prisma/client';


dotenv.config();

if (!process.env.PORT) {
  console.log(`Error to get ports`);
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
const prisma = new PrismaClient()


app.use(helmet());
app.use(cors());
app.use(express.json());

async function main() {

  await prisma.$connect()

    const post = await prisma.character.create({
      data: {
        name: 'Morty',
        status: 'dead',
        gender: 'male'
      },
    });
    console.log(post)
}
main().then(
  async () => {
    await prisma.$disconnect()
  }
).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Send message for default URL
app.get('/', (req, res) => res.send('Welcome to NodeJs App using TypeScript'));

app.get('/characters', crud.getAll);
app.post('/create', crud.create);
app.post('/uptade', crud.update);
app.post('/remove', crud.remove);


