"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function Header() {
    return (
        <header className="w-full">
            <div className="flex justify-end p-4">
                <DynamicWidget />
            </div>
        </header>
    );
}
