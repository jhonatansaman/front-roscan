import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import api from '../services/api'

import Background from '../assets/img/loginImage.jpeg'
const labelOffset = -6

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();

  const [email_usuario, setEmail] = useState('');
  const [senha_usuario, setSenha] = useState('');

  async function login() {
    console.log("email usuario: ", email_usuario);
    console.log("senha usuario: ", senha_usuario);

    const res = await api.post('/posts/buscar', { email: email_usuario, senha: senha_usuario })

    console.log("res: ", res.data);

    if (res.data == 1) {
      localStorage.setItem('login', 'on');
      localStorage.setItem('usuario', JSON.stringify(res.data[0]));
      props.history.push({ pathname: "/admin/recuperacao" });
    }
    else alert('Login/senha invalidos');
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Login Roscan
          </Typography>
          <form className={classes.form} noValidate method="POST" encType="application/json" action="//http:localhost:3333/login/verify">
            <TextField
              variant="outlined"
              margin="normal"
              required
              value={email_usuario}
              onChange={e => setEmail(e.target.value)}
              fullWidth
              id="email_usuario"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              /* styles the label component */
              InputLabelProps={{
                style: {
                  fontSize: 15,
                  labelRoot: {
                    fontSize: 30,
                    color: "red",
                    "&$labelFocused": {
                      color: "purple"
                    }
                  },
                },
              }}
              inputProps={{
              style: {
                fontSize: 15,
              },
            }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={senha_usuario}
              onChange={e => setSenha(e.target.value)}
              name="senha_usuario"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{
                style: {
                  fontSize: 15,
                  labelRoot: {
                    fontSize: 30,
                    color: "red",
                    "&$labelFocused": {
                      color: "purple"
                    }
                  },
                },
              }}
              inputProps={{
              style: {
                fontSize: 15,
              },
            }}
            />
            {/*<FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />*/}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              value="acessar"
              id="acessar"
              className={classes.submit}
              style={{ height: 40, fontSize: 15 }}
              onClick={() => login()}
            >
              Entrar
            </Button>
            {/*<Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>*/}
          </form>
        </div>
      </Grid>
    </Grid>
  );
}