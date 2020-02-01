const jwt = require("jsonwebtoken");

module.exports = {
    sign : (data, secret)=>{
        return jwt.sign(data,secret);
    },

    verify : async (token, secret) =>{
        try
        {
            data = await jwt.verify(token, secret);
            return {data};
        }
        catch(error)
        {
            return {error};
        }
    } 
}