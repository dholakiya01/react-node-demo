const Profilevalidation = (user) => {
    let error = {}

    if(user.name === ""){
        error.name = "name is required"
    }
    if(user.email === ""){
        error.email = "email is required"
    }
    if(user.message === ""){
        error.message = "message is required"
    }
    return error
}

export default Profilevalidation
