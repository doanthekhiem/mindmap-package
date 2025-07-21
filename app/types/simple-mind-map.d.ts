declare module "simple-mind-map/src/plugins/RichText.js" {
  const RichText: any;
  export default RichText;
}

declare module "simple-mind-map/src/plugins/Export.js" {
  const Export: any;
  export default Export;
}

declare module "simple-mind-map/src/plugins/Drag.js" {
  const Drag: any;
  export default Drag;
}

declare module "simple-mind-map/src/parse/xmind.js" {
  const xmind: {
    parseXmindFile(file: File): Promise<any>;
    transformXmind(content: string): Promise<any>;
    transformOldXmind(content: string): Promise<any>;
  };
  export default xmind;
}

declare module "simple-mind-map/src/parse/markdown.js" {
  const markdown: {
    transformMarkdownTo(content: string): Promise<any>;
  };
  export default markdown;
}

declare module "simple-mind-map-plugin-themes" {
  const Themes: any;
  export default Themes;
}

declare module "xlsx" {
  export function read(data: any, options?: any): any;
  export function write(data: any, options?: any): any;
  export const utils: any;
}

declare module "simple-mind-map" {
  interface MindMapOptions {
    el: HTMLElement | string;
    data: any;
    viewData?: any;
    readonly?: boolean;
    layout?: string;
    fishboneDeg?: number;
    theme?: string;
    themeConfig?: any;
    scaleRatio?: number;
    translateRatio?: number;
    minZoomRatio?: number;
    maxZoomRatio?: number;
    enableFreeDrag?: boolean;
  }

  interface RichText {
    formatText(format: any): void;
    removeFormat(): void;
  }

  class MindMap {
    constructor(options: MindMapOptions);
    addPlugin(plugin: any): void;
    removePlugin(plugin: any): void;
    on(event: string, callback: (...args: any[]) => void): void;
    off(event: string, callback: (...args: any[]) => void): void;
    destroy(): void;
    zoomIn(): void;
    zoomOut(): void;
    zoomToFit(): void;
    zoomToActualSize(): void;
    execCommand(command: string, ...args: any[]): void;
    undo(): void;
    redo(): void;
    getData(): any;
    setData(data: any): void;
    setFullData(data: any): void;
    exportImage(options: any): void;
    export(type: string, isDownload: boolean, fileName?: string, ...args: any[]): any;
    view: {
      reset(): void;
    };
    richText?: RichText;
  }

  export default MindMap;
}
