import React from 'react'
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'

import Form from './Form'

const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreen = useMediaQuery("(min-width:1000px)")

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"

      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color="primary"

        >
          Sociopedia
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreen ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="5" sx={{ mb: "1.5rem" }}>
          Welcome! to SocioPedia Application
        </Typography>
        <Form />

      </Box>
    </Box>

  )
}

export default LoginPage