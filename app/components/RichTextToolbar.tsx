import { useEffect, useState } from "react";

interface RichTextToolbarProps {
  mindMapInstance: any;
  isVisible: boolean;
  position: { left: number; top: number } | null;
  formatInfo: any;
}

export function RichTextToolbar({ mindMapInstance, isVisible, position, formatInfo }: RichTextToolbarProps) {
  const [currentFormat, setCurrentFormat] = useState<any>({});

  useEffect(() => {
    if (formatInfo) {
      setCurrentFormat(formatInfo);
    }
  }, [formatInfo]);

  const toggleBold = () => {
    console.log("mindMapInstance", mindMapInstance);
    const newBold = !currentFormat.bold;
    setCurrentFormat((prev: any) => ({ ...prev, bold: newBold }));
    if (mindMapInstance?.richText) {
      mindMapInstance.richText.formatText({ bold: newBold });
    }
  };

  const toggleItalic = () => {
    const newItalic = !currentFormat.italic;
    setCurrentFormat((prev: any) => ({ ...prev, italic: newItalic }));
    if (mindMapInstance?.richText) {
      mindMapInstance.richText.formatText({ italic: newItalic });
    }
  };

  const toggleUnderline = () => {
    const newUnderline = !currentFormat.underline;
    setCurrentFormat((prev: any) => ({ ...prev, underline: newUnderline }));
    if (mindMapInstance?.richText) {
      mindMapInstance.richText.formatText({ underline: newUnderline });
    }
  };

  const toggleStrike = () => {
    const newStrike = !currentFormat.strike;
    setCurrentFormat((prev: any) => ({ ...prev, strike: newStrike }));
    if (mindMapInstance?.richText) {
      mindMapInstance.richText.formatText({ strike: newStrike });
    }
  };

  const changeColor = () => {
    const newColor = 'red';
    setCurrentFormat((prev: any) => ({ ...prev, color: newColor }));
    if (mindMapInstance?.richText) {
      mindMapInstance.richText.formatText({ color: newColor });
    }
  };

  const removeFormat = () => {
    setCurrentFormat({});
    if (mindMapInstance?.richText) {
      mindMapInstance.richText.removeFormat();
    }
  };

  if (!isVisible || !position) {
    return null;
  }

  return (
    <div
      className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex items-center space-x-1"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        transform: "translateX(-50%)",
      }}
    >
      {/* Bold */}
      <button
        onClick={toggleBold}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          currentFormat.bold ? "bg-blue-100 text-blue-600" : "text-gray-700"
        }`}
        title={currentFormat.bold ? "取消加粗" : "加粗"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.6 11.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 7.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" />
        </svg>
      </button>

      {/* Italic */}
      <button
        onClick={toggleItalic}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          currentFormat.italic ? "bg-blue-100 text-blue-600" : "text-gray-700"
        }`}
        title={currentFormat.italic ? "取消斜体" : "斜体"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" />
        </svg>
      </button>

      {/* Underline */}
      <button
        onClick={toggleUnderline}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          currentFormat.underline ? "bg-blue-100 text-blue-600" : "text-gray-700"
        }`}
        title={currentFormat.underline ? "取消下划线" : "下划线"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" />
        </svg>
      </button>

      {/* Strikethrough */}
      <button
        onClick={toggleStrike}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          currentFormat.strike ? "bg-blue-100 text-blue-600" : "text-gray-700"
        }`}
        title={currentFormat.strike ? "取消删除线" : "删除线"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.24 8.75c-.26-.48-.39-1.03-.39-1.67 0-1.84 1.61-3.23 3.77-3.23 1.3 0 2.6.61 3.14 1.59l1.31-.92C14.77 2.86 13.23 2 11.39 2c-3.15 0-5.74 2.41-5.74 5.4 0 .49.08.98.27 1.44-.13.05-.25.1-.36.15-1.4.63-2.93 1.51-2.93 3.09 0 1.38 1.54 2.27 2.89 2.89.48.18.98.27 1.5.27.24 0 .47-.03.71-.08.29-.06.6-.15.9-.27.15-.06.3-.13.44-.2.35-.16.65-.35.92-.57v2.57c-.28.21-.6.39-.95.54-.29.14-.62.26-.96.35-.34.09-.7.13-1.07.13-1.17 0-2.23-.37-2.64-1.13zm7.17 1.85c-.15-.05-.31-.1-.48-.14-.16-.04-.34-.07-.51-.07-.76 0-1.53.23-1.53.92 0 .69.77.92 1.53.92.17 0 .35-.03.51-.07.17-.04.33-.09.48-.14.29-.1.53-.26.72-.46.19-.2.33-.45.33-.74 0-.29-.14-.54-.33-.74-.19-.2-.43-.36-.72-.46z" />
        </svg>
      </button>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      {/* Text Color */}
      <button
        onClick={changeColor}
        className={`p-2 rounded hover:bg-gray-100 transition-colors ${
          currentFormat.color ? "bg-blue-100 text-blue-600" : "text-gray-700"
        }`}
        title="颜色"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.84 0 1.5-.66 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 7.67 8 8.5S8.67 10 9.5 10s1.5-.67 1.5-1.5S10.33 7 9.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S11.67 8 12.5 8s1.5.67 1.5 1.5S13.33 11 12.5 11zm3-4c-.83 0-1.5-.67-1.5-1.5S14.67 5 15.5 5s1.5.67 1.5 1.5S16.33 8 15.5 8z" />
        </svg>
      </button>

      {/* Clear Format */}
      <button
        onClick={removeFormat}
        className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-700"
        title="清除格式"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  );
}
