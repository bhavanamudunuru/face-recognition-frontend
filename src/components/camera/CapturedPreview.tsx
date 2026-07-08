/**
 * components/camera/CapturedPreview.tsx
 * ----------------------------------------
 * Shows the captured face image after the user clicks "Capture Face".
 * Displayed before the user confirms and submits.
 */

interface Props {
  imageSrc: string
}

export default function CapturedPreview({ imageSrc }: Props) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 12 }}>
        Captured image — looks good? Hit Submit or Retake.
      </p>
      <img
        src={imageSrc}
        alt="Captured face"
        style={{
          width: '100%',
          maxWidth: 480,
          borderRadius: 16,
          border: '3px solid #3b82f6',
          transform: 'scaleX(-1)',
        }}
      />
    </div>
  )
}
