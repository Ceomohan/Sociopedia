import React from 'react'
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined
} from '@mui/icons-material'

import { Box, Divider, Typography, IconButton, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import Friends from '../../components/Friends'
import WidgjetWrapper from '../../components/WidjetWrapper'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPost } from '../../state/authSlice'


const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comment,
}) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const [isComments, setIsComments] = useState(false)
  const loggedInUser = useSelector((state) => state.user._id)
  const isLiked = Boolean(likes[loggedInUser])
  const likeCount = Object.keys(likes).length

  const { palette } = useTheme()
  const medium = palette.neutral.medium
  const primary = palette.primary.main

  const patchLike = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}`,
      {
        headers: {
          Authorization: ` Bearer ${token} `,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId: loggedInUser })
      })
    const updatedPost = await response.json()
    dispatch(setPost({ post: updatedPost }))
  }
  return (
    <WidgjetWrapper m="2rem 0">
      <Friends
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={medium} sx={{ mt: "0.7rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="cover"
          src={`http://localhost:3001/assets/${picturePath}`}
          style={{ borderRadius: "0.75rem", marginTop: "1rem" }}
        />
      )}
      <FlexBetween mt="1.5rem" >
        <FlexBetween gap="0.75rem" >

          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike()} >
              {isLiked ? (<FavoriteOutlined sx={{ color: primary }} />) : (<FavoriteBorderOutlined color={primary} />)}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>


          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)} >
              {<ChatBubbleOutlineOutlined />}
            </IconButton>
            <Typography>{comment.length}</Typography>
          </FlexBetween>

        </FlexBetween>
        <IconButton>{<ShareOutlined />}</IconButton>
      </FlexBetween>
      <Box mt="0.75rem">
        {comment.map((comment, i) => (
          <Box key={`${name}-${i}`}>
            <Divider />
            <Typography sx={{ color: { medium }, mt: "o.75rem 0", pl: "0.3rem" }}>{comment}</Typography>
          </Box>
          
        ))}
      </Box>
      <Divider />
    </WidgjetWrapper>

  )

}

export default PostWidget