"use server";

import prisma from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProducts() {
    return await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function deleteProduct(id: number) {
    await prisma.product.delete({
        where: { id },
    });
    revalidatePath("/dashboard/products"); 
}

export async function addProduct(
    title: string,
    description: string,
    price: number,
    imageUrl: string
) {
    await prisma.product.create({
        data: {
            title,
            description,
            price,
            imageUrl,
        },
    });

    revalidatePath("/dashboard/products"); 
}
