interface Window {
    Doc: {
      createOpenViewer: (node: HTMLElement, options: any) => any;
      // 如果 `window.Doc` 还有其他属性，可以在这里继续添加它们的类型声明
    };
  }