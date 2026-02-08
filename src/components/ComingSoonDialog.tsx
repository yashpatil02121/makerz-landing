// components/ComingSoonDialog.tsx
import { Fragment } from "react"

type Props = {
  open: boolean
  onClose: () => void
}

export default function ComingSoonDialog({ open, onClose }: Props) {
  if (!open) return null

  return (
    <Fragment>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
        <div className="
          w-full max-w-md
          rounded-2xl
          bg-white/80 backdrop-blur-xl
          border border-gray-200
          shadow-2xl
          p-8
          text-center
        ">
          {/* Accent */}
            <h2 className="text-3xl bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent font-bold mb-3">
            Coming Soon!
            </h2>

            <p className="text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
            We're crafting something powerful behind the scenes.
            It’s not quite ready yet but trust us, it’ll be worth the wait.
            </p>

          <button
            onClick={onClose}
            className="
              px-6 py-2 rounded-lg
              bg-green-600 text-white
              font-medium
              hover:shadow-lg hover:shadow-green-600/30
              transition
            "
          >
            Got it
          </button>
        </div>
      </div>
    </Fragment>
  )
}
