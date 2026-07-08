/**
 * components/layout/Header.tsx
 * -----------------------------
 * Top navigation bar with app title and mode switcher tabs.
 */
import { Scan, UserPlus } from 'lucide-react'

interface Props {
  mode: 'register' | 'verify'
  onModeChange: (mode: 'register' | 'verify') => void
}

export default function Header({ mode, onModeChange }: Props) {
  return (
    <header style={{
      background: '#111827',
      borderBottom: '1px solid #1f2937',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: '#22c55e',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Scan size={20} color="white" />
        </div>
        <div>
          <h1 style={{ color: 'white', fontSize: 17, fontWeight: 700, lineHeight: 1.1 }}>FaceID Platform</h1>
          <p style={{ color: '#6b7280', fontSize: 11 }}>AI Face Recognition System</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <TabBtn active={mode === 'register'} onClick={() => onModeChange('register')} icon={<UserPlus size={15} />} label="Register" />
        <TabBtn active={mode === 'verify'} onClick={() => onModeChange('verify')} icon={<Scan size={15} />} label="Verify" />
      </div>
    </header>
  )
}

function TabBtn({ active, onClick, icon, label }: any) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '8px 16px', borderRadius: 8,
      background: active ? '#22c55e' : '#1f2937',
      color: active ? 'white' : '#9ca3af',
      fontWeight: 600, fontSize: 13,
      border: 'none', cursor: 'pointer',
    }}>
      {icon}{label}
    </button>
  )
}
