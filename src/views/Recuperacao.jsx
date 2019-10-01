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

import ReactApexChart from "react-apexcharts";
import BarChart from 'components/Grafico_Comparativo/barChart';
const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class Recuperacao extends Component {
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
  constructor(props) {
    super(props);

    this.updateInput = this.updateInput.bind(this);
    this.ordem_servico = this.ordem_servico.bind(this);
    this.cliente = this.cliente.bind(this);
    this.tipo = this.tipo.bind(this);
    this.data_inicial = this.data_inicial.bind(this);
    this.closeModal = this.closeModal.bind(this);


    this.state = {
      orcamento: '',
      pedido: '',
      cliente: '',
      tipo: '',
      formSubmitted: false, // Indicates submit status of login form
      loading: false, // Indicates in progress state of login form
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
      etapa6: false,
      etapa7: false,
      etapa8: false,
      etapa9: false,
      id_recuperacao: '',
      tempo_soldar_ponteira: '',
      tempo_camada_solda: '',
      tempo_camada_solda2: '',
      tempo_camada_solda3: '',
      tempo_usinagem_desbaste: '',
      tempo_usinagem_desbaste2: '',
      tempo_usinagem_desbaste3: '',
      tempo_desbaste_limpeza: '',
      tempo_usinagem_final: '',
      tempo_desbaste_lixadeira: '',
      showLoading: false,
      loading: true,
      showModalConfirmar: false,
      habilitarInput: [true, true, true, true, true, true, true, true, true],
      ordem_servico: '',
      data_inicial: '',
      clienteEditar: '',
      tipoEditar: '',
      buscouRecuperacao: false,
      arrayConsultarRecuperacao: '',
      showModalConsultaRecuperacao: false,
      idEtapa_validacao: [],
      options: {
        labels: [],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      series: [],
      tempoTotal: '',
      tempo_id_primeira_etapa: '',
      tempo_id_segunda_etapa: '',
      tempo_id_terceira_etapa: '',
      tempo_id_quarta_etapa: '',
      tempo_id_quinta_etapa: '',
      tempo_id_sexta_etapa: '',
      tempo_id_setima_etapa: '',
      tempo_id_oitava_etapa: '',
      tempo_id_nona_etapa: '',
      tempo_id_decima_etapa: '',
      modalCompare: false,
      id_recuperacao_editar: '',
      infoGeral: ''
    }
  };

  async updateInput(event, i) {
    if (i == 1)
      await this.setState({ tempo_soldar_ponteira: event.target.value })
    if (i == 2)
      await this.setState({ tempo_desbaste_limpeza: event.target.value })
    if (i == 3)
      await this.setState({ tempo_camada_solda: event.target.value })
    if (i == 4)
      await this.setState({ tempo_usinagem_desbaste: event.target.value })
    if (i == 5)
      await this.setState({ tempo_camada_solda2: event.target.value })
    if (i == 6)
      await this.setState({ tempo_usinagem_desbaste2: event.target.value })
    if (i == 7)
      await this.setState({ tempo_camada_solda3: event.target.value })
    if (i == 8)
      await this.setState({ tempo_usinagem_desbaste3: event.target.value })
    if (i == 9)
      await this.setState({ tempo_desbaste_lixadeira: event.target.value })
    if (i == 10)
      await this.setState({ tempo_usinagem_final: event.target.value })
    if (i == 11) {
      await this.setState({ infoGeral: event.target.value })
    }
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
    if (opcao == 6) {
      if (this.state.arrayEtapas[5] == 6) {
        this.state.arrayEtapas.splice(5, 1);
        this.state.habilitarInput[5] = !this.state.habilitarInput[5];
        this.forceUpdate();
      } else {
        this.state.arrayEtapas[5] = opcao;
        this.state.habilitarInput[5] = false;
        this.forceUpdate();
      }
    }
    if (opcao == 7) {
      if (this.state.arrayEtapas[6] == 7) {
        this.state.arrayEtapas.splice(6, 1);
        this.state.habilitarInput[6] = !this.state.habilitarInput[6];
        this.forceUpdate();
      } else {
        this.state.arrayEtapas[6] = opcao;
        this.state.habilitarInput[6] = false;
        this.forceUpdate();
      }
    }
    if (opcao == 8) {
      if (this.state.arrayEtapas[7] == 8) {
        this.state.arrayEtapas.splice(7, 1);
        this.state.habilitarInput[7] = !this.state.habilitarInput[7];
        this.forceUpdate();
      } else {
        this.state.arrayEtapas[7] = opcao;
        this.state.habilitarInput[7] = false;
        this.forceUpdate();
      }
    }
    if (opcao == 9) {
      if (this.state.arrayEtapas[8] == 9) {
        this.state.arrayEtapas.splice(8, 1);
        this.state.habilitarInput[8] = !this.state.habilitarInput[8];
        this.forceUpdate();
      } else {
        this.state.arrayEtapas[8] = opcao;
        this.state.habilitarInput[8] = false;
        this.forceUpdate();
      }
    }
    if (opcao == 10) {
      if (this.state.arrayEtapas[9] == 10) {
        this.state.arrayEtapas.splice(9, 1);
        this.state.habilitarInput[9] = !this.state.habilitarInput[9];
        this.forceUpdate();
      } else {
        this.state.arrayEtapas[9] = opcao;
        this.state.habilitarInput[9] = false;
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

    //se buscou recuperação, cadastrar a partir do que veio do app
    if (this.state.buscouRecuperacao) {
      await api.post('/posts/attCadastroRecuperacao', {
        id_recuperacao: this.state.id_recuperacao,
        ordem_servico: this.state.os,
        cliente: this.state.cliente,
        data_inicial: this.state.data,
        tipo: this.state.tipo,
        info: this.state.infoGeral,
      });
    }

    //Cadastrar recuperaçao a partir da web
    if (!this.state.buscouRecuperacao) {
      await api.post('/posts/preCadastroRecuperacao', {
        ordem_servico: this.state.os,
        cliente: this.state.cliente,
        tipo: this.state.tipo,
        date: this.state.data,
        info: this.state.infoGeral,
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
          etapa: 1,
          status_fim_etapa: 0

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
          tempo_pre: this.state.tempo_desbaste_limpeza,
          etapa: 2,
          status_fim_etapa: 0

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
      //soldar ponteira 2
      if (this.state.arrayEtapas[i] == 3) {
        await this.setState({ etapa3: true })
        await api.post('/posts/etapaCadastro', {
          tempo_parcial: 0,
          tempo_pre: this.state.tempo_camada_solda,
          etapa: 3,
          status_fim_etapa: 0

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
          tempo_pre: this.state.tempo_usinagem_desbaste,
          etapa: 4,
          status_fim_etapa: 0

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
          tempo_pre: this.state.tempo_camada_solda2,
          etapa: 5,
          status_fim_etapa: 0

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
      if (this.state.arrayEtapas[i] == 6) {
        await this.setState({ etapa2: true })
        await api.post('/posts/etapaCadastro', {
          tempo_parcial: 0,
          tempo_pre: this.state.tempo_usinagem_desbaste2,
          etapa: 6,
          status_fim_etapa: 0

        });
        const response6 = await api.post('/posts/pegarUltimoCadastro', {
          etapa: 6
        })
        await api.post('posts/updateRecuperacao', {
          id_recuperacao: this.state.id_recuperacao,
          id_sexta_etapa: response6.data[0].id_sexta_etapa,
          etapa: 6,
        });
      }
      if (this.state.arrayEtapas[i] == 7) {
        await this.setState({ etapa7: true })
        await api.post('/posts/etapaCadastro', {
          tempo_parcial: 0,
          tempo_pre: this.state.tempo_camada_solda3,
          etapa: 7,
          status_fim_etapa: 0

        });
        const response7 = await api.post('/posts/pegarUltimoCadastro', {
          etapa: 7
        })
        await api.post('posts/updateRecuperacao', {
          id_recuperacao: this.state.id_recuperacao,
          id_setima_etapa: response7.data[0].id_setima_etapa,
          etapa: 7,
        });
      }
      if (this.state.arrayEtapas[i] == 8) {
        await this.setState({ etapa8: true })
        await api.post('/posts/etapaCadastro', {
          tempo_parcial: 0,
          tempo_pre: this.state.tempo_usinagem_desbaste3,
          etapa: 8,
          status_fim_etapa: 0

        });
        const response8 = await api.post('/posts/pegarUltimoCadastro', {
          etapa: 8
        })
        await api.post('posts/updateRecuperacao', {
          id_recuperacao: this.state.id_recuperacao,
          id_oitava_etapa: response8.data[0].id_oitava_etapa,
          etapa: 8,
        });
      }
      if (this.state.arrayEtapas[i] == 9) {
        await this.setState({ etapa9: true })
        await api.post('/posts/etapaCadastro', {
          tempo_parcial: 0,
          tempo_pre: this.state.tempo_desbaste_lixadeira,
          etapa: 9,
          status_fim_etapa: 0

        });
        const response9 = await api.post('/posts/pegarUltimoCadastro', {
          etapa: 9
        })
        await api.post('posts/updateRecuperacao', {
          id_recuperacao: this.state.id_recuperacao,
          id_nona_etapa: response9.data[0].id_nona_etapa,
          etapa: 9,
        });
      }
      if (this.state.arrayEtapas[i] == 10) {
        await this.setState({ etapa9: true })
        await api.post('/posts/etapaCadastro', {
          tempo_parcial: 0,
          tempo_pre: this.state.tempo_usinagem_final,
          etapa: 10,
          status_fim_etapa: 0

        });
        const response9 = await api.post('/posts/pegarUltimoCadastro', {
          etapa: 10
        })
        await api.post('posts/updateRecuperacao', {
          id_recuperacao: this.state.id_recuperacao,
          id_decima_etapa: response9.data[0].id_decima_etapa,
          etapa: 10,
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

  async consultarRecuperacao() {
    const responseRecuperacao = await api.get('/get/consultarRecuperacaoStatus1');

    if (responseRecuperacao.data != 0)
      this.setState({ arrayConsultarRecuperacao: responseRecuperacao.data, showModalConsultaRecuperacao: true })
    else
      alert("Nenhum cadastro foi efetuado!");
  }

  async validarEtapas() {
    const etapa = this.state.etapasSetadas

    if (etapa.id_primeira_etapa != null) {
      this.state.idEtapa_validacao[0] = true;
      this.forceUpdate();
    }
    if (etapa.id_segunda_etapa != null) {
      this.state.idEtapa_validacao[1] = true;
      this.forceUpdate();
    }
    if (etapa.id_terceira_etapa != null) {
      this.state.idEtapa_validacao[2] = true;
      this.forceUpdate();
    }
    if (etapa.id_quarta_etapa != null) {
      this.state.idEtapa_validacao[3] = true;
      this.forceUpdate();
    }
    if (etapa.id_quinta_etapa != null) {
      this.state.idEtapa_validacao[4] = true;
      this.forceUpdate();
    }
    if (etapa.id_sexta_etapa != null) {
      this.state.idEtapa_validacao[5] = true;
      this.forceUpdate();
    }
    if (etapa.id_setima_etapa != null) {
      this.state.idEtapa_validacao[6] = true;
      this.forceUpdate();
    }
    if (etapa.id_oitava_etapa != null) {
      this.state.idEtapa_validacao[7] = true;
      this.forceUpdate();
    }
    if (etapa.id_nona_etapa != null) {
      this.state.idEtapa_validacao[8] = true;
      this.forceUpdate();
    }
    if (etapa.id_decima_etapa != null) {
      this.state.idEtapa_validacao[9] = true;
      this.forceUpdate();
    }

  }
  async buscarTempos() {
    const etapa = this.state.etapasSetadas

    if (this.state.idEtapa_validacao[0] == true) {
      const receberTempo1 = await api.post('/posts/buscarTempoPreDefinido', { id_primeira_etapa: etapa.id_primeira_etapa, etapa: 1 })
      console.log("Receber Tempo: ", receberTempo1.data[0].tempo_pre)
      if (receberTempo1.data[0].tempo_pre != null) {
        this.setState({ tempo_id_primeira_etapa: receberTempo1.data[0].tempo_pre })
      }
    }
    if (this.state.idEtapa_validacao[1] == true) {
      const receberTempo2 = await api.post('/posts/buscarTempoPreDefinido', { id_segunda_etapa: etapa.id_segunda_etapa, etapa: 2 })
      console.log("Receber Tempo: ", receberTempo2.data[0].tempo_pre)
      if (receberTempo2.data[0].tempo_pre != null) {
        this.setState({ tempo_id_segunda_etapa: receberTempo2.data[0].tempo_pre })
      }
    }
    if (this.state.idEtapa_validacao[2] == true) {
      const receberTempo3 = await api.post('/posts/buscarTempoPreDefinido', { id_terceira_etapa: etapa.id_terceira_etapa, etapa: 3 })
      console.log("Receber Tempo: ", receberTempo3.data[0].tempo_pre)
      if (receberTempo3.data[0].tempo_pre != null) {
        this.setState({ tempo_id_terceira_etapa: receberTempo3.data[0].tempo_pre })
      }
    }
    if (this.state.idEtapa_validacao[3] == true) {
      const receberTempo4 = await api.post('/posts/buscarTempoPreDefinido', { id_quarta_etapa: etapa.id_quarta_etapa, etapa: 4 })
      console.log("Receber Tempo: ", receberTempo4.data[0].tempo_pre)
      if (receberTempo4.data[0].tempo_pre != null) {
        this.setState({ tempo_id_quarta_etapa: receberTempo4.data[0].tempo_pre })
      }
    }

    if (this.state.idEtapa_validacao[4] == true) {
      const receberTempo5 = await api.post('/posts/buscarTempoPreDefinido', { id_quinta_etapa: etapa.id_quinta_etapa, etapa: 5 })
      console.log("Receber Tempo: ", receberTempo5.data[0].tempo_pre)
      if (receberTempo5.data[0].tempo_pre != null) {
        this.setState({ tempo_id_quinta_etapa: receberTempo5.data[0].tempo_pre })
      }
    }
    if (this.state.idEtapa_validacao[5] == true) {
      const receberTempo6 = await api.post('/posts/buscarTempoPreDefinido', { id_sexta_etapa: etapa.id_sexta_etapa, etapa: 6 })
      console.log("Receber Tempo: ", receberTempo6.data[0].tempo_pre)
      if (receberTempo6.data[0].tempo_pre != null) {
        this.setState({ tempo_id_sexta_etapa: receberTempo6.data[0].tempo_pre })
      }
    }
    if (this.state.idEtapa_validacao[6] == true) {
      const receberTempo7 = await api.post('/posts/buscarTempoPreDefinido', { id_setima_etapa: etapa.id_setima_etapa, etapa: 7 })
      console.log("Receber Tempo: ", receberTempo7.data[0].tempo_pre)
      if (receberTempo7.data[0].tempo_pre != null) {
        this.setState({ tempo_id_setima_etapa: receberTempo7.data[0].tempo_pre })
      }
    }
    if (this.state.idEtapa_validacao[7] == true) {
      const receberTempo8 = await api.post('/posts/buscarTempoPreDefinido', { id_oitava_etapa: etapa.id_oitava_etapa, etapa: 8 })
      console.log("Receber Tempo: ", receberTempo8.data[0].tempo_pre)
      if (receberTempo8.data[0].tempo_pre != null) {
        this.setState({ tempo_id_oitava_etapa: receberTempo8.data[0].tempo_pre })
      }
    }
    if (this.state.idEtapa_validacao[8] == true) {
      const receberTempo9 = await api.post('/posts/buscarTempoPreDefinido', { id_nona_etapa: etapa.id_nona_etapa, etapa: 9 })
      console.log("Receber Tempo: ", receberTempo9.data[0].tempo_pre)
      if (receberTempo9.data[0].tempo_pre != null) {
        this.setState({ tempo_id_nona_etapa: receberTempo9.data[0].tempo_pre })
      }
    }
    if (this.state.idEtapa_validacao[9] == true) {
      const receberTempo10 = await api.post('/posts/buscarTempoPreDefinido', { id_decima_etapa: etapa.id_decima_etapa, etapa: 10 })
      console.log("Receber Tempo: ", receberTempo10.data[0].tempo_pre)
      if (receberTempo10.data[0].tempo_pre != null) {
        this.setState({ tempo_id_decima_etapa: receberTempo10.data[0].tempo_pre })
      }
    }

    // await this.setState({ tempoTotal: parseInt(this.state.tempo_id_primeira_etapa) + parseInt(this.state.tempo_id_segunda_etapa) + parseInt(this.state.tempo_id_terceira_etapa) + parseInt(this.state.tempo_id_quarta_etapa) + parseInt(this.state.tempo_id_quinta_etapa) + parseInt(this.state.tempo_solda2) + parseInt(this.state.tempo_solda3) + parseInt(this.state.tempo_usinagem2) + parseInt(this.state.tempo_usinagem3) })
    // console.log("tempo total: ", parseInt(this.state.tempoTotal));

    this.setarValoresGrafico();
  }

  async editarTabela(idrecuperacao) {
    const response = await api.post('/posts/consultarRecuperacao', { idrecuperacao: idrecuperacao })
    console.log("consultar recuperação: ", response.data);

    await this.setState({ etapasSetadas: response.data[0] })
    this.validarEtapas();
    this.buscarTempos();
    console.log("options: ", this.state.options);

    this.setState({ showModalChart: true, showModalConsultaRecuperacao: false })
  }

  async setarValoresGrafico() {

    if (this.state.idEtapa_validacao[0] == true && this.state.tempo_id_primeira_etapa != 0) {
      await this.setState({
        options: { labels: [...this.state.options.labels, 'Soldar Ponteira e Alinhamento'], responsive: [{ breakpoint: 480, options: { chart: { width: 350 }, legend: { position: 'bottom' } } }] },
        series: [...this.state.series, parseFloat(this.state.tempo_id_primeira_etapa)]
      })
    }
    if (this.state.idEtapa_validacao[1] == true && this.state.tempo_id_segunda_etapa != 0) {
      await this.setState({
        options: { labels: [...this.state.options.labels, 'Desbaste para Limpeza'], responsive: [{ breakpoint: 480, options: { chart: { width: 350 }, legend: { position: 'bottom' } } }] },
        series: [...this.state.series, parseFloat(this.state.tempo_id_segunda_etapa)]
      })

    }
    if (this.state.idEtapa_validacao[2] == true && this.state.tempo_id_terceira_etapa != 0) {
      await this.setState({
        options: { labels: [...this.state.options.labels, 'Camada de Solda I'], responsive: [{ breakpoint: 480, options: { chart: { width: 350 }, legend: { position: 'bottom' } } }] },
        series: [...this.state.series, parseFloat(this.state.tempo_id_terceira_etapa)]
      })

    }
    if (this.state.idEtapa_validacao[3] == true && this.state.tempo_id_quarta_etapa != 0) {
      await this.setState({
        options: { labels: [...this.state.options.labels, 'Usinagem para Desbaste I'], responsive: [{ breakpoint: 480, options: { chart: { width: 350 }, legend: { position: 'bottom' } } }] },
        series: [...this.state.series, parseFloat(this.state.tempo_id_quarta_etapa)]
      })
    }
    if (this.state.idEtapa_validacao[4] == true && this.state.tempo_id_quinta_etapa != 0) {
      await this.setState({
        options: { labels: [...this.state.options.labels, 'Camada de Solda II'], responsive: [{ breakpoint: 480, options: { chart: { width: 350 }, legend: { position: 'bottom' } } }] },
        series: [...this.state.series, parseFloat(this.state.tempo_id_quinta_etapa)]
      })

    }
    if (this.state.idEtapa_validacao[5] == true && this.state.tempo_id_sexta_etapa != 0) {
      await this.setState({
        options: { labels: [...this.state.options.labels, 'Usinagem para Desbaste II'], responsive: [{ breakpoint: 480, options: { chart: { width: 350 }, legend: { position: 'bottom' } } }] },
        series: [...this.state.series, parseFloat(this.state.tempo_id_sexta_etapa)]
      })


    }
    if (this.state.idEtapa_validacao[6] == true && this.state.tempo_id_setima_etapa != 0) {
      await this.setState({
        options: { labels: [...this.state.options.labels, 'Camada de Solda III'], responsive: [{ breakpoint: 480, options: { chart: { width: 350 }, legend: { position: 'bottom' } } }] },
        series: [...this.state.series, parseFloat(this.state.tempo_id_setima_etapa)]
      })

    }

    if (this.state.idEtapa_validacao[7] == true && this.state.tempo_id_oitava_etapa != 0) {
      await this.setState({
        options: { labels: [...this.state.options.labels, 'Usinagem para Desbaste III'], responsive: [{ breakpoint: 480, options: { chart: { width: 350 }, legend: { position: 'bottom' } } }] },
        series: [...this.state.series, parseFloat(this.state.tempo_id_oitava_etapa)]
      })

    }
    if (this.state.idEtapa_validacao[8] == true && this.state.tempo_id_nona_etapa != 0) {
      await this.setState({
        options: { labels: [...this.state.options.labels, 'Desbaste na Lixadeira'], responsive: [{ breakpoint: 480, options: { chart: { width: 350 }, legend: { position: 'bottom' } } }] },
        series: [...this.state.series, parseFloat(this.state.tempo_id_nona_etapa)]
      })
    }
    if (this.state.idEtapa_validacao[8] == true && this.state.tempo_id_nona_etapa != 0) {
      await this.setState({
        options: { labels: [...this.state.options.labels, 'Usinagem Final'], responsive: [{ breakpoint: 480, options: { chart: { width: 350 }, legend: { position: 'bottom' } } }] },
        series: [...this.state.series, parseFloat(this.state.tempo_id_decima_etapa)]
      })
    }
    console.log("options para ver label: ", this.state.options);
    console.log("para ver as series: ", this.state.series);

  }

  async limparDados() {
    await this.setState({
      showModalChart: false, showModalConsultaRecuperacao: true,
      options: { labels: [], responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }] },
      series: [], idEtapa_validacao: [], tempoTotal: ''
    })
  }

  async graficoComparativo(idrecuperacao) {
    await this.setState({ modalCompare: true, showModalConsultaRecuperacao: false, id_recuperacao_editar: idrecuperacao })
  }

  closeModal() {
    this.setState({ modalCompare: !this.state.modalCompare, showModalConsultaRecuperacao: true })
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


    const botoes = (cell, row, rowIndex) => {
      return (
        <div>
          {/* <a href={cell} onClick={() => alert(JSON.stringify(row.id_estoque))}>
                    See mail
                  </a> */}
          <i
            onClick={() =>
              this.editarTabela(
                JSON.stringify(row.idrecuperacao),
              )
            }
            className="fa fa-pie-chart"
            style={{ color: 'green', fontSize: 20 }}
          />
          <i
            onClick={() =>
              this.graficoComparativo(
                JSON.stringify(row.idrecuperacao),
              )
            }
            className="fa fa-bar-chart"
            style={{ color: '#ccc', fontSize: 20, marginLeft: 10 }}
          />
        </div>
      );
    };

    const columns = [
      {
        dataField: 'idrecuperacao',
        text: 'ID',
      },
      {
        dataField: 'ordem_servico',
        text: 'OS',
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
        dataField: 'date',
        text: 'Data',
      },
      {
        dataField: 'button',
        text: 'Ações',
        formatter: botoes,
      },
    ];
    return (
      <div>
        <BarChart open={this.state.modalCompare} close={this.closeModal} id_recuperacao={this.state.id_recuperacao_editar} />
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
                  <MenuItem eventKey={2.1}>Nenhum Cadastro</MenuItem>
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
                    this.consultarRecuperacao()
                  }
                  eventKey={2.1}
                >
                  Consultar Recuperações
                </MenuItem>
              </NavDropdown>
              <NavItem eventKey={3} href="#">
                Sair
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* modal de gráfico */}
        <Modal
          show={this.state.showModalChart}
          onHide={() => this.limparDados()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Consulta de Recuperação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width="550" />
            {/* <p>Tempo total: {this.state.tempoTotal}</p> */}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() =>
                this.limparDados()}
            >
              Sair
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal consultar recuperação */}
        <Modal
          show={this.state.showModalConsultaRecuperacao}
          onHide={() => this.setState({ showModalConsultaRecuperacao: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Consulta de Recuperação</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ToolkitProvider
              keyField="id"
              data={this.state.arrayConsultarRecuperacao}
              columns={columns}
              search
            >
              {props => (
                <div>
                  <SearchBar
                    placeholder="Pesquisar"
                    id="search_txt"
                    style={{ width: 470, marginRight: 10 }}
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
                this.setState({ showModalConsultaRecuperacao: false })
              }
            >
              Sair
            </Button>
          </Modal.Footer>
        </Modal>

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
                            type: 'date',
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
                        <Col md="12">
                          <label>Informações Gerais</label>
                          <textarea style={{ width: '100%' }} onChange={(e) => this.updateInput(e, 11)} />
                        </Col>
                      </Row>
                      {/* <FormInputs
                        ncols={['col-md-12']}
                        properties={[
                          {
                            label: 'Informações Gerais',
                            type: 'text',
                            bsClass: 'form-control',
                            onChange: self.cliente,
                            defaultValue: self.state.cliente
                          },
                        ]}
                      /> */}

                      <Row>
                        <Col md={12}>
                          <div style={{ flexDirection: 'row' }}>
                            <FormGroup controlId="formControlsTextarea">
                              <ControlLabel>Selecione a(s) etapa(s)</ControlLabel>
                              <Checkbox label='Soldar Ponteira e Alinhamento' onClick={() => this.check(1)} />
                              <input disabled={this.state.habilitarInput[0]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={(e) => this.updateInput(e, 1)} type="time" />
                              <Checkbox label='Desbaste para Limpeza' onClick={() => this.check(2)} />
                              <input disabled={this.state.habilitarInput[1]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={(e) => this.updateInput(e, 2)} type="time" />
                              <Checkbox label='Camada de Solda I' onClick={() => this.check(3)} />
                              <input disabled={this.state.habilitarInput[2]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={(e) => this.updateInput(e, 3)} type="time" />
                              <Checkbox label='Usinagem Para Desbaste I' onClick={() => this.check(4)} />
                              <input disabled={this.state.habilitarInput[3]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={(e) => this.updateInput(e, 4)} type="time" />
                              <Checkbox label='Camada de Solda II' onClick={() => this.check(5)} />
                              <input disabled={this.state.habilitarInput[4]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={(e) => this.updateInput(e, 5)} type="time" />
                              <Checkbox label='Usinagem Para Desbaste II' onClick={() => this.check(6)} />
                              <input disabled={this.state.habilitarInput[5]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={(e) => this.updateInput(e, 6)} type="time" />
                              <Checkbox label='Camada de Solda III' onClick={() => this.check(7)} />
                              <input disabled={this.state.habilitarInput[6]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={(e) => this.updateInput(e, 7)} type="time" />
                              <Checkbox label='Usinagem Para Desbaste III' onClick={() => this.check(8)} />
                              <input disabled={this.state.habilitarInput[7]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={(e) => this.updateInput(e, 8)} type="time" />
                              <Checkbox label='Desbaste na Lixadeira' onClick={() => this.check(9)} />
                              <input disabled={this.state.habilitarInput[8]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={(e) => this.updateInput(e, 9)} type="time" />
                              <Checkbox label='Usinagem Final' onClick={() => this.check(10)} />
                              <input disabled={this.state.habilitarInput[9]} defaultValue={'00:00'} min="00:00:00" max="24:00:00" onChange={(e) => this.updateInput(e, 10)} type="time" />
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
