/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Navbar,
  NavItem,
  Nav,
  NavDropdown,
  MenuItem,
  Modal,
  Form,
} from 'react-bootstrap';
import { Checkbox } from 'semantic-ui-react'
import { Card } from 'components/Card/Card.jsx';
import { FormInputs } from 'components/FormInputs/FormInputs.jsx';
import { UserCard } from 'components/UserCard/UserCard.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';
import api from '../services/api';
import { ClipLoader, BounceLoader } from 'react-spinners';
import BootstrapTable from 'react-bootstrap-table-next';
import paginator from 'react-bootstrap-table2-paginator';
import { css } from '@emotion/core';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class Recuperacao extends Component {
  constructor(props) {
    super(props);

    this.updateInput = this.updateInput.bind(this);
    this.updateInput2 = this.updateInput2.bind(this);
    this.updateInput3 = this.updateInput3.bind(this);
    this.updateInput4 = this.updateInput4.bind(this);
    this.updateInput5 = this.updateInput5.bind(this);
    this.ordem_servico = this.ordem_servico.bind(this);
    this.updateInputSolda2 = this.updateInputSolda2.bind(this);
    this.updateInputSolda3 = this.updateInputSolda3.bind(this);
    this.updateInputUsinagem2 = this.updateInputUsinagem2.bind(this);
    this.updateInputUsinagem3 = this.updateInputUsinagem3.bind(this);
    this.cliente = this.cliente.bind(this);
    this.tipo = this.tipo.bind(this);
    this.data_inicial = this.data_inicial.bind(this);

    this.state = {
      orcamento: '',
      pedido: '',
      cliente: '',
      tipo: '',
      formSubmitted: false, // Indicates submit status of login form
      loading: false, // Indicates in progress state of login form
      arrayConsultaImportacao: '',
      showModalConsultaImportacao: false,
      showModalEditar: false,
      idEditar: '',
      orcamentoEditar: '',
      pedidoEditar: '',
      selectedOption: null,
      habilitarBtnCadastrar: true,
      esOrcamento: false,
      escPedido: false,
      escCliente: false,
      escTipo: false,
      arrayPreCadastro: '',
      carregou: false,
      os: '',
      data: '',
      arrayEtapas: [],
      etapa1: false,
      etapa2: false,
      etapa3: false,
      etapa4: false,
      etapa5: false,
      id_recuperacao: '',
      tempo_soldar_ponteira: '',
      tempo_camada_solda: '',
      tempo_usinagem: '',
      tempo_desbaste: '',
      tempo_usinagem_medida: '',
      showLoading: false,
      loading: true,
      showModalConfirmar: false,
      habilitarInput: [true, true, true, true, true],
      ordem_servico: '',
      data_inicial: '',
      clienteEditar: '',
      tipoEditar: '',
      buscouRecuperacao: false,
      tempo_camada_solda2: '',
      tempo_camada_solda3: '',
      tempo_usinagem_medida2: '',
      updateInputUsinagem3: '',
    };
  }

  async updateInput(event) {
    await this.setState({ tempo_soldar_ponteira: event.target.value });
    console.log("tempo solda ponteira: ", this.state.tempo_soldar_ponteira);

  }
  async updateInput2(event) {
    await this.setState({ tempo_camada_solda: event.target.value });
  }
  async updateInput3(event) {
    await this.setState({ tempo_usinagem: event.target.value });
  }
  async updateInput4(event) {
    await this.setState({ tempo_desbaste: event.target.value });
  }
  async updateInput5(event) {
    await this.setState({ tempo_usinagem_medida: event.target.value });
  }
  async updateInputSolda2(event) {
    await this.setState({ tempo_camada_solda2: event.target.value });
  }
  async updateInputSolda3(event) {
    await this.setState({ tempo_camada_solda3: event.target.value });
  }
  async updateInputUsinagem2(event) {
    await this.setState({ tempo_usinagem_medida2: event.target.value });
  }
  async updateInputUsinagem3(event) {
    await this.setState({ tempo_usinagem_medida3: event.target.value });
  }

  async componentDidMount() {
    const response = await api.get('/get/consultarStatusRecuperacao');

    if (response.data != 0) {
      await this.setState({ arrayPreCadastro: response.data, carregou: true });
    }

  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  async buscar(item) {
    await this.setState({
      id_recuperacao: item.idrecuperacao,
      os: item.ordem_servico,
      data: item.date,
      cliente: item.cliente,
      tipo: item.tipo,
      buscouRecuperacao: true,
    })

    console.log("os: ", this.state.os);
    console.log("data: ", this.state.data);
    console.log("cliente: ", this.state.cliente);
    console.log("tipo: ", this.state.tipo);
  }

  async check(opcao) {
    if (opcao == 1) {
      if (this.state.arrayEtapas[0] == 1) {
        this.state.arrayEtapas.splice(0, 1);
        this.state.habilitarInput[0] = !this.state.habilitarInput[0];
        this.forceUpdate();
      } else {
        this.state.arrayEtapas[0] = opcao;
        this.state.habilitarInput[0] = false;
        this.forceUpdate();
      }
    }
    if (opcao == 2) {
      if (this.state.arrayEtapas[1] == 2) {
        this.state.arrayEtapas.splice(1, 1);
        this.state.habilitarInput[1] = !this.state.habilitarInput[1];
        this.forceUpdate();
      } else {
        this.state.arrayEtapas[1] = opcao;
        this.state.habilitarInput[1] = false;
        this.forceUpdate();
      }
    }
    if (opcao == 3) {
      if (this.state.arrayEtapas[2] == 3) {
        this.state.arrayEtapas.splice(2, 1);
        this.state.habilitarInput[2] = !this.state.habilitarInput[2];
        this.forceUpdate();
      } else {
        this.state.arrayEtapas[2] = opcao;
        this.state.habilitarInput[2] = false;
        this.forceUpdate();
      }
    }
    if (opcao == 4) {
      if (this.state.arrayEtapas[3] == 4) {
        this.state.arrayEtapas.splice(3, 1);
        this.state.habilitarInput[3] = !this.state.habilitarInput[3];
        this.forceUpdate();
      } else {
        this.state.arrayEtapas[3] = opcao;
        this.state.habilitarInput[3] = false;
        this.forceUpdate();
      }
    }
    if (opcao == 5) {
      if (this.state.arrayEtapas[4] == 5) {
        this.state.arrayEtapas.splice(4, 1);
        this.state.habilitarInput[4] = !this.state.habilitarInput[4];
        this.forceUpdate();
      } else {
        this.state.arrayEtapas[4] = opcao;
        this.state.habilitarInput[4] = false;
        this.forceUpdate();
      }
    }

    this.setState({ habilitarBtnCadastrar: false })
    console.log("array etapas: ", this.state.arrayEtapas);
    console.log("input habilitar: ", this.state.habilitarInput);
  }

  async cadastrar() {

    await this.setState({ showLoading: true });

    const sleep = m => new Promise(r => setTimeout(r, m));

    await Promise.all([
      setTimeout(() => this.setState({ showLoading: false }), 2000),
    ]);

    await sleep(2250);

    this.setState({ showModalConfirmar: true })

    if (this.state.buscouRecuperacao) {
      await api.post('/posts/attCadastroRecuperacao', {
        id_recuperacao: this.state.id_recuperacao,
        ordem_servico: this.state.os,
        cliente: this.state.cliente,
        data_inicial: this.state.data,
        tipo: this.state.tipo
      });
    }

    //Cadastrar recuperaçao a partir da web
    if (!this.state.buscouRecuperacao) {
      await api.post('/posts/preCadastroRecuperacao', {
        ordem_servico: this.state.os,
        cliente: this.state.cliente,
        tipo: this.state.tipo,
        date: this.state.data,
        info: this.state.info,
        status: 1,
      });
      const responseIdRecuperacao = await api.post('posts/pegarUltimoCadastroRecuperacao');

      await this.setState({ id_recuperacao: responseIdRecuperacao.data[0].idrecuperacao });

    }


    for (let i = 0; i < this.state.arrayEtapas.length; i++) {
      if (this.state.arrayEtapas[i] == 1) {
        await this.setState({ etapa1: true })
        await api.post('/posts/etapaCadastro', {
          tempo_parcial: 0,
          tempo_pre: this.state.tempo_soldar_ponteira,
          etapa: 1
        });
        const response = await api.post('/posts/pegarUltimoCadastro', {
          etapa: 1
        })
        console.log("response id cadastrado: ", response.data[0].id_primeira_etapa)
        await api.post('posts/updateRecuperacao', {
          id_recuperacao: this.state.id_recuperacao,
          id_primeira_etapa: response.data[0].id_primeira_etapa,
          etapa: 1,
        });

      }
      if (this.state.arrayEtapas[i] == 2) {
        await this.setState({ etapa2: true })
        await api.post('/posts/etapaCadastro', {
          tempo_parcial: 0,
          tempo_pre: this.state.tempo_camada_solda,
          etapa: 2
        });
        const response2 = await api.post('/posts/pegarUltimoCadastro', {
          etapa: 2
        })
        await api.post('posts/updateRecuperacao', {
          id_recuperacao: this.state.id_recuperacao,
          id_segunda_etapa: response2.data[0].id_segunda_etapa,
          etapa: 2,
        });
      }
      if (this.state.arrayEtapas[i] == 3) {
        await this.setState({ etapa3: true })
        await api.post('/posts/etapaCadastro', {
          tempo_parcial: 0,
          tempo_pre: this.state.tempo_usinagem,
          etapa: 3
        });
        const response3 = await api.post('/posts/pegarUltimoCadastro', {
          etapa: 3
        })
        await api.post('posts/updateRecuperacao', {
          id_recuperacao: this.state.id_recuperacao,
          id_terceira_etapa: response3.data[0].id_terceira_etapa,
          etapa: 3,
        });
      }
      if (this.state.arrayEtapas[i] == 4) {
        await this.setState({ etapa4: true })
        await api.post('/posts/etapaCadastro', {
          tempo_parcial: 0,
          tempo_pre: this.state.tempo_desbaste,
          etapa: 4
        });
        const response4 = await api.post('/posts/pegarUltimoCadastro', {
          etapa: 4
        })
        await api.post('posts/updateRecuperacao', {
          id_recuperacao: this.state.id_recuperacao,
          id_quarta_etapa: response4.data[0].id_quarta_etapa,
          etapa: 4,
        });
      }
      if (this.state.arrayEtapas[i] == 5) {
        await this.setState({ etapa5: true })
        await api.post('/posts/etapaCadastro', {
          tempo_parcial: 0,
          tempo_pre: this.state.tempo_usinagem_medida,
          etapa: 5
        });
        const response5 = await api.post('/posts/pegarUltimoCadastro', {
          etapa: 5
        })
        await api.post('posts/updateRecuperacao', {
          id_recuperacao: this.state.id_recuperacao,
          id_quinta_etapa: response5.data[0].id_quinta_etapa,
          etapa: 5,
        });
      }
    }

  }

  mudarPage() {
    this.props.history.push({ pathname: '/admin/importacao' })

  }

  async ordem_servico(event) {
    await this.setState({ os: event.target.value });
  }
  async data_inicial(event) {
    await this.setState({ data: event.target.value });

  }
  async cliente(event) {
    await this.setState({ cliente: event.target.value });
  }
  async tipo(event) {
    await this.setState({ tipo: event.target.value });
  }

  render() {
    const self = this;

    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">
          {this.state.arrayPreCadastro.length}
        </span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );

    return (
      <div>
        <Modal
          show={this.state.showLoading}
          onHide={this.handleClose}
          size="sm"
        >
          <Modal.Header closeButton>Carregando...</Modal.Header>
          <Modal.Body
            style={{
              // background: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ marginTop: 50, marginBottom: 50 }}>
              <BounceLoader
                css={override}
                sizeUnit={'px'}
                size={60}
                color={'#123b7a'}
                loading={this.state.loading}
              />

            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={this.state.showModalConfirmar}
        >
          <Modal.Header closeButton>
            <Modal.Title>Alerta</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Salvo com sucesso!</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.mudarPage()} variant="primary">Ok</Button>
          </Modal.Footer>
        </Modal>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#pablo">Recuperação</a>
            </Navbar.Brand>
            <Navbar.Toggle onClick={this.mobileSidebarToggle} />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown
                eventKey={2}
                title={notification}
                noCaret
                id="basic-nav-dropdown"
              >
                {this.state.carregou ?
                  this.state.arrayPreCadastro.map((item) => (
                    <MenuItem eventKey={2.1} onClick={() => self.buscar(item)} >Ordem de Serviço: {item.ordem_servico}</MenuItem>
                  ))
                  :
                  <MenuItem eventKey={2.1}>0</MenuItem>
                }
              </NavDropdown>
            </Nav>
            <Nav pullRight>
              <NavDropdown
                eventKey={2}
                title="Ações"
                id="basic-nav-dropdown-right"
              >
                <MenuItem
                  onClick={() =>
                    this.adicionarRecuperacao()
                  }
                  eventKey={2.1}
                >
                  Consultar Importações
                </MenuItem>
              </NavDropdown>
              <NavItem eventKey={3} href="#">
                Sair
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="content" style={{ marginTop: '3%' }}>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Cadastro de Importação"
                  content={
                    <form>
                      <FormInputs
                        ncols={['col-md-6', 'col-md-6']}
                        properties={[
                          {
                            label: 'Ordem de Serviço',
                            type: 'text',
                            bsClass: 'form-control',
                            onChange: self.ordem_servico,
                            defaultValue: self.state.os
                          },
                          {
                            label: 'Data Inicial',
                            type: 'text',
                            bsClass: 'form-control',
                            onChange: self.data_inicial,
                            defaultValue: self.state.data
                          },
                        ]}
                      />
                      <FormInputs
                        ncols={['col-md-6', 'col-md-6']}
                        properties={[
                          {
                            label: 'Cliente',
                            type: 'text',
                            bsClass: 'form-control',
                            onChange: self.cliente,
                            defaultValue: self.state.cliente
                          },
                          {
                            label: 'Tipo',
                            type: 'text',
                            bsClass: 'form-control',
                            onChange: self.tipo,
                            defaultValue: self.state.tipo
                          },
                        ]}
                      />

                      <Row>
                        <Col md={12}>
                          <div style={{ flexDirection: 'row' }}>
                            <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Selecione a(s) etapa(s)</ControlLabel>
                              <Checkbox label='Soldar Ponteira 1' onClick={() => this.check(1)} />
                              <input disabled={this.state.habilitarInput[0]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={this.updateInput} type="time" />
                              <Checkbox label='Soldar Ponteira 2' onClick={() => this.check(1)} />
                              <input disabled={this.state.habilitarInput[1]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={this.updateInputSolda2} type="time" />
                              <Checkbox label='Soldar Ponteira 3' onClick={() => this.check(2)} />
                              <input disabled={this.state.habilitarInput[2]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={this.updateInputSolda3} type="time" />
                              <Checkbox label='Camada de Solda' onClick={() => this.check(3)} />
                              <input disabled={this.state.habilitarInput[3]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={this.updateInput2} type="time" />
                              <Checkbox label='Usinagem Para Desbaste 1' onClick={() => this.check(4)} />
                              <input disabled={this.state.habilitarInput[4]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={this.updateInput3} type="time" />
                              <Checkbox label='Usinagem Para Desbaste 2' onClick={() => this.check(5)} />
                              <input disabled={this.state.habilitarInput[5]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={this.updateInputUsinagem2} type="time" />
                              <Checkbox label='Usinagem Para Desbaste 3' onClick={() => this.check(6)} />
                              <input disabled={this.state.habilitarInput[6]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={this.updateInputUsinagem3} type="time" />
                              <Checkbox label='Desbaste na Lixeira' onClick={() => this.check(7)} />
                              <input disabled={this.state.habilitarInput[7]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={this.updateInput4} type="time" />
                              <Checkbox label='Usinagem Medida Final' onClick={() => this.check(8)} />
                              <input disabled={this.state.habilitarInput[8]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={this.updateInput5} type="time" />
                            </FormGroup>
                          </div>
                        </Col>
                      </Row>
                      <Button
                        bsStyle="info"
                        onClick={() => this.cadastrar()}
                        pullRight
                        fill
                        disabled={this.state.habilitarBtnCadastrar}
                      >
                        Cadastrar
                      </Button>
                      <div className="clearfix" />
                    </form>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Recuperacao;
