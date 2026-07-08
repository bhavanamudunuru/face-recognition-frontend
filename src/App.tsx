/**
 * App.tsx
 * --------
 * Root component. Manages the overall scan flow:
 * idle → camera_active → captured → uploading → scanning → done
 * Imports all sub-components — no business logic lives here directly.
 */
import { useState } from 'react'
import Header from './components/layout/Header'
import StatusBar from './components/layout/StatusBar'
import WebcamCapture from './components/camera/WebcamCapture'
import CapturedPreview from './components/camera/CapturedPreview'
import CameraControls from './components/camera/CameraControls'
import ResultCard from './components/results/ResultCard'
import { useCamera } from './hooks/useCamera'
import { uploadFaceImage } from './services/uploadService'
import { registerFace, verifyFace } from './services/apiService'
import { ScanStatus, FaceResult } from './types'

const USER_ID = 'demo-user-001' // In production, get from Firebase Auth

export default function App() {
  const [appMode, setAppMode] = useState<'register' | 'verify'>('register')
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [result, setResult] = useState<FaceResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { videoRef, canvasRef, cameraActive, startCamera, stopCamera, captureImage } = useCamera()

  function handleModeChange(mode: 'register' | 'verify') {
    setAppMode(mode)
    setScanStatus('idle')
    setCapturedImage(null)
    setResult(null)
    setError(null)
    stopCamera()
  }

  async function handleStart() {
    setError(null)
    await startCamera()
    setScanStatus('camera_active')
  }

  function handleCapture() {
    const img = captureImage()
    if (!img) {
      setError('Failed to capture image. Please try again.')
      return
    }
    setCapturedImage(img)
    stopCamera()
    setScanStatus('captured')
  }

  function handleRetake() {
    setCapturedImage(null)
    setResult(null)
    setError(null)
    setScanStatus('idle')
  }

  async function handleSubmit() {
    if (!capturedImage) return
    setError(null)

    try {
      // Step 1 — Upload to Firebase Storage
      setScanStatus('uploading')
      const imageUrl = await uploadFaceImage(USER_ID, capturedImage)

      // Step 2 — Send to backend for AI processing
      setScanStatus('scanning')
      const scanResult = appMode === 'register'
        ? await registerFace(USER_ID, imageUrl)
        : await verifyFace(USER_ID, imageUrl)

      setResult(scanResult)
      setScanStatus('done')
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setScanStatus('captured')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white' }}>
      <Header mode={appMode} onModeChange={handleModeChange} />

      <main style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 8 }}>
            {appMode === 'register' ? 'Register Your Face' : 'Verify Your Identity'}
          </h2>
          <p style={{ color: '#9ca3af', fontSize: 14 }}>
            {appMode === 'register'
              ? 'Position your face in the oval guide and capture a clear photo.'
              : 'Look at the camera to verify your identity against your registered face.'}
          </p>
        </div>

        {/* Progress bar */}
        <StatusBar status={scanStatus} />

        {/* Camera / Preview */}
        <div style={{
          background: '#1f2937',
          borderRadius: 20,
          padding: 24,
          marginBottom: 20,
        }}>
          {scanStatus !== 'done' && !capturedImage && (
            <WebcamCapture videoRef={videoRef} canvasRef={canvasRef} cameraActive={cameraActive} />
          )}

          {capturedImage && scanStatus !== 'done' && (
            <CapturedPreview imageSrc={capturedImage} />
          )}

          {scanStatus === 'done' && result && (
            <ResultCard result={result} />
          )}
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            padding: '12px 16px', borderRadius: 10,
            background: '#fef2f2', border: '1px solid #fecaca',
            color: '#991b1b', fontSize: 13, marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        {/* Controls */}
        <CameraControls
          status={scanStatus}
          onStart={handleStart}
          onCapture={handleCapture}
          onRetake={handleRetake}
          onSubmit={handleSubmit}
          mode={appMode}
        />
      </main>

      <style>{`
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
