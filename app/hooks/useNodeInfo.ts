import { useState } from 'react';
import { useMindMap } from '../contexts/MindMapContext';

export const useNodeInfo = () => {
  const { mindMapInstance, selectedNode, addToast } = useMindMap();
  const [showNodeInfo, setShowNodeInfo] = useState(false);

  const handleUpdateNode = (node: any, newText: string) => {
    if (mindMapInstance && node) {
      try {
        mindMapInstance.execCommand('SET_NODE_TEXT', false, [], newText);
        addToast('Đã cập nhật node thành công', 'success');
      } catch (error) {
        addToast('Lỗi khi cập nhật node', 'error');
      }
    }
  };

  const openNodeInfo = () => {
    if (selectedNode) {
      setShowNodeInfo(true);
    }
  };

  const closeNodeInfo = () => {
    setShowNodeInfo(false);
  };

  return {
    selectedNode,
    showNodeInfo,
    openNodeInfo,
    closeNodeInfo,
    handleUpdateNode,
  };
}; 