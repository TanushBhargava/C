import { useRef, useState } from 'react'

type Props = {
  onConfirm: () => void
}

function FaceAttendance({ onConfirm }: Props) {
  const videoRef = useRef<HTMLDivElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">Face Detection</h3>
      <p className="text-sm text-gray-600 mb-3">Mocked camera placeholder</p>
      <div ref={videoRef} className="aspect-video w-full bg-gray-100 grid place-items-center rounded-md">
        <span className="text-gray-500">Camera Preview</span>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          className="px-3 py-2 rounded-md bg-gray-900 text-white text-sm disabled:opacity-60"
          onClick={() => setIsCapturing(true)}
          disabled={isCapturing}
        >
          Start
        </button>
        <button
          className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm disabled:opacity-60"
          onClick={() => { setIsCapturing(false); onConfirm() }}
          disabled={!isCapturing}
        >
          Mark Present
        </button>
      </div>
    </div>
  )
}

export default FaceAttendance

