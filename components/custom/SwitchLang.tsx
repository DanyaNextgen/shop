"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const SwitchLang = () => {
    const router = useRouter();

    function handleLanguageChange(lang: string) {
        document.cookie = `locale=${lang}; path=/;`;
        router.refresh();
    }

    return (
        <div className="space-x-2">
            <button onClick={() => handleLanguageChange("ru")} className="px-3 py-1 border rounded text-sm text-black cursor-pointer">ru</button>
            <button onClick={() => handleLanguageChange("en")} className="px-3 py-1 border rounded text-sm text-black cursor-pointer">en</button>
            <button onClick={() => handleLanguageChange("uz")} className="px-3 py-1 border rounded text-sm text-black cursor-pointer">uz</button>
        </div>
    );
}

export default SwitchLang;