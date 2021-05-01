import React, { useState } from 'react'
import { Button, Container, Grid, TextField, Typography, Avatar, Box, Link } from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face';
import { createUser } from './UserService'

const SignUp = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleIdChange = (event) => { setId(event.target.value); }
    const handlePasswordChange = (event) => { setPassword(event.target.value); }
    const handleNameChange = (event) => { setName(event.target.value); }

    const handleSubmit = async(event) => {
        event.preventDefault();
        var data = {
          id: id,
          password: password,
          name : name
        };
        try {
          let response = await createUser(data);
          let res = await response.json();
          console.log(res);
          alert('회원가입을 축하합니다 ^^')
        } catch (err) {
          console.error('Error')
        }
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <div>
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} align="center">
                                <Avatar>
                                    <FaceIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    회원 가입
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="id"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="id"
                                    label="아이디"
                                    autoFocus
                                    onChange={handleIdChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="비밀번호"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handlePasswordChange}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="이름"
                                    name="name"
                                    autoComplete="name"
                                    onChange={handleNameChange}
                                />
                            </Grid>
                        </Grid>
                        <Box
                            paddingTop='12px'
                            paddingBottom='12px'
                        >
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                가입하기
                             </Button>
                        </Box>
                        <Box
                            display='flex'
                            paddingBottom='15px'
                            justifyContent="flex-end"
                        >
                            <Link href="/user" variant="body2">
                                이미 계정이 있으신가요?  로그인 하기
                            </Link>
                        </Box>

                    </form>
                </div>
            </Container>
        </>
    )
}

export default SignUp;