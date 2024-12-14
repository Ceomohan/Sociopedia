import {
    ManageAccountsOutlined,
    EditOutlined,
    WorkOutlineOutlined

} from "@mui/icons-material"
import { Box, Typography, Divider, useTheme } from "@mui/material"
import UserImage from "../../components/UserImage"
import WidjetWrapper from "../../components/WidjetWrapper"
import FlexBetween from "../../components/FlexBetween"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import linkendIn from "../../assets/linkedin.png"
import twitter from "../../assets/twitter.png"

const UserWidjet = ({ userId, picturePath }) => {
    const [user, setUser] = useState(null)
    const { palette } = useTheme()
    const navigate = useNavigate()
    const token = useSelector((state) => state.token)
    const dark = palette.neutral.dark
    const medium = palette.neutral.medium
    const main = palette.neutral.main

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        const data = response.json()
        setUser(data)

    }
    useEffect(() => {
        getUser()
    },[])  // in this effect when we render the page after loggin the user will information will be rendered since the array is empty

    if (!user) {
        return null
    }

    const {
        firstName,
        lastName,
        occupation,
        location,
        viewedProfile,
        impressions,
        friends
    } = user


    return (
        <WidjetWrapper>
            {/* First Row */}
            <FlexBetween
                gap="0.75rem"
                pb="1.1rem"
                onClick={() => navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={picturePath} />
                    <Box>
                        <Typography
                            variant="h4"
                            fontWeight="500"
                            color={dark}
                            sx={{
                                "& hover": {
                                    color: palette.primary.light,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {firstName} {lastName}

                        </Typography>
                        <Typography>{friends} friends</Typography>
                    </Box>

                </FlexBetween>
                <ManageAccountsOutlined />
            </FlexBetween>

            <Divider />
            {/* Second  Row */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.75rem">
                    <ManageAccountsOutlined fontSize="large" sx={{ color: { main } }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" >
                    <WorkOutlineOutlined fontSize="large" sx={{ color: { main } }} />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            <Divider />
            {/* Third  Row */}
            <Box>
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Who's viewed your profile</Typography>
                    <Typography color={main} fontWeight="500" >{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween mb="0.5rem">
                    <Typography color={medium}>Impressions on your profile</Typography>
                    <Typography color={main} fontWeight="500" >{impressions}</Typography>
                </FlexBetween>
            </Box>
            <Divider />
            {/* Fourth  Row */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">Social Profile</Typography>
                <FlexBetween gap="1rem" mb="0.75rem" >
                    <FlexBetween gap="0.75rem">
                        <img src={twitter} alt="twitter" />
                        <Box>
                            <Typography color={main} fontWeight="500">Twitter</Typography>
                            <Typography color={medium}>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: { main } }} />
                </FlexBetween>

                <FlexBetween gap="1rem" >
                    <FlexBetween gap="0.75rem">
                        <img src={linkendIn} alt="linkedIn" />
                        <Box>
                            <Typography color={main} fontWeight="500">LinkedIn</Typography>
                            <Typography color={medium}>Network Profile</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined sx={{ color: { main } }} />
                </FlexBetween>
            </Box>
        </WidjetWrapper>
    )
}

export default UserWidjet

