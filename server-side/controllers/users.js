import User from "../models/User.js";


// This is for Getting the user
export const getUser = async(req,res)=>{
    try{
        const {id} = req.params.id
        const user = await User.findById(id)
        res.status(200).json(user)
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

export const getUserFriends = async(req,res)=>{
    try{
        const {id}= req.params 
        const user = await User.findById(id)
        const friends = await Promise.all(
            user.friends.map((id)=>user.findById(id))
        )
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location,picturepath})=>{
                return {_id,firstName,lastName,occupation,location,picturepath}
            }
        )

        res.status(200).json(formattedFriends)

    }catch(err){
        res.status(404).json({message:err.message})
    }

}

export const addRemoveFriend = async(req,res)=>{
    try{
        const {id,friendId} = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if(user.friends.includes(friendId)){     
            user.friends = user.friends.filter((id)=>id !== friendId)       // HERE I AM REMOVING THE FRIEND WHICH IS IN THE users.friends  FROM THE USER MODEL WHICH IS STRUCTURED EARILIER BY USING THE FILTER FUNCTION
            friend.friends = friend.friends.filter((id)=> id !==id)         // AND HERE I AM REMOVING THE USER IN THE USER FRIEND LIST BY USING THE FILTER FUNCTION OF JAVASCRIPT 
        }
        else{
            user.friends.push(friendId)  // HERE I AM PUSHING THE FRIEND THE FRIEND IF THE USER DOES NOT HAVE A FRIEND 
            friend.friends.push(id)      // AND HERE PUSHING THE USER INTO THE FRIEND
        }

        await user.save()   // SAVING THE USER
        await friend.save() // SAVING THE FRIEND 

        const friends = await Promise.all(
            user.friends.map((id)=>user.findById(id))
        )
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location,picturepath})=>{
                return {_id,firstName,lastName,occupation,location,picturepath}
            }
        )

        res.status(200).json(formattedFriends)


    }catch(err){
        res.status(404).json({message:err.message})
    }
}