const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const upload = multer();

app.use(cors());

// Define the storage for multer
const storage = multer.memoryStorage();
const uploadWithMemoryStorage = multer({ storage: storage });

app.post('/upload', uploadWithMemoryStorage.single('image'), (req, res) => {
  // Assuming you want to save it as a file in the public folder
  const fileName = `../redux-app/public/${Date.now()}_${Math.floor(Math.random() * 1000)}.png`;

  // Save the file to the public folder
  require('fs').writeFileSync(fileName, req.file.buffer);

  res.send({ imagePath: fileName });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
