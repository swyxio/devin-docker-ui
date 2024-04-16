const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/exec', (req, res) => {
  const { command } = req.body;
  console.log(`Received command: ${command}`); // Log the received command
  if (!command) {
    console.error('No command provided');
    return res.status(400).send('No command provided');
  }
  console.log(`Executing command: ${command}`); // Log the actual command being executed
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(stderr);
    }
    console.log(`Command executed successfully: ${stdout}`); // Log the successful execution
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
