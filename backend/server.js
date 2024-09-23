const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();

// Enable CORS for communication between frontend and backend
app.use(cors());

// Multer configuration for file handling
const upload = multer();

// POST route to handle file comparison
app.post('/compare', upload.fields([{ name: 'file1' }, { name: 'file2' }]), (req, res) => {
  const file1 = req.files.file1[0];
  const file2 = req.files.file2[0];

  // Ensure both files are uploaded
  if (!file1 || !file2) {
    return res.status(400).json({ error: 'Both files are required.' });
  }

  // Compare file contents
  const areFilesSame = file1.buffer.toString() === file2.buffer.toString();

  // Send result back
  return res.json({ result: areFilesSame ? 'Files are identical' : 'Files are different' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
