"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { UploadButton } from "@/src/utils/uploadthing";
import { MdCloudUpload } from "react-icons/md";
import { addProduct } from "../actions";

export default function NewProductPage() {
    const [imageUrl, setImageUrl] = useState(""); 
    const router = useRouter(); 

    const createProduct = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const price = parseFloat(formData.get("price") as string);
        const imageUrl = formData.get("imageUrl") as string;

        try {
            await addProduct(title, description, price, imageUrl);
            router.push("/admin/dashboard"); 
        } catch (error) {
            console.error(error);
            alert("Ошибка при создании товара");
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <div>
                <Link href="/admin/dashboard" className="flex items-center gap-2 text-black">
                    <FaArrowLeftLong /> Назад
                </Link>
            </div>
            <h1 className="text-2xl font-bold mb-6">Добавить товар</h1>
            <form onSubmit={createProduct} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block mb-1 font-semibold">
                        Название
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block mb-1 font-semibold">
                        Описание
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block mb-1 font-semibold">
                        Цена
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        required
                        step="0.01"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-base font-medium text-gray-700">
                        Картинка
                    </label>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center space-y-3">
                        <div className="text-gray-400 text-4xl">
                            <MdCloudUpload className="text-gray-400 cursor-pointer" />
                        </div>

                        <p className="text-sm text-gray-600">Выберите файл</p>

                        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                            Upload File
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res: any) => {
                                    const url = res?.[0]?.url;
                                    if (url) {
                                        setImageUrl(url); // Сохраняем URL изображения
                                        alert("Загрузка завершена");
                                    }
                                }}
                                onUploadError={(error: Error) => {
                                    alert(`Ошибка загрузки: ${error.message}`);
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>

                    {imageUrl && <input type="hidden" name="imageUrl" value={imageUrl} />}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Добавить товар
                </button>
            </form>
        </div>
    );
}
