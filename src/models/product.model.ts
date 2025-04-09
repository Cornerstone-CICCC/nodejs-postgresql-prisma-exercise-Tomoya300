import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient()

const getAllProducts = async () => {
    return await prisma.product.findMany()
}

const getProductById = async (id: number) => {
    return await prisma.product.findUnique({where: { id }})
}

const addProduct = async (data: Omit<Product, 'id'>) => {
    return await prisma.product.create({ data })    
}

const editProduct = async (id: number, data: Partial<Product>) => {
    const foundProduct = await getProductById(id)
    if (!foundProduct) return null
    const updatedProduct = {
        productName: data.productName ?? foundProduct.productName,
        price: data.price ?? foundProduct.price
    }
    return await prisma.product.update({
        where: { id },
        data: updatedProduct
    })
}

const removeProduct = async (id: number) => {
    return await prisma.product.delete({where: { id }})
}

export default {
    getAllProducts,
    getProductById,
    addProduct,
    editProduct,
    removeProduct
}