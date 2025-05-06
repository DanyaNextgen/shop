import SwitchLang from "@/components/custom/SwitchLang";
import prisma from "@/src/lib/prisma";
import { getTranslations } from "next-intl/server";
import Link from "next/link"; 

export default async function HomePage() {
	const products = await prisma.product.findMany();
	const t = await getTranslations("home");
	const s = await getTranslations("shop");
	const a = await getTranslations("admin");

	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-white shadow p-5 flex items-center justify-between">
				<h1 className="text-xl font-bold text-gray-800">{s("title")}</h1>
				<div className="flex items-center space-x-4">
					<SwitchLang />
					<Link href="/admin">
						<button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
							{a("title")}
						</button>
					</Link>
				</div>
			</header>

			<div className="flex flex-col items-center justify-center text-center p-5 text-black">
				<h1 className="text-2xl font-bold">{t("title")}</h1>
				<p className="text-lg">{t("description")}</p>
			</div>

			<main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<div
						key={product.id}
						className="bg-white shadow-md rounded-lg overflow-hidden p-4 cursor-pointer select-none hover:shadow-xl transition-shadow duration-300"
					>
						<h2 className="text-lg text-black font-semibold">{product.title}</h2>
						<img
							src={product.imageUrl}
							alt={product.title}
							className="w-full object-cover"
						/>
						<div>
							<p className="text-gray-500 text-sm mb-2">{product.description}</p>
							<p className="text-black font-bold">{product.price} $</p>
						</div>
					</div>
				))}
			</main>
		</div>
	);
}


