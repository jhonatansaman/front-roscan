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
        };
    }

    async preencherGrafico(data, pos) {
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
        console.log("array categorias: ", state.arrayCategorias);
        console.log("array series: ", state.arrayDataPre);
        

    }

    preencherArrayGrafico() {
        this.setState({
            options: {
                xaxis: { categories: this.state.arrayCategorias }
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
        console.log("CHAMANDO limpar");

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

            console.log("props id recuperacao: ", props.id_recuperacao);
            

            const response = await api.post('/recuperacao/buscarTemposPre', {
                idrecuperacao: props.id_recuperacao
            })

            console.log("consultar de tempos: ", response.data);
            

            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].t1 != null)
                    this.preencherGrafico(response.data[i].t1, 1)
                if (response.data[i].t2 != null)
                    this.preencherGrafico(response.data[i].t2, 2)
                if (response.data[i].t3 != null)
                    this.preencherGrafico(response.data[i].t3, 3)
                if (response.data[i].t4 != null)
                    this.preencherGrafico(response.data[i].t4, 4)
                if (response.data[i].t5 != null)
                    this.preencherGrafico(response.data[i].t5, 5)
                if (response.data[i].t6 != null)
                    this.preencherGrafico(response.data[i].t6, 6)
                if (response.data[i].t7 != null)
                    this.preencherGrafico(response.data[i].t7, 7)
                if (response.data[i].t8 != null)
                    this.preencherGrafico(response.data[i].t8, 8)
                if (response.data[i].t9 != null)
                    this.preencherGrafico(response.data[i].t9, 9)
                if (response.data[i].t10 != null)
                    this.preencherGrafico(response.data[i].t10, 10)

            }
            this.preencherArrayGrafico();
        // }
    }

    render() {
        const self = this.props;
        const state = this.state;
        return (
            <div>
                <Modal
                    show={self.open}
                    onHide={() => (self.close(), this.limparGrafico())}
                    size="sm"
                >
                    <Modal.Header closeButton>Gráfico Comparativo</Modal.Header>
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
