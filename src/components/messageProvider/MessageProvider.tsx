'use client';

import { message } from 'antd';
import { MessageContext } from '@/contexts/MessageContext';

export default function MessageProvider({ children }: { children: React.ReactNode }) {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <MessageContext.Provider value={{ messageApi }}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
}