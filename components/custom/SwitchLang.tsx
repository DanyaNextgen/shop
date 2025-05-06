"use client";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const LANG_LABELS: Record<string, string> = {
    en: "EN",
    ru: "RU",
    uz: "UZ",
};

const SwitchLang = () => {
    const router = useRouter();
    const [currentLang, setCurrentLang] = useState("");

    useEffect(() => {
        const match = document.cookie.match(/locale=(\w{2})/);
        if (match?.[1]) setCurrentLang(match[1]);
    }, []);

    function handleLanguageChange(lang: string) {
        document.cookie = `locale=${lang}; path=/;`;
        setCurrentLang(lang);
        router.refresh();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-2 py-1 text-sm flex items-center gap-2 w-fit cursor-pointer">
                    <img
                        src={`/${currentLang}.png`}
                        alt={currentLang}
                        className="w-5 h-5"
                    />
                    <span>{LANG_LABELS[currentLang]}</span>
                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => handleLanguageChange("ru")}
                >
                    <img src="/ru.png" alt="" className="w-5 h-5" />
                    <span>RU</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => handleLanguageChange("en")}
                >
                    <img src="/en.png" alt="" className="w-5 h-5" />
                    <span>EN</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="cursor-pointer flex items-center gap-2"
                    onClick={() => handleLanguageChange("uz")}
                >
                    <img src="/uz.png" alt="" className="w-5 h-5" />
                    <span>UZ</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SwitchLang;
