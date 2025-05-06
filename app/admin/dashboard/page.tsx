"use client"; 

import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import { getProducts, deleteProduct } from "./actions"; 
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function DashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function loadProducts() {
            const productsData = await getProducts();
            setProducts(productsData);
        }
        loadProducts();
    }, []);

    const handleDelete = async (productId: number) => {
        try {
            await deleteProduct(productId);
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            ); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-3">Добро пожаловать в админку!</h1>

            <Link
                    href="/"
                    className="flex items-center gap-2 text-black mb-3"
                >
                    <FaArrowLeftLong />На главную
            </Link>

            <Link href="/admin/dashboard/new">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center cursor-pointer">
                    <IoMdAdd className="mr-2" />
                    Добавить товар
                </button>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden p-4 cursor-pointer select-none hover:shadow-xl transition-shadow duration-300"
                    >
                        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                        <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-full object-cover mb-2"
                        />
                        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                        <p className="font-bold">{product.price} $</p>

                        <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 flex mt-2 cursor-pointer"
                        >
                            <CiCircleRemove className="text-2xl" /> Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}




