import { useState, useEffect } from "react";
import { useMindMap } from "../contexts/MindMapContext";

export const useHistory = () => {
  const { mindMapInstance, addToast } = useMindMap();
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  useEffect(() => {
    if (mindMapInstance) {
      const handleBackForward = (index: number, len: number) => {
        setIsStart(index <= 0);
        setIsEnd(index >= len - 1);
      };

      mindMapInstance.on('back_forward', handleBackForward);

      return () => {
        mindMapInstance.off('back_forward', handleBackForward);
      };
    }
  }, [mindMapInstance]);

  const handleBack = () => {
    if (mindMapInstance && !isStart) {
      mindMapInstance.execCommand('BACK');
      addToast("Đã quay lại", "info");
    }
  };

  const handleForward = () => {
    if (mindMapInstance && !isEnd) {
      mindMapInstance.execCommand('FORWARD');
      addToast("Đã tiến tới", "info");
    }
  };

  return {
    handleBack,
    handleForward,
    isStart,
    isEnd,
  };
};
