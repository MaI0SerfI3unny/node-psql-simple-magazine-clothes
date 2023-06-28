const pool = require("../../db")
const { 
    getUserByEmail,
    createUser
} = require("./queries")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const loginUserController = async(req,res) => {
    try{
        const {email, password} = req.body
        if (!(email && password)) {
            return res
                .status(401)
                .json({
                    status: 401,
                    message: "No required params"
                })
        }
        const getUserByEmailExist = await pool.query(getUserByEmail, [email])
        if (!getUserByEmailExist.rows.length) {
            return res
                .status(404)
                .json({
                    status: 404,
                    message: "User not found"
                }) 
        }
        const checkCompare = await bcrypt.compare(password, getUserByEmailExist.rows[0].password)
        if(!checkCompare){
            return res
            .status(400)
            .json({
                status: 400,
                message: "Invalid credentials"
            }) 
        }
        const token = jwt.sign({ user: getUserByEmailExist.rows[0] },
            process.env.TOKEN_KEY, { expiresIn: "2h" });
        res.status(200).json(token);
    }catch(e){
        res.status(500).json({
            status: 500,
            response: "Some wrong. Please try later"
        })
    }
}

const registerUserController = async(req,res) => {
    try{
        let {email, password, name, surname} = req.body
        if (!(email && password && name && surname)) {
            return res
                .status(401)
                .json({ 
                    status: 401,
                    message: "No required params"
                })
        }
        const getUserByEmailExist = await pool.query(getUserByEmail, [email])
        if(getUserByEmailExist.rows.length){
            return res
                .status(401)
                .json({ 
                    status: 401,
                    message: "No required params"
                })
        }
        password = await bcrypt.hash(password, 10);
        await pool.query(createUser, [name, surname, email, password])

        res.status(200).json({
            status: 200,
            message: "User was successfully created"
        })
    }catch(e){
        res.status(500).json({
            status: 500,
            response: "Some wrong. Please try later"
        })
    }
}


module.exports = {
    loginUserController,
    registerUserController
}