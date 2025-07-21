import { useMindMap } from "../contexts/MindMapContext";

export const useZoom = () => {
  const { mindMapInstance, zoom } = useMindMap();

  const handleZoomIn = () => {
    if (mindMapInstance && mindMapInstance.view) {
      mindMapInstance.view.enlarge();
    }
  };

  const handleZoomOut = () => {
    if (mindMapInstance && mindMapInstance.view) {
      mindMapInstance.view.narrow();
    }
  };

  const handleZoomToFit = () => {
    if (!document.fullscreenElement) {
      // Vào fullscreen mode
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Lỗi khi vào fullscreen:', err);
      });
    } else {
      // Thoát fullscreen mode
      document.exitFullscreen().catch((err) => {
        console.error('Lỗi khi thoát fullscreen:', err);
      });
    }
  };

  const handleZoomToActualSize = () => {
    if (mindMapInstance && mindMapInstance.view) {
      mindMapInstance.view.setScale(1);
    }
  };

  const handleZoomTo = (ratio: number) => {
    if (mindMapInstance && mindMapInstance.view) {
      mindMapInstance.view.setScale(ratio);
    }
  };

  const handleTranslateX = (step: number) => {
    if (mindMapInstance && mindMapInstance.view) {
      mindMapInstance.view.translateX(step);
    }
  };

  const handleTranslateY = (step: number) => {
    if (mindMapInstance && mindMapInstance.view) {
      mindMapInstance.view.translateY(step);
    }
  };

  const handleTranslateXY = (x: number, y: number) => {
    if (mindMapInstance && mindMapInstance.view) {
      mindMapInstance.view.translateXY(x, y);
    }
  };

  const handleReset = () => {
    if (mindMapInstance && mindMapInstance.view) {
      mindMapInstance.view.reset();
    }
  };

  return {
    zoom,
    handleZoomIn,
    handleZoomOut,
    handleZoomToFit,
    handleZoomToActualSize,
    handleZoomTo,
    handleTranslateX,
    handleTranslateY,
    handleTranslateXY,
    handleReset,
  };
};
