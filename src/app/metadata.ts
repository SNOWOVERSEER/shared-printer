// app/metadata.ts
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PrintHub - Community Printing Service",
    description: "Easy document printing service for our community",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png" }],
    },
};
