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
import React, {Component} from 'react';
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


import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {UserCard} from 'components/UserCard/UserCard.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';
import api from '../services/api';
import BootstrapTable from 'react-bootstrap-table-next';
import paginator from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';



class TableList extends Component {
  constructor(props) {
    super(props);

    this.updateInput = this.updateInput.bind(this);
    this.updateInput2 = this.updateInput2.bind(this);
    this.updateInput3 = this.updateInput3.bind(this);
    this.updateInput4 = this.updateInput4.bind(this);
    this.updateInput5 = this.updateInput5.bind(this);

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
      clienteEditar: '',
      tipoEditar: '',
      selectedOption: null,
      showModalViewGrafico: false,
      showModalTempoPedido: false,
      id_tempo_fabricacaoEditar: '',
      id_tempo_finalizacaoEditar: '',
      id_tempo_importacaoEditar: '',
      id_tempo_pedidoEditar: '',
      id_tempo_projetoEditar: '',
      tempo_pedidoEditar: '',
      showModalTempoProjeto: false,
      tempo_projetoViagemEditar: '',
      tempo_projetoMedidasEditar: '',
      tempo_projetoDesenhoTecnicoEditar: '',
      tempo_projetoRevisaoEditar: '',
      tempo_importacaoArmazemEditar: '',
      tempo_importacaoViagemNavioEditar: '',
      tempo_importacaoNacionalizacaoEditar: '',
      tempo_importacaoFreteEditar: '',
      tempo_finalizacaoDesembarqueEditar: '',
      tempo_finalizacaoConferenciaEditar: '',
      tempo_finalizacaoTrocaEditar: '',
      tempo_finalizacaoEmbarqueEditar: '',
      tempo_finalizacaoFreteClienteEditar: '',
      showModalTempoFabricacao: false,
      showModalTempoImportacao: false,
      showModalTempoFinalizacao: false,
      tempoPedidoEditar: '',
      dataPie2: {
        labels: [],
        series: [],
      },
      legendPie2: {
        names: ['Importação', 'Fabricação', 'Projeto', 'Finalização', 'Pedido'],
        types: ['info', 'danger', 'warning', 'success', 'white'],
      },
      habilitarBtnCadastrar: true,
      esOrcamento: false,
      escPedido: false,
      escCliente: false,
      escTipo: false,
      arrayPreCadastro: '',
      carregou: false,
      os: '',
      data: '',
      arrayEtapas: '',
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

  async componentDidMount() {
    const response = await api.get('/get/consultarStatusRecuperacao');

    if(response.data != 0){
      await this.setState({arrayPreCadastro: response.data, carregou: true});
    }
  }

  toggleCollapse = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  async buscar(item) {
    await this.setState({
      id_recuperacao: item.idrecuperacao,
      os: item.ordem_servico,
      data: item.date,
      cliente: item.cliente,
      tipo: item.tipo,
    })

    console.log("os: ", this.state.os);
    console.log("data: ", this.state.data);
    console.log("cliente: ", this.state.cliente);
    console.log("tipo: ", this.state.tipo);
  }

  async check(opcao){
    await this.setState({ arrayEtapas: [...this.state.arrayEtapas, opcao] })
    this.setState({ habilitarBtnCadastrar: false })
    console.log("array Etapas: ", this.state.arrayEtapas);
  }

  async cadastrar() {
    console.log("array Etapas: ", this.state.arrayEtapas);

    // console.log("tempo solda: ", this.state.tempo_soldar_ponteira);
    // console.log("tempo camada: ", this.state.tempo_camada_solda);
    // console.log("tempo solda: ", this.state.tempo_usinagem);
    // console.log("tempo solda: ", this.state.tempo_desbaste);
    // console.log("tempo solda: ", this.state.tempo_usinagem_medida);

    for(let i = 0; i < this.state.arrayEtapas.length; i++){
      console.log("Tamanho do arrayEtaoas",this.state.arrayEtapas.length)
      if(this.state.arrayEtapas[i] == 1){
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
      if(this.state.arrayEtapas[i] == 2){
        console.log("Entrou na 2")
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
        console.log("RESPONSE 2", response2)
      }
      if(this.state.arrayEtapas[i] == 3){
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
      if(this.state.arrayEtapas[i] == 4){
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
      if(this.state.arrayEtapas[i] == 5){
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

  async tempo(event) {

    console.log("o que é: ", event)
    // if(op == 1)
    //   this.setState({ tempo_soldar_ponteira: event.target.value })
    // if(op == 2)
    //   this.setState({ tempo_camada_solda: event.target.value })
    // if(op == 3)
    //   this.setState({ tempo_usinagem: event.target.value })
    // if(op == 4)
    //   this.setState({ tempo_desbaste: event.target.value })
    // if(op == 5)
    //   this.setState({ tempo_usinagem_medida: event.target.value })
  }

  render() {
    const self = this;

    

    const botoes = (cell, row, rowIndex) => {
      return (
        <div>
          {/* <a href={cell} onClick={() => alert(JSON.stringify(row.id_estoque))}>
                    See mail
                  </a> */}
          <i
            onClick={() =>
              this.editarTabela(
                JSON.stringify(row.id_importacao),
                JSON.stringify(row.orcamento),
                JSON.stringify(row.pedido),
                JSON.stringify(row.cliente),
                JSON.stringify(row.tipo),
                JSON.stringify(row.id_tempo_fabricacao),
                JSON.stringify(row.id_tempo_finalizacao),
                JSON.stringify(row.id_tempo_importacao),
                JSON.stringify(row.id_tempo_pedido),
                JSON.stringify(row.id_tempo_projeto)
              )
            }
            className="fa fa-edit"
            style={{color: 'green', fontSize: 20}}
          />
          <i
            className="fa fa-trash"
            onClick={() => {}}
            style={{color: 'red', marginLeft: 20, fontSize: 20}}
          />
        </div>
      );
    };

    const columns = [
      {
        dataField: 'id_importacao',
        text: 'ID',
      },
      {
        dataField: 'orcamento',
        text: 'Orçamento',
      },
      {
        dataField: 'pedido',
        text: 'Pedido',
      },
      {
        dataField: 'cliente',
        text: 'Cliente',
      },
      {
        dataField: 'tipo',
        text: 'Tipo',
      },
      {
        dataField: 'button',
        text: 'Ações',
        formatter: botoes,
      },
    ];
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
                  <MenuItem eventKey={2.1} onClick  ={() => self.buscar(item)} >Ordem de Serviço: {item.ordem_servico}</MenuItem>
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
                  onClick={() => this.modalConsultarImportacoes()}
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

        <div className="content" style={{marginTop: '3%'}}>
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
                            value: self.state.os
                          },
                          {
                            label: 'Data Inicial',
                            type: 'text',
                            bsClass: 'form-control',
                            value: self.state.data
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
                            value: self.state.cliente
                          },
                          {
                            label: 'Tipo',
                            type: 'text',
                            bsClass: 'form-control',
                            value: self.state.tipo
                          },
                        ]}
                      />

                      <Row>
                        <Col md={12}>
                        <div style={{flexDirection: 'row'}}>
                          <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Selecione a(s) etapa(s)</ControlLabel>
                            <Checkbox label='Soldar Ponteira' onClick={() => this.check(1)}/>
                            <input onChange={this.updateInput} type="time"/>
                            <Checkbox label='Camada de Solda' onClick={() => this.check(2)} />
                            <input onChange={this.updateInput2} type="time"/>
                            <Checkbox label='Usinagem Para Desbaste' onClick={() => this.check(3)}/>
                            <input onChange={this.updateInput3} type="time"/>
                            <Checkbox label='Desbaste na Lixeira' onClick={() => this.check(4)}/>
                            <input onChange={this.updateInput4} type="time"/>
                            <Checkbox label='Usinagem Medida Final' onClick={() => this.check(5)}/>
                            <input onChange={this.updateInput5} type="time"/>
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

export default TableList;
