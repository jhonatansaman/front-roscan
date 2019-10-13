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
            arrayDataTotal: '',
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

    async preencherGrafico(data, pos, data2) {
        console.log("data: ", data);
        console.log("data2: ", data2);

        var verificar = false
        var verificar2 = false

        if (data != null) {
            if ((data.substring(1) == 0 && data.substring(2) == 1) || data.substring(3) > 0 || data.substring(4) > 0) {
                data.replace(/\D/g, "");
                data = data.replace(/\D/g, "") / 60;
                verificar = true;
            }
            if (!verificar && (data.substring(0, 1) > 0 || data.substring(1, 2) > 0) && (data.substring(3, 4) > 0 || data.substring(4, 5) > 0)) {
                data = data.replace(/\D/g, "") / 60;
                data = data.num.toFixed(2).slice(0, -1)
            }
            if (data2 != null) {
                if ((data2.substring(1) == 0 && data2.substring(2) == 1) || data2.substring(3) > 0 || data2.substring(4) > 0) {
                    data2.replace(/\D/g, "");
                    data2 = data2.replace(/\D/g, "") / 60;
                    data2 = data2.toFixed(2)
                    verificar2 = true;
                }
                if (!verificar2 && (data2.substring(0, 1) > 0 || data2.substring(1, 2) > 0) && (data2.substring(3, 4) > 0 || data2.substring(4, 5) > 0)) {
                    data2 = data2.replace(/\D/g, "") / 60;
                    data2 = data2.toFixed(2)

                }
            }
        }
        const state = this.state;
        if (pos == 1) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Soldar Ponteira e Alinhamento'],
                arrayDataPre: [...state.arrayDataPre, data],
                arrayDataTotal: [...state.arrayDataTotal, data2],
            })
        }
        if (pos == 2) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Desbaste para Limpeza'],
                arrayDataPre: [...state.arrayDataPre, data],
                arrayDataTotal: [...state.arrayDataTotal, data2],
            })
        }
        if (pos == 3) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Camada de Solda I'],
                arrayDataPre: [...state.arrayDataPre, data],
                arrayDataTotal: [...state.arrayDataTotal, data2],
            })
        }
        if (pos == 4) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Usinagem para Desbaste I'],
                arrayDataPre: [...state.arrayDataPre, data],
                arrayDataTotal: [...state.arrayDataTotal, data2],
            })
        }
        if (pos == 5) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Camada de Solda II'],
                arrayDataPre: [...state.arrayDataPre, data],
                arrayDataTotal: [...state.arrayDataTotal, data2],
            })
        }
        if (pos == 6) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Usinagem para Desbate II'],
                arrayDataPre: [...state.arrayDataPre, data],
                arrayDataTotal: [...state.arrayDataTotal, data2],
            })
        }
        if (pos == 7) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Camada de Solda III'],
                arrayDataPre: [...state.arrayDataPre, data],
                arrayDataTotal: [...state.arrayDataTotal, data2],
            })
        }
        if (pos == 8) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Usinagem para Desbate III'],
                arrayDataPre: [...state.arrayDataPre, data],
                arrayDataTotal: [...state.arrayDataTotal, data2],
            })
        }
        if (pos == 9) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Desbaste na Lixadeira'],
                arrayDataPre: [...state.arrayDataPre, data],
                arrayDataTotal: [...state.arrayDataTotal, data2],
            })
        }
        if (pos == 10) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, 'Usinagem Final'],
                arrayDataPre: [...state.arrayDataPre, data],
                arrayDataTotal: [...state.arrayDataTotal, data2],
            })
        }

        console.log("array data pre: ", this.state.arrayDataPre);
        console.log("array data total: ", this.state.arrayDataTotal);


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
                },
                {
                    name: "Gráfico Tempos Totais",
                    data: this.state.arrayDataTotal
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
            arrayDataTotal: '',
            arrayCategorias: '',
        })


    }

    //esses são meus tempos pré s
    async temposPre() {
        const response = await api.post('/recuperacao/buscarTemposPre', {
            idrecuperacao: this.props.id_recuperacao
        })
        const data = response.data;

        const response2 = await api.post('/recuperacao/buscarTempoTotal', {
            idrecuperacao: this.props.id_recuperacao
        })
        const data2 = response2.data;

        data.forEach(obj => {
            data2.forEach(obj2 => {
                for (let i = 1; i < 11; i++) {
                    if (obj[`t${i}`] != null || obj2[`t${i}`] != null)
                        this.preencherGrafico(obj[`t${i}`], i, obj2[`t${i}`])
                }
            })
        })
    }

    async temposTotal() {
        const response = await api.post('/recuperacao/buscarTempoTotal', {
            idrecuperacao: this.props.id_recuperacao
        })
        const data = response.data;

        data.forEach(obj => {
            for (let i = 1; i < 11; i++) {
                if (obj[`t${i}`] != null)
                    this.preencherGrafico(obj[`t${i}`], i)
            }
        })
    }

    async componentWillReceiveProps(props) {
        // if (props.id_recuperacao !== this.props.id_recuperacao) {
        await this.limparGrafico();

        if (typeof (props.itemSelecionado) === 'object') {
            await this.setState({ ordem_servico: props.itemSelecionado.ordem_servico, cliente: props.itemSelecionado.cliente, tipo: props.itemSelecionado.tipo })

            await this.temposPre();
            // this.temposTotal();
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
