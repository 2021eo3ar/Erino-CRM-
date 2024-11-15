import {z} from 'zod'

// define contact schema 
const contactSchema = z.object({
    firstName : z.string().min(1,{message:"First Name is required"}),
    lastName : z.string().min(1,{message:"First Name is required"}),
    email : z.string().email({message : "invalid email format"}),
    phoneNumber : z.string().min(10,{message:"phone number is requried"}),
    company : z.string().optional(),
    jobTitle : z.string().optional()
})

export const validateContact = (req, res, next) =>{
    try {
        // validate the request body against schema
        contactSchema.parse(req.body);
        //  if successfull go to next process
        next()
    } catch (error) {
        res.status(400).json({
            success : false,
            message: error.errors.map(err => err.message).join(', ')
        })
    }
}

