import { useExport } from "../hooks/useExport";
import { useHistory } from "../hooks/useHistory";
import { useNodeOperations } from "../hooks/useNodeOperations";
import { useZoom } from "../hooks/useZoom";
import { useMindMap } from "../contexts/MindMapContext";

export function MindMapToolbar() {
  const {
    zoom,
    handleZoomIn,
    handleZoomOut,
    handleZoomToFit,
    handleZoomToActualSize,
    handleTranslateX,
    handleTranslateY,
    handleTranslateXY,
    handleReset,
  } = useZoom();
  const { handleAddChild, handleRemoveNode, handleAddSibling, handleAddParent } = useNodeOperations();
  const {
    handleExportJSON,
    handleExportImage,
    handleExportSVG,
    handleExportPNG,
    handleExportPDF,
    handleExportMD,
    handleExportXMind,
    handleExportTXT,
    handleExportSMM,
  } = useExport();
  const { handleBack, handleForward, isStart, isEnd } = useHistory();
  const { mindMapInstance } = useMindMap();
  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-wrap gap-2">
      {/* History Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleBack}
          disabled={isStart}
          className={`px-3 py-1 rounded transition-colors ${
            isStart ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"
          }`}
          title="Quay lại"
        >
          ←
        </button>
        <button
          onClick={handleForward}
          disabled={isEnd}
          className={`px-3 py-1 rounded transition-colors ${
            isEnd ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"
          }`}
          title="Tiến tới"
        >
          →
        </button>
      </div>

      {/* Node Operations */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleAddChild}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          title="Thêm node con"
        >
          + Con
        </button>
        <button
          onClick={handleAddSibling}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          title="Thêm node anh em"
        >
          + Anh em
        </button>
        <button
          onClick={handleAddParent}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          title="Thêm node cha"
        >
          + Cha
        </button>
        <button
          onClick={handleRemoveNode}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          title="Xóa node"
        >
          Xóa
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleZoomOut}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          title="Thu nhỏ"
        >
          -
        </button>
        <span className="px-2 py-1 bg-gray-100 rounded min-w-[60px] text-center font-medium">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          title="Phóng to"
        >
          +
        </button>
        <button
          onClick={handleZoomToFit}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          title="Fullscreen (F11)"
        >
          ⛶
        </button>
        <button
          onClick={handleZoomToActualSize}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          title="Kích thước thực"
        >
          1:1
        </button>
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          title="Reset về mặc định"
        >
          ↺
        </button>
        <button
          onClick={() => mindMapInstance && mindMapInstance.execCommand && mindMapInstance.execCommand('RESET_LAYOUT')}
          className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
          title="Reset layout"
        >
          Reset Layout
        </button>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleTranslateX(-50)}
          className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          title="Di chuyển trái"
        >
          ←
        </button>
        <button
          onClick={() => handleTranslateX(50)}
          className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          title="Di chuyển phải"
        >
          →
        </button>
        <button
          onClick={() => handleTranslateY(-50)}
          className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          title="Di chuyển lên"
        >
          ↑
        </button>
        <button
          onClick={() => handleTranslateY(50)}
          className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          title="Di chuyển xuống"
        >
          ↓
        </button>
      </div>

      {/* Export Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleExportJSON()}
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          title="Xuất JSON"
        >
          JSON
        </button>
        <button
          onClick={() => handleExportPNG()}
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          title="Xuất PNG"
        >
          PNG
        </button>
        <button
          onClick={() => handleExportSVG()}
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          title="Xuất SVG"
        >
          SVG
        </button>
        <button
          onClick={() => handleExportTXT()}
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          title="Xuất TXT"
        >
          TXT
        </button>
      </div>
    </div>
  );
}
