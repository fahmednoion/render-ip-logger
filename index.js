const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// URL of your IP tracker (update if needed)
const TRACKER_URL = 'https://prizebond.free.nf/iptracker/index.php';

// Function to visit the tracker
async function visitTracker() {
  try {
    console.log(`🔍 Visiting tracker: ${TRACKER_URL}`);
    const response = await fetch(TRACKER_URL);
    const status = response.status;
    console.log(`✅ Tracker responded with status: ${status}`);
    
    // Optional: read response to confirm logging
    const text = await response.text();
    if (text.includes('Your Public IP Address')) {
      console.log('📝 Tracker page loaded successfully – your IP should be logged.');
    } else {
      console.log('⚠️ Tracker page loaded but content seems unexpected.');
    }
  } catch (error) {
    console.error('❌ Failed to visit tracker:', error.message);
  }
}

// ---- Visit the tracker immediately on startup ----
visitTracker();

// ---- Keep the process alive with a minimal web server ----
app.get('/', (req, res) => {
  res.send('Render IP Logger is running. Check your tracker dashboard for the IP.');
});

app.listen(PORT, () => {
  console.log(`🌐 Web server running on port ${PORT}`);
  console.log('💡 This service visits your IP tracker on startup.');
});
