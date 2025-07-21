import { useMindMap } from "../contexts/MindMapContext";

export const useNodeOperations = () => {
  const { mindMapInstance, selectedNode, addToast } = useMindMap();

  const handleAddChild = () => {
    if (mindMapInstance) {
      if (selectedNode) {
        mindMapInstance.execCommand("INSERT_CHILD_NODE", false, [], { text: "Nút con mới" });
        addToast("Đã thêm node con", "success");
      } else {
        addToast("Vui lòng chọn một node trước", "warning");
      }
    }
  };

  const handleRemoveNode = () => {
    if (mindMapInstance) {
      if (selectedNode) {
        mindMapInstance.execCommand("REMOVE_NODE");
        addToast("Đã xóa node", "info");
      } else {
        addToast("Vui lòng chọn một node trước", "warning");
      }
    }
  };

  const handleAddSibling = () => {
    if (mindMapInstance) {
      if (selectedNode) {
        mindMapInstance.execCommand("INSERT_NODE", false, [], { text: "Nút anh em mới" });
        addToast("Đã thêm node anh em", "success");
      } else {
        addToast("Vui lòng chọn một node trước", "warning");
      }
    }
  };

  const handleAddParent = () => {
    if (mindMapInstance) {
      if (selectedNode) {
        mindMapInstance.execCommand("INSERT_PARENT_NODE", false, [], { text: "Nút cha mới" });
        addToast("Đã thêm node cha", "success");
      } else {
        addToast("Vui lòng chọn một node trước", "warning");
      }
    }
  };

  return {
    selectedNode,
    handleAddChild,
    handleRemoveNode,
    handleAddSibling,
    handleAddParent,
  };
};
