import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('GermanGains backend is running ');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running successfully on http://localhost:${PORT}`);
});
