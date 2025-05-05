import { PrismaClient } from "@/src/app/generated/prisma"

const prisma = new PrismaClient()

async function main() {
    const products = [
        {
            title: 'Wireless Headphones',
            description: 'High quality wireless headphones with noise cancellation.',
            price: 129.99,
            imageUrl: 'https://cdn.mos.cms.futurecdn.net/H45dC94VsuD7CMszsoJro3.png',
        },
        {
            title: 'Smart Watch',
            description: 'Track your fitness and get notifications on your wrist.',
            price: 199.99,
            imageUrl: 'https://joybox.uz/wp-content/uploads/2023/10/f3ccdd27d2000e3f9255a7e3e2c48800_102823140540.jpeg',
        },
        {
            title: 'Bluetooth Speaker',
            description: 'Loud and portable speaker for your music needs.',
            price: 89.99,
            imageUrl: 'https://5.imimg.com/data5/ECOM/Default/2024/10/455347710/ED/VE/HR/28325875/boat-stone-spinx-pro-bluetooth-speaker-with-20-w-rms-sound-up-to-8-hrs-of-playtime-419013-500x500.jpg',
        },
        {
            title: 'Gaming Mouse',
            description: 'Ergonomic mouse with customizable RGB lighting.',
            price: 49.99,
            imageUrl: 'https://m.media-amazon.com/images/I/61MJXznbAhS._SL1000_.jpg',
        },
        {
            title: 'Mechanical Keyboard',
            description: 'Tactile switches for a better typing experience.',
            price: 99.99,
            imageUrl: 'https://m.media-amazon.com/images/I/71LBvbVa95L._AC_UF894,1000_QL80_.jpg',
        },
        {
            title: '4K Monitor',
            description: 'Ultra HD monitor with vibrant colors and crisp detail.',
            price: 329.99,
            imageUrl: 'https://cdn.mediablog.mediapark.uz/corecms/post-images/01J4H16GYJQGH1JP6VVW8R5HXB.jpg',
        },
        {
            title: 'VR Headset',
            description: 'Experience immersive virtual reality like never before.',
            price: 399.99,
            imageUrl: 'https://i.pcmag.com/imagery/roundups/02Qp8NssQCHrqFVFEOXnkxr-28..v1623684908.jpg',
        },
        {
            title: 'Portable SSD',
            description: 'Fast and compact storage for all your files.',
            price: 149.99,
            imageUrl: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/HRQ12?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=ekF1Wk9BM2YxYXk2TjVQYTBkSVVmQWtuVHYzMERCZURia3c5SzJFOTlPaGlOZm1vUXN2cjVNeTNKZXZEclZjS1pzcXBPb0IvOVo4Z2pyYmtaS0ZBNHc',
        },
    ];

    for (const product of products) {
        await prisma.product.create({ data: product })
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
