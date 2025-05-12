import { ourFileRouter } from "@/app/api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="p-4">
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            {children}
        </div>
    );
}

