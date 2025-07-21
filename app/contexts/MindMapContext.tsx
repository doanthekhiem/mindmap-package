import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import data from "../mockdata/Mind map.json";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  duration?: number;
}

interface MindMapContextType {
  mindMapInstance: any;
  isLoading: boolean;
  zoom: number;
  selectedNode: any;
  toasts: Toast[];
  addToast: (message: string, type: Toast["type"], duration?: number) => void;
  removeToast: (id: string) => void;
}

const MindMapContext = createContext<MindMapContextType | undefined>(undefined);

export const useMindMap = () => {
  const context = useContext(MindMapContext);
  if (!context) {
    throw new Error("useMindMap must be used within a MindMapProvider");
  }
  return context;
};

interface MindMapProviderProps {
  children: React.ReactNode;
}

export const MindMapProvider: React.FC<MindMapProviderProps> = ({ children }) => {
  const [mindMapInstance, setMindMapInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const addToast = (message: string, type: Toast["type"], duration?: number) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type, duration };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initMindMap = async () => {
      try {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 100));

        const container = document.getElementById("mindMapContainer");
        if (!container) {
          throw new Error("Container element not found");
        }

        const MindMap = (await import("simple-mind-map")).default;
        const Themes = (await import("simple-mind-map-plugin-themes")).default;
        Themes.init(MindMap);
        const RichTextModule = await import("simple-mind-map/src/plugins/RichText.js");
        const RichText = RichTextModule.default || RichTextModule;
        const ExportModule = await import("simple-mind-map/src/plugins/Export.js");
        const Export = ExportModule.default || ExportModule;
        const DragModule = await import("simple-mind-map/src/plugins/Drag.js");
        const Drag = DragModule.default || DragModule;
        // Khởi tạo themeConfig với fontFamily Inter cho mọi node, ép kiểu config về any để tránh lỗi linter
        const themeConfigRaw = data.theme?.config as any;
        const themeConfig: any = {
          ...(themeConfigRaw || {}),
          fontFamily: "Inter, sans-serif",
          root: {
            ...(themeConfigRaw?.root || {}),
            fontFamily: "Inter, sans-serif",
            fontSize: 20,
          },
          second: {
            ...(themeConfigRaw?.second || {}),
            fontFamily: "Inter, sans-serif",
          },
          node: {
            ...(themeConfigRaw?.node || {}),
            fontFamily: "Inter, sans-serif",
          },
          generalization: {
            ...(themeConfigRaw?.generalization || {}),
            fontFamily: "Inter, sans-serif",
          },
        };

        const mindMap = new MindMap({
          el: container,
          data: data.root,
          viewData: data.view || {},
          readonly: false,
          layout: data.layout || "mindMap",
          fishboneDeg: 0,
          theme: data.theme?.template || "classic10",
          themeConfig: themeConfig as any,
          scaleRatio: 1,
          translateRatio: 1,
          minZoomRatio: 40,
          maxZoomRatio: 300,
          enableFreeDrag: true,
          defaultInsertBelowSecondLevelNodeText: "Thêm nút con",
          defaultInsertSecondLevelNodeText: "Thêm nút con",
          customTextWidth: 100,
          minNodeTextModifyWidth: 20,
          maxNodeTextModifyWidth: 300, // Giới hạn chiều rộng tối đa của text node
          view: data.view || {},
        } as any);
        mindMap.addPlugin(RichText);
        mindMap.addPlugin(Export);
        mindMap.addPlugin(Drag);
        setMindMapInstance(mindMap);
        mindMap.on("node_click", (node: any) => {
          setSelectedNode(node);
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing mind map:", error);
        addToast("Lỗi khi tải mindmap", "error");
        setIsLoading(false);
      }
    };

    initMindMap();

    return () => {
      if (mindMapInstance) {
        mindMapInstance.destroy();
      }
    };
  }, []);

  const value: MindMapContextType = {
    mindMapInstance,
    isLoading,
    zoom,
    selectedNode,
    toasts,
    addToast,
    removeToast,
  };

  return <MindMapContext.Provider value={value}>{children}</MindMapContext.Provider>;
};
