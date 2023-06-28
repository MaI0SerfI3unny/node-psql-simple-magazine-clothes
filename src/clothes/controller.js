const pool = require("../../db")
const {
    createClothes,
    getClothes,
    getClothesById,
    delClothes,
    putClothes
} = require("./queries")

const getClothesController = async(req,res) => {
    try{
        const { id = "" } = req.query
        const data = id ? await pool.query(getClothesById, [id]) : await pool.query(getClothes)
        res.status(200).json(data.rows)
    }catch(e){
        res.status(500).json({
            status: 500,
            response: "Some wrong. Please try later"
        })
    }
}

const createClothesController = async(req,res) => {
    try{
        const { title, description, size, price } = req.body
        if(!description || !title || 
            !size || !price){
            return res
                .status(401)
                .json({
                    status: 401,
                    message: "No required params"
                })
        }
        const data = await pool.query(createClothes, [title, description, size, price])
        res.status(200).json(data.rows)
    }catch(e){
        res.status(500).json({
            status: 500,
            response: "Some wrong. Please try later"
        })
    }
}

const putClothesController = async(req,res) => {
    try{
        const { description } = req.body
        const { id } = req.query
        if(!description || !id){
            return res
            .status(401)
            .json({
                status: 401,
                message: "No required params"
            })
        }
        const findExist = await pool.query(getClothesById, [id]) 
        if(!findExist){
            return res
            .status(404)
            .json({
                status: 404,
                message: "Wasn`t founded"
            })
        }
        await pool.query(putClothes, [description,id])
        res.status(200).json({
            status: 200,
            message: "Clothes was updated successfully"
        })
    }catch (e) {
        res.status(500).json({
            status: 500,
            response: "Some wrong. Please try later"
        })
    }
}

const deleteClothesController = async(req,res) => {
    try{
        const { id = "" } = req.query
        if(!id){
            return res
                .status(401)
                .json({
                    status: 401,
                    message: "No required params"
                })
        }

        await pool.query(delClothes, [id])
        res.status(200).json({
            status: 200,
            message: "Clothes was deleted successfully"
        })
    }catch(e){
        res.status(500).json({
            status: 500,
            response: "Some wrong. Please try later"
        })
    }
}

module.exports = {
    createClothesController,
    getClothesController,
    deleteClothesController,
    putClothesController
}