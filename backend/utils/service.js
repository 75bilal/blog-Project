const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function gernateAccessToken(user){

     const payload = {
        id : user._id,
        name : user.name,
        email : user.email
     };

    return  jwt.sign(payload , jwtSecret);

}
function verifyToken(token){
   return  jwt.verify(token , jwtSecret);
}
module.exports =  {
   gernateAccessToken  , verifyToken
};