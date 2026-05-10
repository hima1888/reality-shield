require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const supabase = require('./supabaseClient');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set up Multer for file uploads (storing in memory to upload to Supabase)
const upload = multer({ storage: multer.memoryStorage() });

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'RealityShield Node.js Backend is running.' });
});

// ==========================================
// AUTHENTICATION ROUTES (Supabase Auth)
// ==========================================
app.post('/api/auth/signup', async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } }
    });
    if (error) throw error;
    res.json({ message: 'Signup successful', user: data.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    res.json({ message: 'Login successful', session: data.session, user: data.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==========================================
// REPORT & CASE MANAGEMENT ROUTES
// ==========================================
app.post('/api/reports', upload.single('file'), async (req, res) => {
  try {
    const { category, severity, details, location, isAnonymous, userId } = req.body;
    let evidenceUrl = null;

    // If there's an uploaded file, upload it to Supabase Storage
    if (req.file) {
      const fileName = `${Date.now()}_${req.file.originalname}`;
      const { data, error } = await supabase.storage
        .from('evidence')
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });
      
      if (error) {
        console.error('Storage upload error:', error);
      } else {
        // Get public URL
        const { data: urlData } = supabase.storage.from('evidence').getPublicUrl(fileName);
        evidenceUrl = urlData.publicUrl;
      }
    }

    // AI Analysis Simulation
    const aiAnalysisSummary = "AI analysis completed. Moderate probability of deepfake patterns.";
    const threatScore = severity === 'Emergency' ? 99 : (severity === 'High' ? 85 : 50);

    // Save to Database
    const { data: reportData, error: dbError } = await supabase
      .from('reports')
      .insert([
        {
          user_id: userId || null,
          category,
          severity,
          description: details,
          location,
          is_anonymous: isAnonymous === 'true',
          status: severity === 'Emergency' ? 'Escalated' : 'Pending',
          threat_score: threatScore,
          ai_analysis_summary: aiAnalysisSummary,
          evidence_url: evidenceUrl
        }
      ])
      .select();

    if (dbError) throw dbError;

    res.json({ message: 'Report submitted successfully', report: reportData[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/reports', async (req, res) => {
  try {
    const { data, error } = await supabase.from('reports').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// AI DETECTOR MOCK ROUTE
// ==========================================
app.post('/api/detect/media', upload.single('file'), async (req, res) => {
  // Simulating an AI processing delay
  setTimeout(() => {
    // Generate a random mock result for demonstration
    const isFake = Math.random() > 0.5;
    const confidence = isFake ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 20) + 80;
    
    res.json({
      result: isFake ? 'FAKE' : 'REAL',
      confidence: confidence,
      trust_score: confidence,
      details: {
        analysis: isFake ? 'Deepfake artifacts detected in facial rendering.' : 'No synthetic artifacts found.',
        manipulation_detected: isFake ? 'GAN Artifacts Found' : 'None Detected',
        face_editing_regions: isFake ? 'Eyes, Mouth, Jawline' : 'Unaltered',
        safety_recommendation: isFake ? 'Do Not Share. Report.' : 'Safe to Share'
      }
    });
  }, 2000);
});

app.post('/api/detect/text', async (req, res) => {
  const { text } = req.body;
  setTimeout(() => {
    const isFake = Math.random() > 0.5;
    const confidence = isFake ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 20) + 80;
    
    res.json({
      result: isFake ? 'FAKE NEWS' : 'REAL NEWS',
      confidence: confidence,
      trust_score: confidence,
      details: {
        analysis: isFake ? 'High probability of AI-generated misinformation patterns.' : 'Content appears to be human-written and authentic.',
        manipulation_detected: isFake ? 'AI Text Generator Patterns' : 'None Detected',
        safety_recommendation: isFake ? 'Verify sources. Do not share.' : 'Safe to Share'
      }
    });
  }, 1500);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
