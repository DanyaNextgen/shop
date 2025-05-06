import { redirect } from "next/navigation";
import { addProduct } from "../actions";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function NewProductPage() {
    async function createProduct(formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const price = parseFloat(formData.get("price") as string);
        const imageUrl = formData.get("imageUrl") as string;

        if (isNaN(price) || !title || !description || !imageUrl) {
            throw new Error("Missing required fields");
        }

        await addProduct(title, description, price, imageUrl);
        redirect("/admin/dashboard");
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            <div>
                <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-2 text-black"
                >
                    <FaArrowLeftLong />Назад
                </Link>
            </div>
            <h1 className="text-2xl font-bold mb-6">Добавить товар</h1>
            <form action={createProduct} className="space-y-4">
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
                <div>
                    <label htmlFor="imageUrl" className="block mb-1 font-semibold">
                        Ссылка на изображение
                    </label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        required
                        className="w-full border p-2 rounded"
                    />
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

