import SwitchLang from "@/components/custom/SwitchLang";
import prisma from "@/src/lib/prisma";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
	const products = await prisma.product.findMany();
	const t = await getTranslations("home");
	const s = await getTranslations("shop");

	return (
		<div className="min-h-screen bg-gray-100">
			<header className="bg-white shadow p-4 flex items-center justify-between">
				<h1 className="text-xl font-bold text-gray-800">{s("title")}</h1>
				<SwitchLang />
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

