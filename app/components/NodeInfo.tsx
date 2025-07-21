import { useState, useEffect } from 'react';

interface NodeInfoProps {
  node: any;
  onClose: () => void;
  onUpdateNode: (node: any, newText: string) => void;
}

export function NodeInfo({ node, onClose, onUpdateNode }: NodeInfoProps) {
  const [text, setText] = useState(node?.data?.text || '');

  useEffect(() => {
    setText(node?.data?.text || '');
  }, [node]);

  const handleSave = () => {
    if (node && text.trim()) {
      onUpdateNode(node, text);
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  if (!node) return null;

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Thông tin Node</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nội dung:
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Nhập nội dung node..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID:
          </label>
          <input
            type="text"
            value={node.data?.uid || ''}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            Mở rộng:
          </label>
          <span className={`px-2 py-1 rounded text-xs ${
            node.data?.expand ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {node.data?.expand ? 'Có' : 'Không'}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">
            Rich Text:
          </label>
          <span className={`px-2 py-1 rounded text-xs ${
            node.data?.richText ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {node.data?.richText ? 'Có' : 'Không'}
          </span>
        </div>
        
        {node.data?.dir && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hướng:
            </label>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
              {node.data.dir}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex space-x-2 mt-4">
        <button
          onClick={handleSave}
          className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Lưu
        </button>
        <button
          onClick={onClose}
          className="flex-1 px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Hủy
        </button>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Nhấn Ctrl+Enter để lưu nhanh
      </div>
    </div>
  );
} 