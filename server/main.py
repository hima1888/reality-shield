from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Form
from typing import Optional
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import time
import random

app = FastAPI(title="Reality Shield - AI Deepfake Detector API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewsRequest(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Reality Shield API"}

@app.post("/api/upload-image")
async def upload_image(file: UploadFile = File(...)):
    # Mocking AI scanning time
    time.sleep(2)
    is_fake = random.choice([True, False])
    confidence = round(random.uniform(70.5, 99.9), 1)
    return {
        "status": "success",
        "result": "FAKE" if is_fake else "REAL",
        "confidence": confidence,
        "filename": file.filename,
        "details": {
            "gan_artifacts": random.choice(["Detected", "None"]),
            "face_warping": random.choice(["High", "Low", "None"]),
            "metadata_analysis": "Suspicious" if is_fake else "Normal"
        }
    }

@app.post("/api/upload-video")
async def upload_video(file: UploadFile = File(...)):
    time.sleep(3)
    is_fake = random.choice([True, False])
    confidence = round(random.uniform(75.0, 99.9), 1)
    return {
        "status": "success",
        "result": "FAKE" if is_fake else "REAL",
        "confidence": confidence,
        "filename": file.filename,
        "details": {
            "frame_inconsistency": "Detected" if is_fake else "Minimal",
            "voice_cloning": random.choice(["Detected", "None"]),
            "lip_sync_mismatch": "High" if is_fake else "Low"
        }
    }

@app.post("/api/detect-news")
async def detect_news(request: NewsRequest):
    time.sleep(1)
    text_length = len(request.text)
    if text_length < 10:
        raise HTTPException(status_code=400, detail="Text too short")
    
    is_fake = random.choice([True, False])
    trust_score = round(random.uniform(10.0, 45.0) if is_fake else random.uniform(75.0, 98.0), 1)
    return {
        "status": "success",
        "result": "FAKE NEWS" if is_fake else "REAL NEWS",
        "trust_score": trust_score,
        "sentiment_manipulation": "Detected" if is_fake else "None"
    }

@app.get("/api/scan-history")
def scan_history():
    return [
        {"id": 1, "type": "image", "result": "FAKE", "confidence": 92.5, "date": "2026-05-08"},
        {"id": 2, "type": "video", "result": "REAL", "confidence": 88.0, "date": "2026-05-07"},
        {"id": 3, "type": "news", "result": "FAKE", "confidence": 78.2, "date": "2026-05-06"}
    ]

# Store complaints in a simple list for mock purposes
complaints_db = []

@app.post("/api/report-abuse")
async def report_abuse(
    name: str = Form(""), 
    email: str = Form(...), 
    url: str = Form(...), 
    details: str = Form(...),
    file: Optional[UploadFile] = File(None)
):
    # Process the uploaded file
    file_info = None
    if file:
        os.makedirs("uploads", exist_ok=True)
        file_path = f"uploads/{file.filename}"
        with open(file_path, "wb") as f:
            f.write(await file.read())
        file_info = {"filename": file.filename, "path": file_path}
    
    complaint = {
        "id": len(complaints_db) + 1,
        "name": name,
        "email": email,
        "url": url,
        "details": details,
        "file": file_info,
        "timestamp": time.time()
    }
    complaints_db.append(complaint)
    print("New complaint stored:", complaint)
    
    return {"status": "success", "message": "Report submitted successfully", "complaint_id": complaint["id"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
