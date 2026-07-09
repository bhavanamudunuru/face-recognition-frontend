/**
 * components/camera/WebcamCapture.tsx
 * -------------------------------------
 * Webcam feed component. Shows live video stream from the user's camera.
 * Parent controls when to start/stop via the useCamera hook.
 */
import { RefObject } from 'react'
import { Camera } from 'lucide-react'

interface Props {
  videoRef: RefObject<HTMLVideoElement | null>
  canvasRef: RefObject<HTMLCanvasElement | null>
  cameraActive: boolean
}

export default function WebcamCapture({ videoRef, canvasRef, cameraActive }: Props) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 480, margin: '0 auto' }}>
      {/* Live video feed */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: '100%',
          borderRadius: 16,
          display: cameraActive ? 'block' : 'none',
          border: '3px solid #22c55e',
          background: '#000',
          transform: 'scaleX(-1)', // mirror effect
        }}
      />

      {/* Placeholder when camera is off */}
      {!cameraActive && (
        <div style={{
          width: '100%',
          aspectRatio: '4/3',
          borderRadius: 16,
          background: '#111827',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          border: '2px dashed #374151',
        }}>
          <Camera size={48} color="#6b7280" />
          <p style={{ color: '#6b7280', fontSize: 14 }}>Camera is off</p>
        </div>
      )}

      {/* Face guide overlay */}
      {cameraActive && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 200,
          height: 240,
          border: '2px solid rgba(34, 197, 94, 0.7)',
          borderRadius: '50%',
          pointerEvents: 'none',
          boxShadow: '0 0 0 2000px rgba(0,0,0,0.3)',
        }} />
      )}

      {/* Hidden canvas for capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
