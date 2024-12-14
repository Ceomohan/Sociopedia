import React from 'react'
import {
  PersonAddOutlined,
  PersonRemoveOutlined

} from '@mui/icons-material'
import {
  Typography,
  useTheme,
  Box,
  IconButton
} from "@mui/material"
import {useSelector,useDispatch} from "react-redux"
import FlexBetween from './FlexBetween'
import {setFriends} from '../state/authSlice'
import UserImage from './UserImage'
import {useNavigate} from 'react-router-dom'




const Friends = ({friendId,name,subtitle,userPicturePath}) => {
  const dispatch = useDispatch()
  const {_id} = useSelector((state)=>state.user)
  const token = useSelector((state)=>state.token)
  const friends = useSelector((state)=>state.user.friends)
  const navigate = useNavigate()

  const {palette} = useTheme()
  const primaryLight = palette.primary.light
  const primaryDark  = palette.primary.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main

  const isFriend = friends.find((friend)=>friend._id===friendId)

  const patchFriend = async ()=>{
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method:"PATCH",
        headers:{
          Authorization:` Bearer ${token} `,
          "Content-Type":"application/json"
      }
      }
    )
    const data = await response.json()
    dispatch(setFriends({friends:data}))
  }

  return (
   <FlexBetween>
    <FlexBetween gap="1rem">
      <UserImage image={userPicturePath} size="55px" />
      <Box
      onClick = {()=>{
        navigate(`/profile/${friendId}`)
        navigate(0) // this is for refreshing
      }}
      >
        <Typography
        color = {main}
        variant="h5"
        fontWeight="500"
        sx={{
          "&:hover":{
            color:palette.primary.light,
            cursor:"pointer"
          }
        }}
        >
          {name}
        </Typography>
        <Typography fontSize="0.75rem" color={medium}>
          {subtitle}
        </Typography>
      </Box>

    </FlexBetween>
    <IconButton
    onClick={()=>patchFriend()}
    sx={{
      backgroundColor:primaryLight,
      p:'0.6rem'
    }}
    >
      {isFriend ? (<PersonRemoveOutlined sx={{color:primaryDark}} />):(<PersonAddOutlined sx={{color:primaryDark}}/>)}
    </IconButton>
   </FlexBetween>
  )
}

export default Friends