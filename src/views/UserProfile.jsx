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

import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
} from 'variables/Variables.jsx';
import ChartistGraph from 'react-chartist';

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
import Select from 'react-select';
import { AST_Accessor } from 'terser';
import { thisTypeAnnotation } from '@babel/types';

const {SearchBar, ClearSearchButton} = Search;
const {ExportCSVButton} = CSVExport;

// import avatar from 'assets/img/faces/face-3.jpg';


// 

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.updateInput = this.updateInput.bind(this);
    this.updateInput2 = this.updateInput2.bind(this);
    this.updateInput3 = this.updateInput3.bind(this);
    this.updateInput4 = this.updateInput4.bind(this);
    this.InputEditarTempo = this.InputEditarTempo.bind(this);
    this.InputEditarTempoProjeto = this.InputEditarTempoProjeto.bind(this);
    this.InputEditarTempoProjeto2 = this.InputEditarTempoProjeto2.bind(this);
    this.InputEditarTempoProjeto3 = this.InputEditarTempoProjeto3.bind(this);
    this.InputEditarTempoProjeto4 = this.InputEditarTempoProjeto4.bind(this);
    this.InputEditarTempoFabricacao = this.InputEditarTempoFabricacao.bind(this);
    this.InputEditarTempoImportacao = this.InputEditarTempoImportacao.bind(this);
    this.InputEditarTempoImportacao2 = this.InputEditarTempoImportacao2.bind(this);
    this.InputEditarTempoImportacao3 = this.InputEditarTempoImportacao3.bind(this);
    this.InputEditarTempoImportacao4 = this.InputEditarTempoImportacao4.bind(this);
    this.InputEditarTempoFinalizacao = this.InputEditarTempoFinalizacao.bind(this);
    this.InputEditarTempoFinalizacao2 = this.InputEditarTempoFinalizacao2.bind(this);
    this.InputEditarTempoFinalizacao3 = this.InputEditarTempoFinalizacao3.bind(this);
    this.InputEditarTempoFinalizacao4 = this.InputEditarTempoFinalizacao4.bind(this);
    this.InputEditarTempoFinalizacao5 = this.InputEditarTempoFinalizacao5.bind(this);

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
        series:[]
      },
      legendPie2: {
        names: ["Importação", "Fabricação", "Projeto", "Finalização", "Pedido"],
        types: ["info", "danger", "warning", "success", "white"]
      },
      habilitarBtnCadastrar: true,
      esOrcamento: false,
      escPedido: false,
      escCliente: false,
      escTipo: false,
    };
  }

  state = {
    isOpen: false,
  };

  async componentDidMount() {
    const responseConsultarImportacao = await api.get(
      '/get/consultarImportacao'
    );

    this.setState({arrayConsultaImportacao: responseConsultarImportacao.data});

    console.log(
      'arrayConsultaImportacao: ',
      this.state.arrayConsultaImportacao
    );
  }

  toggleCollapse = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  async updateInput(event) {
    await this.setState({orcamento: event.target.value, escOrcamento: true});
    console.log("escOrcamento: ", this.state.escOrcamento);
    console.log("escPedido: ", this.state.escPedido);
    console.log("escCliente: ", this.state.escCliente);
    console.log("escTipo: ", this.state.escTipo);
    if(this.state.escTipo==true && this.state.escCliente==true && this.state.escPedido==true && this.state.escOrcamento==true)
    this.setState({ habilitarBtnCadastrar: false })
  }
  async updateInput2(event) {
    await this.setState({pedido: event.target.value, escPedido: true});
    
    if(this.state.escTipo==true && this.state.escCliente==true && this.state.escPedido==true && this.state.escOrcamento==true)
    this.setState({ habilitarBtnCadastrar: false })
  }
  async updateInput3(event) {
    await this.setState({cliente: event.target.value, escCliente: true});

    if(this.state.escTipo==true && this.state.escCliente==true && this.state.escPedido==true && this.state.escOrcamento==true)
    this.setState({ habilitarBtnCadastrar: false })
  }
  async updateInput4(event) {
    await this.setState({tipo: event.target.value, escTipo: true});
  
    if(this.state.escTipo==true && this.state.escCliente==true && this.state.escPedido==true && this.state.escOrcamento==true)
    this.setState({ habilitarBtnCadastrar: false })
  }
  InputEditarTempo(event) {
    this.setState({tempo_pedidoEditar: event.target.value});
  }
  InputEditarTempoProjeto(event) {
    this.setState({tempo_projetoViagemEditar: event.target.value});
  }
  InputEditarTempoProjeto2(event) {
    this.setState({tempo_projetoMedidasEditar: event.target.value});
  }
  InputEditarTempoProjeto3(event) {
    this.setState({tempo_projetoDesenhoTecnicoEditar: event.target.value});
  }
  InputEditarTempoProjeto4(event) {
    this.setState({tempo_projetoRevisaoEditar: event.target.value});
  }
  InputEditarTempoFabricacao(event) {
    this.setState({tempo_FabricacaoEditar: event.target.value});
  }
  InputEditarTempoImportacao(event) {
    this.setState({tempo_importacaoArmazemEditar: event.target.value});
  }
  InputEditarTempoImportacao2(event) {
    this.setState({tempo_importacaoViagemNavioEditar: event.target.value});
  }
  InputEditarTempoImportacao3(event) {
    this.setState({tempo_importacaoNacionalizacaoEditar: event.target.value});
  }
  InputEditarTempoImportacao4(event) {
    this.setState({tempo_importacaoFreteEditar: event.target.value});
  }
  InputEditarTempoFinalizacao(event) {
    this.setState({tempo_finalizacaoDesembarqueEditar: event.target.value});
  }
  InputEditarTempoFinalizacao2(event) {
    this.setState({tempo_finalizacaoConferenciaEditar: event.target.value});
  }
  InputEditarTempoFinalizacao3(event) {
    this.setState({tempo_finalizacaoFreteClienteEditar: event.target.value});
  }
  InputEditarTempoFinalizacao4(event) {
    this.setState({tempo_finalizacaoTrocaEditar: event.target.value});
  }
  InputEditarTempoFinalizacao5(event) {
    this.setState({tempo_finalizacaoEmbarqueEditar: event.target.value});
  }
  

  async cadastro_dias_padrao() {
    await api.post('/posts/cadTempoPedido',{
      tempo: 1
    });

    await api.post('/posts/cadTempoProjeto',{
      viagem: 1,
      medidas: 1,
      desenho_tecnico: 5,
      revisao: 1
    });

    await api.post('/posts/cadTempoFabricacao',{
      tempo_fabricacao: 45
    });

    await api.post('/posts/cadTempoImportacao',{
      espera_armazem: 15,
      viagem_navio: 37,
      nacionalizacao: 5,
      frete_roscan: 1
    });

    await api.post('/posts/cadTempoFinalizacao',{
      desembarque: 2,
      conferencia_projeto: 3,
      troca_embalagem: 2,
      embarque: 2,
      frete_cliente: 3
    });
  }

  cadastrar = async () => {
    
    await this.cadastro_dias_padrao();

    const idTempoPedido = await api.get('/get/lastTempoPedido');
    const idTempoProjeto = await api.get('/get/lastTempoProjeto');
    const idFabricacao = await api.get('/get/lastTempoFabricacao');
    const idImportacao = await api.get('/get/lastTempoImportacao');
    const idFinalizacao = await api.get('/get/lastTempoFinalizacao');

    console.log("id tempo pedido: ", idTempoPedido.data[0].id_tempo_pedido);
    console.log("id tempo Projeto: ", idTempoProjeto.data[0].id_tempo_projeto);
    console.log("id tempo Fabricacao: ", idFabricacao.data[0].id_tempo_fabricacao);
    console.log("id tempo importacao: ", idImportacao.data[0].id_tempo_importacao);
    console.log("id tempo finalizacao: ", idFinalizacao.data[0].id_tempo_finalizacao);

    await api.post('/posts/inserirImportacao', {
      orcamento: this.state.orcamento,
      pedido: this.state.pedido,
      cliente: this.state.cliente,
      tipo: this.state.tipo,
      importacao: '50%',
      fabricacao: '39%',
      projeto: '7%',
      finalizacao: '3%',
      tempo_pedido: '1%',
      id_tempo_fabricacao: idFabricacao.data[0].id_tempo_fabricacao,
      id_tempo_finalizacao: idFinalizacao.data[0].id_tempo_finalizacao,
      id_tempo_importacao: idImportacao.data[0].id_tempo_importacao,
      id_tempo_pedido: idTempoPedido.data[0].id_tempo_pedido,
      id_tempo_projeto: idTempoProjeto.data[0].id_tempo_projeto,
    });

    alert('Cadastrado com sucesso!');
  };

  clear(props) {
    props.searchProps.onSearch('');
  }

  editarTabela = async (id, siape, nome, email, tipo, id_tempo_fabricacao, id_tempo_finalizacao, id_tempo_importacao, id_tempo_pedido, id_tempo_projeto) => {

    console.log("ID TEMPO PEDIDO: ", id_tempo_pedido);

    await this.setState({
      idEditar: id.replace(/['"]+/g, ''),
      orcamentoEditar: siape.replace(/['"]+/g, ''),
      pedidoEditar: nome.replace(/['"]+/g, ''),
      clienteEditar: email.replace(/['"]+/g, ''),
      tipoEditar: tipo.replace(/['"]+/g, ''),
      id_tempo_fabricacaoEditar: id_tempo_fabricacao.replace(/['"]+/g, ''),
      id_tempo_finalizacaoEditar: id_tempo_finalizacao.replace(/['"]+/g, ''),
      id_tempo_importacaoEditar: id_tempo_importacao.replace(/['"]+/g, ''),
      id_tempo_pedidoEditar: id_tempo_pedido.replace(/['"]+/g, ''),
      id_tempo_projetoEditar: id_tempo_projeto.replace(/['"]+/g, ''),
      showModalConsultaImportacao: false,
    });

    this.setState({showModalEditar: true});
  };

  handleChange = async selectedOption => {
    this.setState({selectedOption});
    console.log(`Option selected:`, selectedOption.label);
    await this.setState({
      materialSelecionado: selectedOption.label,
      dDescricao: true,
    });

    this.habilitarCarrinho();
  };

  async editarTempoPedido() {

    console.log("id tempo pedido: ", this.state.id_tempo_pedidoEditar);

    const responseIdTempoPedido = await api.post('/posts/buscaTempoPedidoId', {
      id_tempo_pedido: this.state.id_tempo_pedidoEditar
    })

    this.setState({ tempo_pedidoEditar: responseIdTempoPedido.data[0].tempo })

    await this.setState({ showModalTempoPedido: true })
  }

  async editarTempoProjeto() {

    console.log("id tempo projeto: ", this.state.id_tempo_projetoEditar);

    const responseIdTempoProjeto = await api.post('/posts/buscaTempoProjetoId', {
      id_tempo_projeto: this.state.id_tempo_projetoEditar
    })

    console.log("tempo viagem ", responseIdTempoProjeto.data[0].viagem)
    console.log("tempo medidas ", responseIdTempoProjeto.data[0].medidas)
    console.log("tempo desenho_tecnico ", responseIdTempoProjeto.data[0].desenho_tecnico)
    console.log("tempo revisao ", responseIdTempoProjeto.data[0].revisao)

    this.setState({ 
      tempo_projetoViagemEditar: responseIdTempoProjeto.data[0].viagem,
      tempo_projetoMedidasEditar: responseIdTempoProjeto.data[0].medidas,
      tempo_projetoDesenhoTecnicoEditar: responseIdTempoProjeto.data[0].desenho_tecnico,
      tempo_projetoRevisaoEditar: responseIdTempoProjeto.data[0].revisao,
    })

    await this.setState({ showModalTempoProjeto: true })
  }

  async editarTempoImportacao() {

    console.log("id tempo projeto: ", this.state.id_tempo_projetoEditar);

    const responseIdTempoImportacao = await api.post('/posts/buscaTempoImportacaoId', {
      id_tempo_importacao: this.state.id_tempo_importacaoEditar
    })

    console.log("tempo espera armazem ", responseIdTempoImportacao.data[0].espera_armazem)
    console.log("tempo viagem navio ", responseIdTempoImportacao.data[0].viagem_navio)
    console.log("tempo nacionalizacao ", responseIdTempoImportacao.data[0].nacionalizacao)
    console.log("tempo frete roscan ", responseIdTempoImportacao.data[0].frete_roscan)

    this.setState({ 
      tempo_importacaoArmazemEditar: responseIdTempoImportacao.data[0].espera_armazem,
      tempo_importacaoViagemNavioEditar: responseIdTempoImportacao.data[0].viagem_navio,
      tempo_importacaoNacionalizacaoEditar: responseIdTempoImportacao.data[0].nacionalizacao,
      tempo_importacaoFreteEditar: responseIdTempoImportacao.data[0].frete_roscan,
    })

    await this.setState({ showModalTempoImportacao: true })
  }

  async editarTempoFinalizacao() {

    console.log("id tempo projeto: ", this.state.id_tempo_projetoEditar);

    const responseIdTempoImportacao = await api.post('/posts/buscaTempoFinalizacaoId', {
      id_tempo_finalizacao: this.state.id_tempo_finalizacaoEditar
    })

    await this.setState({ 
      tempo_finalizacaoDesembarqueEditar: responseIdTempoImportacao.data[0].desembarque,
      tempo_finalizacaoConferenciaEditar: responseIdTempoImportacao.data[0].conferencia_projeto,
      tempo_finalizacaoTrocaEditar: responseIdTempoImportacao.data[0].troca_embalagem,
      tempo_finalizacaoEmbarqueEditar: responseIdTempoImportacao.data[0].embarque,
      tempo_finalizacaoFreteClienteEditar: responseIdTempoImportacao.data[0].frete_cliente,
    })

    await this.setState({ showModalTempoFinalizacao: true })
  }

  async editarTempoFabricacao() {


    const responseIdFabricacao = await api.post('/posts/buscaTempoFabricacaoId', {
      id_tempo_fabricacao: this.state.id_tempo_fabricacaoEditar
    })

    this.setState({ tempo_FabricacaoEditar: responseIdFabricacao.data[0].tempo_fabricacao })

    await this.setState({ showModalTempoFabricacao: true })
  }

  async visualizarGrafico() {


    const responseIdTempoPedido = await api.post('/posts/buscaTempoPedidoId', {
      id_tempo_pedido: this.state.id_tempo_pedidoEditar
    })

    console.log("tempo pedido: ", responseIdTempoPedido.data[0].tempo);
    let percentual = (responseIdTempoPedido.data[0].tempo*100)/116
    console.log("PERCENTUAL: ", Math.round(percentual));
    console.log("________________");

    const responseIdTempoImportacao = await api.post('/posts/buscaTempoImportacaoId', {
      id_tempo_importacao: this.state.id_tempo_importacaoEditar
    })

    console.log("tempo importação (armazem): ", responseIdTempoImportacao.data[0].espera_armazem);
    console.log("tempo importação (viagem navio): ", responseIdTempoImportacao.data[0].viagem_navio);
    console.log("tempo importação(nacionalização): ", responseIdTempoImportacao.data[0].nacionalizacao);
    console.log("tempo importação(frete roscan): ", responseIdTempoImportacao.data[0].frete_roscan);
    let percentual2 = ((responseIdTempoImportacao.data[0].espera_armazem+responseIdTempoImportacao.data[0].viagem_navio+responseIdTempoImportacao.data[0].nacionalizacao+responseIdTempoImportacao.data[0].frete_roscan)*100)/116
    console.log("PERCENTUAL: ", Math.round(percentual2));
    console.log("________________");

    const responseIdFabricacao = await api.post('/posts/buscaTempoFabricacaoId', {
      id_tempo_fabricacao: this.state.id_tempo_fabricacaoEditar
    })

    console.log("tempo fabricação: ", responseIdFabricacao.data[0].tempo_fabricacao);
    let percentual3 = (responseIdFabricacao.data[0].tempo_fabricacao*100)/116
    console.log("PERCENTUAL: ", Math.round(percentual3));
    console.log("________________");

    const responseIdTempoProjeto = await api.post('/posts/buscaTempoProjetoId', {
      id_tempo_projeto: this.state.id_tempo_projetoEditar
    })

    console.log("tempo projeto(viagem): ", responseIdTempoProjeto.data[0].viagem);
    console.log("tempo projeto(MEDIDAS): ", responseIdTempoProjeto.data[0].medidas);
    console.log("tempo projeto(desenho técnico): ", responseIdTempoProjeto.data[0].desenho_tecnico);
    console.log("tempo projeto(revisao): ", responseIdTempoProjeto.data[0].revisao);
    let percentual4 = ((responseIdTempoProjeto.data[0].viagem+responseIdTempoProjeto.data[0].medidas+responseIdTempoProjeto.data[0].desenho_tecnico+responseIdTempoProjeto.data[0].revisao)*100)/116
    console.log("PERCENTUAL: ", Math.round(percentual4));
    console.log("________________");


    const responseIdTempoFinalizacao = await api.post('/posts/buscaTempoFinalizacaoId', {
      id_tempo_finalizacao: this.state.id_tempo_finalizacaoEditar
    })

    console.log("tempo finaliação(desembarque): ", responseIdTempoFinalizacao.data[0].desembarque);
    console.log("tempo finaliação(conferencia projeto): ", responseIdTempoFinalizacao.data[0].conferencia_projeto);
    console.log("tempo finaliação(troca embalagem): ", responseIdTempoFinalizacao.data[0].troca_embalagem);
    console.log("tempo finaliação(embarque): ", responseIdTempoFinalizacao.data[0].embarque);
    console.log("tempo finaliação(frete_cliente): ", responseIdTempoFinalizacao.data[0].frete_cliente);
    let calculardia = ((responseIdTempoFinalizacao.data[0].desembarque+responseIdTempoFinalizacao.data[0].conferencia_projeto+responseIdTempoFinalizacao.data[0].troca_embalagem+responseIdTempoFinalizacao.data[0].embarque))/24
    console.log("CALCULAR DIA CALCULADO: ", Math.round(calculardia))
    console.log("FRETE CLIENTE : ", responseIdTempoFinalizacao.data[0].frete_cliente)

    let percentual5  = ((Math.round(calculardia)+responseIdTempoFinalizacao.data[0].frete_cliente)*100)/116
    console.log("PERCENTUAL: ", Math.round(percentual5));
    console.log("________________");

     // var legendPie2 = {
        //   names: ["Importação", "Fabricação", "Projeto", "Finalização", "Pedido"],
        //   types: ["info", "danger", "warning"]
        // };

    var percentual2Correto = Math.round(percentual2)+'%';
    var percentual3Correto = Math.round(percentual3)+'%';
    var percentual4Correto = Math.round(percentual4)+'%';
    var percentual5Correto = Math.round(percentual5)+'%';
    var percentualCorreto = Math.round(percentual)+'%';
    
    
    await this.setState({ 
      dataPie2: {
        labels: [percentual2Correto, percentual3Correto, percentual4Correto, percentualCorreto, percentualCorreto],
        series: [Math.round(percentual2), Math.round(percentual3), Math.round(percentual4), Math.round(percentual5), Math.round(percentual)]
      }
    })

    this.setState({
      showModalViewGrafico: true,
      showModalEditar: false,
    })

  }
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  async modalConsultarImportacoes() {
    const responseConsultarImportacao = await api.get(
      '/get/consultarImportacao'
    );

    await this.setState({arrayConsultaImportacao: responseConsultarImportacao.data});

    this.setState({ showModalConsultaImportacao: true })
  }

  async editarTempoPedidoFato(){

    console.log("tempo pedido editar: ", this.state.tempo_pedidoEditar);

    await api.post('/posts/attTempos', {
      tempoPedido: this.state.tempo_pedidoEditar,
      id_tempo_pedido: this.state.id_tempo_pedidoEditar,
      escolha: 1
    })

    this.setState({ showModalTempoPedido: false })
  }
  async editarTempoProjetoFato(){

    console.log("tempo projeot viagem: ", this.state.tempo_projetoViagemEditar);
    console.log("tempo projeto medidas: ", this.state.tempo_projetoMedidasEditar);
    console.log("tempo projeot tecnico: ", this.state.tempo_projetoDesenhoTecnicoEditar);
    console.log("tempo projeot revisao: ", this.state.tempo_projetoRevisaoEditar);

    await api.post('/posts/attTempos', {
      tempoViagem: this.state.tempo_projetoViagemEditar,
      tempoMedidas: this.state.tempo_projetoMedidasEditar,
      tempoDesenho: this.state.tempo_projetoDesenhoTecnicoEditar,
      tempoRevisao: this.state.tempo_projetoRevisaoEditar,
      id_tempo_projeto: this.state.id_tempo_projetoEditar,
      escolha: 2
    })

    this.setState({ showModalTempoProjeto: false })

  }
  
  async editarTempoImportacaoFato(){

    console.log("tempo importação armazem: ", this.state.tempo_importacaoArmazemEditar);
    console.log("tempo importação navio: ", this.state.tempo_importacaoViagemNavioEditar);
    console.log("tempo importação nacionalização: ", this.state.tempo_importacaoNacionalizacaoEditar);
    console.log("tempo importação frete editar: ", this.state.tempo_importacaoFreteEditar);

    await api.post('/posts/attTempos', {
      tempoArmazem: this.state.tempo_importacaoArmazemEditar,
      tempoImportacaoNavio: this.state.tempo_importacaoViagemNavioEditar,
      tempoNacionalizacao: this.state.tempo_importacaoNacionalizacaoEditar,
      tempoFrete: this.state.tempo_importacaoFreteEditar,
      id_tempo_importacao: this.state.id_tempo_importacaoEditar,
      escolha: 3
    })

    this.setState({ showModalTempoImportacao: false })

  }
 
  async editarTempoFinalizacaoFato(){

    console.log("tempo finalização desembarque: ", this.state.tempo_finalizacaoDesembarqueEditar);
    console.log("tempo finalização conferencia: ", this.state.tempo_finalizacaoConferenciaEditar);
    console.log("tempo finalização frete cliente: ", this.state.tempo_finalizacaoFreteClienteEditar);
    console.log("tempo finalização troca: ", this.state.tempo_finalizacaoTrocaEditar);
    console.log("tempo finalização embarque: ", this.state.tempo_finalizacaoEmbarqueEditar);

    await api.post('/posts/attTempos', {
      tempoDesembarque: this.state.tempo_finalizacaoDesembarqueEditar,
      tempoConferencia: this.state.tempo_finalizacaoConferenciaEditar,
      tempoFreteCliente: this.state.tempo_finalizacaoFreteClienteEditar,
      tempoTroca: this.state.tempo_finalizacaoTrocaEditar,
      tempoEmbarque: this.state.tempo_finalizacaoEmbarqueEditar,
      id_tempo_finalizacao: this.state.id_tempo_finalizacaoEditar,
      escolha: 4
    })

    this.setState({ showModalTempoFinalizacao: false })

  }
  async editarTempoFabricacaoFato(){

    console.log("tempo pedido editar: ", this.state.tempo_FabricacaoEditar);

    await api.post('/posts/attTempos', {
      tempoFabricacao: this.state.tempo_FabricacaoEditar,
      id_tempo_fabricacao: this.state.id_tempo_fabricacaoEditar,
      escolha: 5
    })

    this.setState({ showModalTempoFabricacao: false })

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
                JSON.stringify(row.id_tempo_projeto),
              )
            }
            className="fa fa-edit"
            style={{color: 'green', fontSize: 20}}
          />
          <i
            className="fa fa-trash"
            onClick={() => {}
            }
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
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#pablo">Importação</a>
            </Navbar.Brand>
            <Navbar.Toggle onClick={this.mobileSidebarToggle} />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown
                eventKey={2}
                title="Ações"
                id="basic-nav-dropdown-right"
              >
                <MenuItem
                  onClick={() =>
                    this.modalConsultarImportacoes()
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

        {/* Modal consultar Importação */}
        <Modal
          show={this.state.showModalConsultaImportacao}
          onHide={() => this.setState({showModalConsultaImportacao: false})}
        >
          <Modal.Header closeButton>
            <Modal.Title>Consulta de Importações</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ToolkitProvider
              keyField="id"
              data={this.state.arrayConsultaImportacao}
              columns={columns}
              search
            >
              {props => (
                <div>
                  <SearchBar
                    placeholder="Pesquisar"
                    id="search_txt"
                    style={{width: 470, marginRight: 10}}
                    {...props.searchProps}
                  />
                  <Button onClick={() => this.clear(props)}>Limpar</Button>
                  {/* <hr /> */}
                  <BootstrapTable
                    pagination={paginator()}
                    {...props.baseProps}
                  />
                  <ExportCSVButton {...props.csvProps}>
                    Exportar Excel
                  </ExportCSVButton>
                </div>
              )}
            </ToolkitProvider>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({showModalConsultaImportacao: false})
              }
            >
              Sair
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Visualizar Gráfico */}
        <Modal
          show={this.state.showModalViewGrafico}
          onHide={() =>
            this.setState({showModalViewGrafico: false, showModalEditar: true})
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Visualizar Gráfico</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ChartistGraph
              style={{width: 350, height: 250, marginLeft: '20%'}}
              data={this.state.dataPie2}
              type="Pie"
            />
           <div className="legend">{this.createLegend(this.state.legendPie2)}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  showModalViewGrafico: false,
                  showModalEditar: true,
                })
              }
            >
              Sair
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal editar principal*/}
        <Modal
          show={this.state.showModalEditar}
          onHide={() => this.setState({showModalEditar: false})}
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="tituloModal"
            >
              Editar Importação
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormInputs
                ncols={['col-md-4', 'col-md-4', 'col-md-4']}
                properties={[
                  {
                    label: 'ID',
                    type: 'text',
                    bsClass: 'form-control',
                    // onChange: self.updateInputEditar,
                    value: self.state.idEditar,
                    placeholder: self.state.idEditar,
                  },
                  {
                    label: 'Orçamento',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    // onChange: self.updateInput2Editar,
                    value: self.state.orcamentoEditar,
                    placeholder: self.state.orcamentoEditar,
                  },
                  {
                    label: 'Cliente',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    // onChange: self.updateInput2Editar,
                    value: self.state.clienteEditar,
                    placeholder: self.state.clienteEditar,
                  },
                ]}
              />

              <FormInputs
                ncols={['col-md-6', 'col-md-6']}
                properties={[
                  {
                    label: 'Pedido',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    // onChange: self.updateInput2Editar,
                    value: self.state.pedidoEditar,
                    placeholder: self.state.pedidoEditar,
                  },
                  {
                    label: 'Tipo',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    // onChange: self.updateInput2Editar,
                    value: self.state.tipoEditar,
                    placeholder: self.state.tipoEditar,
                  },
                ]}
              />
              <Row style={{marginBottom: '3%'}}>
                <Col md={4}>
                  <Button
                    onClick={() => this.editarTempoPedido()}
                  >
                    Tempo Pedido
                  </Button>
                </Col>
                <Col md={4}>
                  <Button
                   onClick={() => this.editarTempoProjeto()}
                  >Tempo Projeto</Button>
                </Col>
                <Col md={4}>
                  <Button
                    onClick={() => this.editarTempoFabricacao()}
                  >Tempo Fabricação</Button>
                </Col>
              </Row>

              <Row style={{marginBottom: '3%'}}>
                <Col md={4}>
                  <Button
                    onClick={() => this.editarTempoImportacao()}
                  >Tempo Importação</Button>
                </Col>
                <Col md={4}>
                  <Button
                    onClick={() => this.editarTempoFinalizacao()}
                  >Tempo Finalização</Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() =>
               this.visualizarGrafico()
              }
            >
              Visualizar o Gráfico
            </Button>
            <Button onClick={() => this.setState({showModalEditar: false})}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal tempo pedido */}
        <Modal
          show={this.state.showModalTempoPedido}
          onHide={() =>
            this.setState({showModalTempoPedido: false, showModalEditar: true})
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Tempo Pedido</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormInputs
                ncols={['col-md-12']}
                properties={[
                  {
                    label: 'Tempo Pedido',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempo,
                    // value: self.state.tempo_pedidoEditar,
                    placeholder: self.state.tempo_pedidoEditar,
                  },
                ]}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.editarTempoPedidoFato()
              }
            >
              Editar
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  showModalTempoPedido: false,
                  showModalEditar: true,
                })
              }
            >
              Sair
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal tempo projeto */}
        <Modal
          show={this.state.showModalTempoProjeto}
          onHide={() =>
            this.setState({showModalTempoProjeto: false, showModalEditar: true})
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Tempo Projeto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormInputs
                ncols={['col-md-6', 'col-md-6']}
                properties={[
                  {
                    label: 'Tempo Viagem',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoProjeto,
                    // value: self.state.InputEditarTempo,
                    placeholder: self.state.tempo_projetoViagemEditar,
                  },
                  {
                    label: 'Tempo Medidas',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoProjeto2,
                    // value: self.state.tempo_projetoMedidasEditar,
                    placeholder: self.state.tempo_projetoMedidasEditar,
                  },
                ]}
              />

              <FormInputs
                ncols={['col-md-6', 'col-md-6']}
                properties={[
                  {
                    label: 'Tempo Desenho Técnico',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoProjeto3,
                    // value: self.state.tempo_projetoDesenhoTecnicoEditar,
                    placeholder: self.state.tempo_projetoDesenhoTecnicoEditar,
                  },
                  {
                    label: 'Tempo Revisão',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoProjeto4,
                    // value: self.state.tempo_projetoRevisaoEditar,
                    placeholder: self.state.tempo_projetoRevisaoEditar,
                  },
                ]}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.editarTempoProjetoFato()
              }
            >
              Editar
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  showModalTempoPedido: false,
                  showModalEditar: true,
                })
              }
            >
              Sair
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal tempo importação */}
        <Modal
          show={this.state.showModalTempoImportacao}
          onHide={() =>
            this.setState({showModalTempoImportacao: false, showModalEditar: true})
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Tempo Importação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormInputs
                ncols={['col-md-6', 'col-md-6']}
                properties={[
                  {
                    label: 'Tempo Espera Armazém',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoImportacao,
                    // value: self.state.tempo_importacaoArmazemEditar,
                    placeholder: self.state.tempo_importacaoArmazemEditar,
                  },
                  {
                    label: 'Tempo Viagem Navio',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoImportacao2,
                    // value: self.state.tempo_importacaoViagemNavioEditar,
                    placeholder: self.state.tempo_importacaoViagemNavioEditar,
                  },
                ]}
              />

              <FormInputs
                ncols={['col-md-6', 'col-md-6']}
                properties={[
                  {
                    label: 'Tempo Nacionalização',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoImportacao3,
                    // value: self.state.tempo_importacaoNacionalizacaoEditar,
                    placeholder: self.state.tempo_importacaoNacionalizacaoEditar,
                  },
                  {
                    label: 'Tempo Frete Roscan',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoImportacao4,
                    // value: self.state.tempo_importacaoFreteEditar,
                    placeholder: self.state.tempo_importacaoFreteEditar,
                  },
                ]}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.editarTempoImportacaoFato()
              }
            >
              Editar
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  showModalTempoImportacao: false,
                  showModalEditar: true,
                })
              }
            >
              Sair
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal tempo finalizacao */}
        <Modal
          show={this.state.showModalTempoFinalizacao}
          onHide={() =>
            this.setState({showModalTempoFinalizacao: false, showModalEditar: true})
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Tempo Finalização</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormInputs
                ncols={['col-md-4', 'col-md-4', 'col-md-4']}
                properties={[
                  {
                    label: 'Tempo Desembarque',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoFinalizacao,
                    // value: self.state.tempo_finalizacaoDesembarqueEditar,
                    placeholder: self.state.tempo_finalizacaoDesembarqueEditar,
                  },
                  {
                    label: 'Tempo Conferência',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoFinalizacao2,
                    // value:  self.state.tempo_finalizacaoConferenciaEditar,
                    placeholder: self.state.tempo_finalizacaoConferenciaEditar,
                  },
                  {
                    label: 'Tempo Frete Cliente',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoFinalizacao3,
                    // value: self.state.tempo_finalizacaoFreteClienteEditar,
                    placeholder: self.state.tempo_finalizacaoFreteClienteEditar,
                  },
                ]}
              />

              <FormInputs
                ncols={['col-md-6', 'col-md-6']}
                properties={[
                  {
                    label: 'Tempo Troca de Embalagem',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoFinalizacao4,
                    // value: self.state.tempo_finalizacaoTrocaEditar,
                    placeholder: self.state.tempo_finalizacaoTrocaEditar,
                  },
                  {
                    label: 'Tempo Embarque',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoFinalizacao5,
                    // value: self.state.tempo_finalizacaoEmbarqueEditar,
                    placeholder: self.state.tempo_finalizacaoEmbarqueEditar,
                  },
                ]}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.editarTempoFinalizacaoFato()
              }
            >
              Editar
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  showModalTempoFinalizacao: false,
                  showModalEditar: true,
                })
              }
            >
              Sair
            </Button>
          </Modal.Footer>
        </Modal>
        
        {/* Modal tempo fabricação */}
        <Modal
          show={this.state.showModalTempoFabricacao}
          onHide={() =>
            this.setState({showModalTempoFabricacao: false, showModalEditar: true})
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Tempo Fabricação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormInputs
                ncols={['col-md-12']}
                properties={[
                  {
                    label: 'Tempo Fabricação',
                    type: 'text',
                    bsClass: 'form-control',
                    placeholder: 'Nome',
                    onChange: self.InputEditarTempoFabricacao,
                    // value: self.state.tempo_FabricacaoEditar,
                    placeholder: self.state.tempo_FabricacaoEditar,
                  },
                ]}
              />

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.editarTempoFabricacaoFato()
              }
            >
              Editar
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                this.setState({
                  showModalTempoFabricacao: false,
                  showModalEditar: true,
                })
              }
            >
              Sair
            </Button>
          </Modal.Footer>
        </Modal>

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
                            label: 'Orçamento',
                            type: 'text',
                            bsClass: 'form-control',
                            onChange: self.updateInput,
                          },
                          {
                            label: 'Pedido',
                            type: 'text',
                            bsClass: 'form-control',
                            // placeholder: 'Username',
                            onChange: self.updateInput2,
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
                            onChange: self.updateInput3,
                          },
                          {
                            label: 'Tipo',
                            type: 'text',
                            bsClass: 'form-control',
                            onChange: self.updateInput4,
                          },
                        ]}
                      />

                      <Row>
                        <Col md={12}>
                          <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Descrição</ControlLabel>
                            <FormControl
                              rows="5"
                              componentClass="textarea"
                              bsClass="form-control"
                            />
                          </FormGroup>
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

export default UserProfile;
