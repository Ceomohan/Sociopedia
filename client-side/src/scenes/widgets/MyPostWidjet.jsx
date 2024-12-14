import {
    EditOutlined,
    DeleteOutline,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
    
} from "@mui/icons-material"

import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery
} from "@mui/material"
import FlexBetween from "../../components/FlexBetween"
import DropZone from "react-dropzone"
import WidjetWrapper from "../../components/WidjetWrapper"
import UserImage from "../../components/UserImage"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPosts } from "../../state/authSlice"

const MyPostWidjet = ({ picturePath }) => {
    const [isImage, setIsImage] = useState(false)
    const [image, setImage] = useState(null)
    const [post, setPost] = useState("")
    const { palette } = useTheme()
    const { _id } = useSelector((state) => state.user)
    const { token } = useSelector((state) => state.token)
    const mediumMain = palette.neutral.mediumMain
    const medium = palette.neutral.medium
    const isNonMobileScreen = useMediaQuery("(min-width:1000px)")
    const dispatch = useDispatch()

    const handlePost = async () => {
        const formData = new FormData()
        formData.append("userId", _id)
        formData.append("description", post)
        if (image) {
            formData.append("picture", image)
            formData.append("picturePath", image.name)
        }

        const response = await fetch(`http://localhost:3001/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        })

        const posts = await response.json()
        dispatch(setPosts({ posts }))
        setImage(null)
        setPost("")
    }

    return (
        <WidjetWrapper>
            <FlexBetween>
                <UserImage picturePath={picturePath} />
                <InputBase
                    placeholder="what's on your mind"
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem"
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="2rem"
                    p="1rem"
                >
                    <DropZone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Add Image Here</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>{image.name}</Typography>
                                            <EditOutlined />
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
                                        sx={{ width: "15%" }}
                                    >
                                        <DeleteOutline />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </DropZone>
                </Box>
            )}
            <Divider sx={{ margin: "1.25rem 0" }} />
            <FlexBetween >

                <FlexBetween onClick={() => setIsImage(!isImage)} gap="1.25rem">
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography
                        color={mediumMain}
                        sx={{ "&hover": { cursor:"pointer", color: { mediumMain } } }}
                    >
                        Image
                    </Typography>

                </FlexBetween>
                {isNonMobileScreen ? (
                    <>
                        <FlexBetween gap="0.25rem">
                            <GifBoxOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <AttachFileOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Attachement</Typography>
                        </FlexBetween>

                        <FlexBetween gap="0.25rem">
                            <MicOutlined sx={{ color: mediumMain }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetween>
                    </>

                ) : (
                    <FlexBetween gap="0.25rem">
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetween>
                )}
                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.primary.main,
                        backgroundColor: palette.background.alt,
                        borderRadius: "3rem",
                    }}
                >
                    POST
                </Button>
            </FlexBetween>
        </WidjetWrapper>
    )

}

export default MyPostWidjet