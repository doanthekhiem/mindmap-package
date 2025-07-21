import { useRef } from "react";
import { MindMapToolbar } from "../components/MindMapToolbar";
import { ToastContainer } from "../components/Toast";
import { useMindMap } from "../contexts/MindMapContext";

export function Welcome() {
  const { isLoading, toasts, removeToast } = useMindMap();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar */}
      <MindMapToolbar />
      {/* MindMap Container */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <div className="text-lg">Đang tải mindmap...</div>
          </div>
        )}
        <div ref={containerRef} id="mindMapContainer" className="w-full h-full"></div>
      </div>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
