import { useMindMap } from '../contexts/MindMapContext';

export const useImport = () => {
  const { mindMapInstance, addToast } = useMindMap();

  // Import smm, json
  const handleImportSMM = async (file: File) => {
    if (!mindMapInstance) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Kiểm tra xem data có chứa root property không
      if (data.root) {
        // Nếu có root, sử dụng setFullData để import dữ liệu đầy đủ
        mindMapInstance.setFullData(data);
      } else {
        // Nếu không có root, sử dụng setData để import chỉ node tree
        mindMapInstance.setData(data);
      }
      
      // Reset view để đảm bảo mindmap hiển thị trong vùng nhìn
      mindMapInstance.view.reset();
      addToast("Đã import file SMM thành công", "success");
    } catch (error) {
      addToast("Lỗi khi import file SMM", "error");
    }
  };

  const handleImportJSON = async (file: File) => {
    if (!mindMapInstance) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      // Kiểm tra xem data có chứa root property không
      if (data.root) {
        // Nếu có root, sử dụng setFullData để import dữ liệu đầy đủ
        mindMapInstance.setFullData(data);
      } else {
        // Nếu không có root, sử dụng setData để import chỉ node tree
        mindMapInstance.setData(data);
      }
      
      // Reset view để đảm bảo mindmap hiển thị trong vùng nhìn
      mindMapInstance.view.reset();
      addToast("Đã import file JSON thành công", "success");
    } catch (error) {
      addToast("Lỗi khi import file JSON", "error");
    }
  };

  // Import xmind
  const handleImportXMind = async (file: File) => {
    if (!mindMapInstance) return;

    try {
      // Import xmind parser
      const xmindModule = await import('simple-mind-map/src/parse/xmind.js');
      const xmind = xmindModule.default || xmindModule;
      
      const data = await xmind.parseXmindFile(file);
      mindMapInstance.setData(data);
      mindMapInstance.view.reset();
      addToast("Đã import file XMind thành công", "success");
    } catch (error) {
      addToast("Lỗi khi import file XMind", "error");
    }
  };

  // Import xlsx
  const handleImportXLSX = async (file: File) => {
    if (!mindMapInstance) return;

    try {
      // Import xlsx library
      const { read, utils } = await import('xlsx');
      
      // Convert file to buffer
      const fileToBuffer = (file: File) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsArrayBuffer(file);
        });
      };

      // Transform XLSX to JSON
      const transformXLSXToJson = async (file: File) => {
        const wb = read(await fileToBuffer(file));
        const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
          header: 1
        });
        
        if (data.length <= 0) {
          return;
        }
        
        let max = 0;
        data.forEach((arr: any) => {
          if (arr.length > max) {
            max = arr.length;
          }
        });
        
        let layers: any[] = [];
        let walk = (layer: number) => {
          if (!layers[layer]) {
            layers[layer] = [];
          }
          for (let i = 0; i < data.length; i++) {
            if (data[i][layer]) {
              let node = {
                data: {
                  text: data[i][layer]
                },
                children: [],
                _row: i
              };
              layers[layer].push(node);
            }
          }
          if (layer < max - 1) {
            walk(layer + 1);
          }
        };
        walk(0);
        
        let getParent = (arr: any[], row: number) => {
          for (let i = arr.length - 1; i >= 0; i--) {
            if (row >= arr[i]._row) {
              return arr[i];
            }
          }
        };
        
        for (let i = 1; i < layers.length; i++) {
          let arr = layers[i];
          for (let j = 0; j < arr.length; j++) {
            let item = arr[j];
            let parent = getParent(layers[i - 1], item._row);
            if (parent) {
              parent.children.push(item);
            }
          }
        }

        return layers[0][0];
      };

      const data = await transformXLSXToJson(file);
      if (data) {
        mindMapInstance.setData(data);
        mindMapInstance.view.reset();
        addToast("Đã import file XLSX thành công", "success");
      } else {
        addToast("File XLSX không có dữ liệu hợp lệ", "error");
      }
    } catch (error) {
      addToast("Lỗi khi import file XLSX", "error");
    }
  };

  // Import md
  const handleImportMD = async (file: File) => {
    if (!mindMapInstance) return;

    try {
      // Import markdown parser
      const markdownModule = await import('simple-mind-map/src/parse/markdown.js');
      const markdown = markdownModule.default || markdownModule;
      
      const fileContent = await file.text();
      const data = await markdown.transformMarkdownTo(fileContent);
      mindMapInstance.setData(data);
      mindMapInstance.view.reset();
      addToast("Đã import file Markdown thành công", "success");
    } catch (error) {
      addToast("Lỗi khi import file Markdown", "error");
    }
  };

  // Auto detect file type and import
  const handleImportFile = async (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'smm':
        await handleImportSMM(file);
        break;
      case 'json':
        await handleImportJSON(file);
        break;
      case 'xmind':
        await handleImportXMind(file);
        break;
      case 'xlsx':
        await handleImportXLSX(file);
        break;
      case 'md':
        await handleImportMD(file);
        break;
      default:
        addToast("Định dạng file không được hỗ trợ", "error");
    }
  };

  return {
    handleImportSMM,
    handleImportJSON,
    handleImportXMind,
    handleImportXLSX,
    handleImportMD,
    handleImportFile,
  };
}; 