import React, { Component } from 'react'
import {
    Modal,
} from 'react-bootstrap';
import Chart from "react-apexcharts";
import api from '../../services/api';


export default class barChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: '',
            arrayCategorias: '',
            arrayDataPre: '',
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: []
                }
            },
            series: [
                {
                    name: "series-1",
                    data: []
                },
                {
                    name: "series-2",
                    data: []
                }
            ],
            ordem_servico: '',
            cliente: '',
            tipo: ''
        };
    }

    async preencherGrafico(data, pos) {
        var verificar = false
        
        if( (data.substring(1) == 0 && data.substring(2) == 1) || data.substring(3) > 0 || data.substring(4) > 0){
            data.replace(/\D/g,"");
            data = data.replace(/\D/g,"")/60;
            verificar = true;
        }
        if(!verificar && (data.substring(0,1) > 0 || data.substring(1, 2) > 0) && (data.substring(3,4) > 0 || data.substring(4,5) > 0)){
            data = data.replace(/\D/g,"")/60;
        }
        const state = this.state;
        if (pos == 1) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Soldar Ponteira e Alinhamento'],
                arrayDataPre: [...state.arrayDataPre, data]
            })
        }
        if (pos == 2) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Desbaste para Limpeza'],
                arrayDataPre: [...state.arrayDataPre, data]
            })
        }
        if (pos == 3) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Camada de Solda I'],
                arrayDataPre: [...state.arrayDataPre, data]
            })
        }
        if (pos == 4) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Usinagem para Desbaste I'],
                arrayDataPre: [...state.arrayDataPre, data]
            })
        }
        if (pos == 5) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Camada de Solda II'],
                arrayDataPre: [...state.arrayDataPre, data]
            })
        }
        if (pos == 6) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Usinagem para Desbate II'],
                arrayDataPre: [...state.arrayDataPre, data]
            })
        }
        if (pos == 7) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Camada de Solda III'],
                arrayDataPre: [...state.arrayDataPre, data]
            })
        }
        if (pos == 8) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Usinagem para Desbate III'],
                arrayDataPre: [...state.arrayDataPre, data]
            })
        }
        if (pos == 9) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Desbaste na Lixadeira'],
                arrayDataPre: [...state.arrayDataPre, data]
            })
        }
        if (pos == 10) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Usinagem Final'],
                arrayDataPre: [...state.arrayDataPre, data]
            })
        }


    }

    preencherArrayGrafico() {
        this.setState({
            options: {
                xaxis: {
                    categories: this.state.arrayCategorias, labels: {
                        style: {
                            color: "#8898aa",
                            fontSize: '13px',
                            fontFamily: 'Nunito',
                            cssClass: 'apexcharts-xaxis-label',
                        }
                    }
                }
            }
        })

        this.setState({
            series: [
                {
                    name: "Gráfico Tempos Prévios",
                    data: this.state.arrayDataPre
                }
            ],
        })


    }

    async limparGrafico() {

        await this.setState({
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: []
                }
            },
            series: [],
            arrayDataPre: '',
            arrayCategorias: '',
        })


    }

    async componentWillReceiveProps(props) {
        // if (props.id_recuperacao !== this.props.id_recuperacao) {
        await this.limparGrafico();

        if (typeof (props.itemSelecionado) === 'object') {
            await this.setState({ ordem_servico: props.itemSelecionado.ordem_servico, cliente: props.itemSelecionado.cliente, tipo: props.itemSelecionado.tipo })

            const response = await api.post('/recuperacao/buscarTemposPre', {
                idrecuperacao: props.id_recuperacao
            })
            const data = response.data;

            data.forEach(obj => {
                for (let i = 1; i < 11; i++) {
                    if (obj[`t${i}`] != null)
                        this.preencherGrafico(obj[`t${i}`], i)
                }
            })
            this.preencherArrayGrafico();
            // }
        }

    }

    render() {
        const self = this.props;
        const state = this.state;
        return (
            <div>
                <Modal
                    show={self.open}
                    onHide={() => (self.close(), this.limparGrafico())}
                    size="lg"
                >
                    <Modal.Header closeButton><p style={{ fontSize: 16, marginBottom: 0, fontWeight: 'bold' }}>Ordem de Serviço: {state.ordem_servico}</p>
                        <p style={{ fontSize: 12, marginBottom: 0 }}>Cliente: {state.cliente}, Tipo: {state.tipo}</p>
                    </Modal.Header>
                    <Modal.Body
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ marginTop: 50, marginBottom: 50 }}>
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="bar"
                                width="550"
                            />
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
