const pool = require("../../db")
const {
    getOrdersByUserId,
    createMultipleOrders,
} = require("./queries")
const { v4: uuidv4 } = require('uuid');
const format = require('pg-format');


const getOrdersController = async(req,res) => {
    try{
        const { uniqueId } = req.headers
        const data = await pool.query(getOrdersByUserId, [uniqueId])
        res.status(200).json(data.rows)
    }catch(e){
        res.status(500).json({
            status: 500,
            response: "Some wrong. Please try later"
        })
    }
}

const createOrdersController = async(req,res) => {
    try{
        const { uniqueId } = req.headers
        if(!req.body){
            return res
                .status(401)
                .json({
                    status: 401,
                    message: "No required params"
                })
        }
        const orderId = uuidv4()
        const newArr = req.body.map((el) => {
            return [orderId, uniqueId, el]
        })
        await pool.query(format(createMultipleOrders, newArr))
        res.status(200).json({ 
            status: 200, 
            message: "Order was created"
        })
    }catch(e){
        res.status(500).json({
            status: 500,
            response: "Some wrong. Please try later"
        })
    }
}

module.exports = {
    getOrdersController,
    createOrdersController
}