import { Request, Response } from "express";
import productModel from "../models/product.model";
import { Product } from "@prisma/client";

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await productModel.getAllProducts()
        res.status(200).json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: `Server error`})
    }
}

const getProductById = async (req: Request<{id: number}>, res: Response) => {
    try {
        const id = Number(req.params.id)
        const product = await productModel.getProductById(id)
        if (!product) {
            res.status(404).json({message: `Product not found`})
            return
        }
        res.status(200).json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: `Unable to fetch product`})
    }
}

const addProduct = async (req: Request<{}, {}, Omit<Product, 'id'>>, res: Response) => {
    try {
        const { productName, price } = req.body
        const product = await productModel.addProduct({
            productName,
            price
        })
        res.status(201).json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: `Unable to add product`})
    }
}

const updateProductById = async (req: Request<{id: number}, {}, Partial<Product>>, res: Response) => {
    try {
        const id = Number(req.params.id)
        const { productName, price } = req.body
        const product = await productModel.editProduct(id, {
            productName,
            price
        })
        if (!product) {
            res.status(404).json({message: `Product not found`})
            return 
        }
        res.status(200).json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: `Unable to update product`})
    }
}

const deleteProductById = async (req: Request<{id: number}>, res: Response) => {
    try {
        const id = Number(req.params.id)
        const product = await productModel.removeProduct(id)
        res.status(200).json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: `Unable to delete product`})
    }
}

export default {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById
}