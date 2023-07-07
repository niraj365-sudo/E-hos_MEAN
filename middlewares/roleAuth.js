const roleAuthentication=(role)=>{
    return (req,res,next)=>{
        const userRole = req.user?.role;
        if(Array.isArray(role)){
            if(role.includes(userRole)){
                next()
            }else{
                next(Error("UnAuthorize"))
            }
        }
        if(userRole===role){
            next()
        }else{
            next(Error("UnAuthorize"))
        }
    }
}

module.exports = roleAuthentication;