const express = require("express");
const jwt = require("jsonwebtoken");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
function auth(req, res, next) {
    const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({ msg: 'Token required' }); 
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if(err) {
           return res.status(401).json({ msg: err }); 
        }

        res.locals.user = data;
		next();
    });
}

module.exports = { auth };
