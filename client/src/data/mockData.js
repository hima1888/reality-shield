export const mockIncidents = [
  { id: 'INC-001', title: 'Fake Instagram Deepfake Account', type: 'Deepfake', time: 'Just now', severity: 'High', aiRisk: 92, status: 'Active threat' },
  { id: 'INC-002', title: 'Suspicious WhatsApp Voice Clone', type: 'Voice Cloning', time: '5 mins ago', severity: 'High', aiRisk: 88, status: 'Investigating' },
  { id: 'INC-003', title: 'Cyberstalking via location tracking', type: 'Stalking', time: '12 mins ago', severity: 'Emergency', aiRisk: 95, status: 'Emergency' },
  { id: 'INC-004', title: 'AI-Generated Extortion Image', type: 'Blackmail', time: '25 mins ago', severity: 'High', aiRisk: 99, status: 'Investigating' },
  { id: 'INC-005', title: 'Harassment on Discord Server', type: 'Cyberbullying', time: '1 hr ago', severity: 'Medium', aiRisk: 45, status: 'Resolved' },
  { id: 'INC-006', title: 'Identity Theft LinkedIn Profile', type: 'Identity Theft', time: '2 hrs ago', severity: 'Medium', aiRisk: 78, status: 'Investigating' },
];

export const mockCases = [
  { 
    id: 'CASE-9021', 
    victim: 'Anonymous', 
    category: 'Deepfake', 
    description: 'Victim reported a manipulated video circulating on social media that maps her face onto inappropriate content. AI scan confirms high GAN artifacts and temporal inconsistency.', 
    evidencePreview: 'video_thumbnail_01.jpg',
    aiAnalysis: 'Deepfake detected. Face warping and lighting mismatch.',
    threatScore: 94,
    date: '2026-05-09',
    officer: 'Agent R. Sterling',
    status: 'Under Review',
    actionHistory: [
      { time: '10:00 AM', action: 'Case opened by automated system' },
      { time: '10:05 AM', action: 'AI scanned evidence: 94% Fake' },
      { time: '10:30 AM', action: 'Assigned to Agent Sterling' }
    ],
    recommendation: 'Immediate takedown request sent to social media platform. Victim advised to lock profiles.'
  },
  { 
    id: 'CASE-9022', 
    victim: 'Sarah M.', 
    category: 'Voice Cloning', 
    description: 'Scammers used cloned voice to call family members asking for emergency funds. Audio forensics indicate AI generation.', 
    evidencePreview: 'audio_waveform.png',
    aiAnalysis: 'Voice clone detected. Lack of natural breath pauses and acoustic anomalies present.',
    threatScore: 89,
    date: '2026-05-08',
    officer: 'Agent J. Doe',
    status: 'Pending',
    actionHistory: [
      { time: '14:20 PM', action: 'Report submitted by victim' }
    ],
    recommendation: 'Alert bank and family members immediately. Do not answer unknown calls.'
  },
  { 
    id: 'CASE-9023', 
    victim: 'Anonymous', 
    category: 'Blackmail', 
    description: 'Extortionist demanding crypto payment threatening to release AI-manipulated images to employer.', 
    evidencePreview: 'email_screenshot.jpg',
    aiAnalysis: 'Images contain stable diffusion noise patterns. 99% probability of AI generation.',
    threatScore: 99,
    date: '2026-05-08',
    officer: 'Emergency Response Unit',
    status: 'Escalated',
    actionHistory: [
      { time: '09:15 AM', action: 'Report submitted with High severity' },
      { time: '09:20 AM', action: 'Escalated to Cybercrime Unit' },
      { time: '09:30 AM', action: 'Tracing cryptocurrency address' }
    ],
    recommendation: 'Do NOT pay ransom. Cease all communication. Cyber unit is tracing IP.'
  }
];

export const mockMapData = [
  { id: 1, lat: 40.7128, lng: -74.0060, intensity: 80, type: 'Deepfake' },
  { id: 2, lat: 34.0522, lng: -118.2437, intensity: 95, type: 'Stalking' },
  { id: 3, lat: 51.5074, lng: -0.1278, intensity: 60, type: 'Cyberbullying' },
  { id: 4, lat: 48.8566, lng: 2.3522, intensity: 45, type: 'Scam' },
  { id: 5, lat: -33.8688, lng: 151.2093, intensity: 75, type: 'Fake Profile' },
];

export const mockTimeline = [
  { name: '00:00', deepfakes: 12, stalking: 3 },
  { name: '04:00', deepfakes: 8, stalking: 1 },
  { name: '08:00', deepfakes: 25, stalking: 7 },
  { name: '12:00', deepfakes: 40, stalking: 15 },
  { name: '16:00', deepfakes: 35, stalking: 18 },
  { name: '20:00', deepfakes: 55, stalking: 22 },
];
