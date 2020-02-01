const jwt = require("jsonwebtoken");

module.exports = {
    sign : (data, key)=>{
        return  jwt.sign(data,key);
    },

    verify : async (token, key) => {
        try{
            var data = await jwt.verify(token, key);
            return data;
        }
        catch(error)
        {
            return error;
        }
    }
}