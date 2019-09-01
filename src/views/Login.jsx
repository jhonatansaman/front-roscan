import React, {Component} from 'react';
import {
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  HelpBlock,
} from 'react-bootstrap';
import './login.sass';
// import {
//   isEmail,
//   isEmpty,
//   isLength,
//   isContainWhiteSpace,
// } from 'shared/validator';

import api from '../services/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.updateInput = this.updateInput.bind(this);
    this.updateInput2 = this.updateInput2.bind(this);

    this.state = {
      formData: {}, // Contains login form data
      errors: {}, // Contains login field errors
      formSubmitted: false, // Indicates submit status of login form
      loading: false, // Indicates in progress state of login form
      email: '',
      senha: '',
    };
  }

  updateInput(event) {
    this.setState({email: event.target.value});
  }
  updateInput2(event) {
    this.setState({senha: event.target.value});
  }

  //   login = e => {
  //     e.preventDefault();

  //     let errors = this.validateLoginForm();
  //   };

  entrar = async () => {
    let email = this.state.email;
    let senha = this.state.senha;

    const response = await api.post('/posts/buscar', {
      email: email,
      senha: senha,
    });

    if (response.data == 1) {
      alert('Login efetuado com sucesso');
      this.props.history.push({
        pathname: '/admin/importacao',
      });
    } else {
      alert('Login/senha inválidos');
    }
  };
  render() {
    return (
      <div className="Login">
        <Row>
          <form>
            <div style={{textAlign: 'center'}}>
              <img
                src={require('../assets/img/reactlogo.png')}
                style={{width: 200, height: 80, marginBottom: 10}}
              />
            </div>
            <FormGroup controlId="email">
              E-mail
              <FormControl
                type="text"
                name="email"
                placeholder="Entre com seu e-mail"
                onChange={this.updateInput}
              />
              {/* {errors.email &&
                                // <HelpBlock>{errors.email}</HelpBlock>
                            } */}
            </FormGroup>
            <FormGroup controlId="password">
              Senha
              <FormControl
                type="password"
                name="password"
                placeholder="Entre com sua senha"
                onChange={this.updateInput2}
              />
              {/* {errors.password &&
                                // <HelpBlock>{errors.password}</HelpBlock>
                            } */}
            </FormGroup>
            <div style={{textAlign: 'center'}}>
              <Button onClick={() => this.entrar()} bsStyle="primary">
                Entrar
              </Button>
            </div>
          </form>
        </Row>
      </div>
    );
  }
}

export default Login;
