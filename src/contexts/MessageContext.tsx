'use client';
import { createContext, useContext } from 'react';
import { message } from 'antd';

export const MessageContext = createContext<{
    messageApi: ReturnType<typeof message.useMessage>[0];
}>({
    messageApi: message.useMessage()[0],
});

export const useGlobalMessage = () => {
    return useContext(MessageContext);
};
