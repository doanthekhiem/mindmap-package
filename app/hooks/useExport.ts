import { useMindMap } from "../contexts/MindMapContext";

export const useExport = () => {
  const { mindMapInstance, addToast } = useMindMap();

  // Export to smm, json
  const handleExportSMM = (fileName?: string, withConfig: boolean = true) => {
    if (mindMapInstance) {
      try {
        mindMapInstance.export("smm", true, fileName || "mindmap", withConfig);
        addToast("Đã xuất file SMM thành công", "success");
      } catch (error) {
        addToast("Lỗi khi xuất file SMM", "error");
      }
    }
  };

  const handleExportJSON = (fileName?: string, withConfig: boolean = false) => {
    if (mindMapInstance) {
      try {
        mindMapInstance.export("json", true, fileName || "mindmap", withConfig);
        addToast("Đã xuất file JSON thành công", "success");
      } catch (error) {
        addToast("Lỗi khi xuất file JSON", "error");
      }
    }
  };

  // Export to png, pdf
  const handleExportPNG = (fileName?: string) => {
    if (mindMapInstance) {
      try {
        mindMapInstance.export("png", true, fileName || "mindmap");
        addToast("Đã xuất file PNG thành công", "success");
      } catch (error) {
        addToast("Lỗi khi xuất file PNG", "error");
      }
    }
  };

  const handleExportPDF = (fileName?: string) => {
    if (mindMapInstance) {
      try {
        mindMapInstance.export("pdf", true, fileName || "mindmap");
        addToast("Đã xuất file PDF thành công", "success");
      } catch (error) {
        addToast("Lỗi khi xuất file PDF", "error");
      }
    }
  };

  // Export to svg
  const handleExportSVG = (fileName?: string) => {
    if (mindMapInstance) {
      try {
        mindMapInstance.export("svg", true, fileName || "mindmap");
        addToast("Đã xuất file SVG thành công", "success");
      } catch (error) {
        addToast("Lỗi khi xuất file SVG", "error");
      }
    }
  };

  // Export to md
  const handleExportMD = (fileName?: string) => {
    if (mindMapInstance) {
      try {
        mindMapInstance.export("md", true, fileName || "mindmap");
        addToast("Đã xuất file Markdown thành công", "success");
      } catch (error) {
        addToast("Lỗi khi xuất file Markdown", "error");
      }
    }
  };

  // Export to xmind
  const handleExportXMind = (fileName?: string) => {
    if (mindMapInstance) {
      try {
        mindMapInstance.export("xmind", true, fileName || "mindmap");
        addToast("Đã xuất file XMind thành công", "success");
      } catch (error) {
        addToast("Lỗi khi xuất file XMind", "error");
      }
    }
  };

  // Export to txt
  const handleExportTXT = (fileName?: string) => {
    if (mindMapInstance) {
      try {
        mindMapInstance.export("txt", true, fileName || "mindmap");
        addToast("Đã xuất file TXT thành công", "success");
      } catch (error) {
        addToast("Lỗi khi xuất file TXT", "error");
      }
    }
  };

  // Legacy method for backward compatibility
  const handleExportImage = () => {
    if (mindMapInstance) {
      try {
        mindMapInstance.export("pdf", true, "mindmap");
        addToast("Đã xuất ảnh thành công", "success");
      } catch (error) {
        addToast("Lỗi khi xuất ảnh", "error");
      }
    }
  };

  return {
    // New export methods
    handleExportSMM,
    handleExportJSON,
    handleExportPNG,
    handleExportPDF,
    handleExportSVG,
    handleExportMD,
    handleExportXMind,
    handleExportTXT,
    // Legacy method
    handleExportImage,
  };
};
