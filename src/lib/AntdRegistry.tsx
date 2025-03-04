"use client"; // 标记为客户端组件

import React from "react";
// 导入Ant Design的CSS-in-JS解决方案
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import type Entity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation"; // Next.js的钩子，用于在服务器端渲染时插入HTML

// 创建一个组件，用于在Next.js中注册Ant Design的样式
const StyledComponentsRegistry = ({ children }: React.PropsWithChildren) => {
  // 创建一个缓存实例，用于存储样式
  // useMemo确保缓存只创建一次
  const cache = React.useMemo<Entity>(() => createCache(), []);

  // 使用Next.js的钩子，在服务器端渲染时插入样式
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} // 从缓存中提取样式并插入
    />
  ));

  // 使用StyleProvider包装子组件，提供样式缓存
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;
