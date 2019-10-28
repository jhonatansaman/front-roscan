import React, { Component } from 'react'
import { Modal, Navbar, Nav, Button } from 'react-bootstrap';
import { Checkbox } from 'semantic-ui-react'
import './editar.css';
import moment from 'moment';
import api from 'services/api'

export default class EditarRecuperacao extends Component {
    state = {
        ordem_servico: '',
        tipo: '',
        cliente: '',
        arrayCategorias: '',
        arrayTempoPos: '',
        arrayEditarTempos: [],
    }


    async limparDados() {
        await this.setState({
            arrayTempoPos: '',
            arrayCategorias: '',
            bPre: false,
            bPos: false,
            arrayEditarTempos: [],
        })
    }

    async preencherGrafico(data, pos, data2, idPre, idPos) {

        const state = this.state;
        if (pos == 1) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, { nome: 'Soldar Ponteira e Alinhamento', tempo: moment.duration(data).asHours().toFixed(2), id: idPre, etapa: 1 }],
                arrayTempoPos: [...state.arrayTempoPos, { nome: 'Soldar Ponteira e Alinhamento', tempo2: moment.duration(data2).asHours().toFixed(2), id: idPos, etapa: 1 }],

            })
        }
        if (pos == 2) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, { nome: 'Desbaste para Limpeza', tempo: moment.duration(data).asHours().toFixed(2), id: idPre, etapa: 2 }],
                arrayTempoPos: [...state.arrayTempoPos, { nome: 'Desbaste para Limpeza', tempo2: moment.duration(data2).asHours().toFixed(2), id: idPos, etapa: 2 }],

            })
        }
        if (pos == 3) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, { nome: 'Camada de Solda I', tempo: moment.duration(data).asHours().toFixed(2), id: idPre, etapa: 3 }],
                arrayTempoPos: [...state.arrayTempoPos, { nome: 'Camada de Solda I', tempo2: moment.duration(data2).asHours().toFixed(2), id: idPos, etapa: 3 }],

            })
        }
        if (pos == 4) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, { nome: 'Usinagem para Desbaste I', tempo: moment.duration(data).asHours().toFixed(2), id: idPre, etapa: 4 }],
                arrayTempoPos: [...state.arrayTempoPos, { nome: 'Usinagem para Desbaste I', tempo2: moment.duration(data2).asHours().toFixed(2), id: idPos, etapa: 4 }],

            })
        }
        if (pos == 5) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, { nome: 'Camada de Solda II', tempo: moment.duration(data).asHours().toFixed(2), id: idPre, etapa: 5 }],
                arrayTempoPos: [...state.arrayTempoPos, { nome: 'Camada de Solda II', tempo2: moment.duration(data2).asHours().toFixed(2), id: idPos, etapa: 5 }],

            })
        }
        if (pos == 6) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, { nome: 'Usinagem para Desbate II', tempo: moment.duration(data).asHours().toFixed(2), id: idPre, etapa: 6 }],
                arrayTempoPos: [...state.arrayTempoPos, { nome: 'Usinagem para Desbate II', tempo2: moment.duration(data2).asHours().toFixed(2), id: idPos, etapa: 6 }],

            })
        }
        if (pos == 7) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, { nome: 'Camada de Solda III', tempo: moment.duration(data).asHours().toFixed(2), id: idPre, etapa: 7 }],
                arrayTempoPos: [...state.arrayTempoPos, { nome: 'Camada de Solda III', tempo2: moment.duration(data2).asHours().toFixed(2), id: idPos, etapa: 7 }],

            })
        }
        if (pos == 8) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, { nome: 'Usinagem para Desbate III', tempo: moment.duration(data).asHours().toFixed(2), id: idPre, etapa: 8 }],
                arrayTempoPos: [...state.arrayTempoPos, { nome: 'Usinagem para Desbate III', tempo2: moment.duration(data2).asHours().toFixed(2), id: idPos, etapa: 8 }],

            })
        }
        if (pos == 9) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, { nome: 'Desbaste na Lixadeira', tempo: moment.duration(data).asHours().toFixed(2), id: idPre, etapa: 9 }],
                arrayTempoPos: [...state.arrayTempoPos, { nome: 'Desbaste na Lixadeira', tempo2: moment.duration(data2).asHours().toFixed(2), id: idPos, etapa: 9 }],

            })
        }
        if (pos == 10) {
            this.setState({
                arrayCategorias: [...state.arrayCategorias, { nome: 'Usinagem Final', tempo: moment.duration(data).asHours().toFixed(2), id: idPre, etapa: 10 }],
                arrayTempoPos: [...state.arrayTempoPos, { nome: 'Usinagem Final', tempo2: moment.duration(data2).asHours().toFixed(2), id: idPos, etapa: 10 }],

            })
        }

    }

    async temposPre() {

        const response = await api.post('/recuperacao/buscarTemposPre', {
            idrecuperacao: this.props.itemSelecionado.idrecuperacao
        })
        const data = response.data;

        console.log("data: ", data)

        const response2 = await api.post('/recuperacao/buscarTempoTotal', {
            idrecuperacao: this.props.itemSelecionado.idrecuperacao
        })
        const data2 = response2.data;

        console.log("data2: ", data2)

        data.forEach(obj => {
            data2.forEach(obj2 => {
                for (let i = 1; i < 11; i++) {
                    if (obj[`t${i}`] != null || obj2[`t${i}`] != null)
                        this.preencherGrafico(obj[`t${i}`], i, obj2[`t${i}`], obj[`id${i}`], obj2[`id${i}`]);
                }
            })
        })
    }

    async componentWillReceiveProps(props) {
        await this.limparDados();

        if (typeof (props.itemSelecionado) === 'object') {
            await this.setState({ ordem_servico: props.itemSelecionado.ordem_servico, cliente: props.itemSelecionado.cliente, tipo: props.itemSelecionado.tipo })
            await this.temposPre();
        }

    }

    async handleInput(e, key, item, t){
       if(key == 0){
            this.state.arrayEditarTempos[0] = { id: item.id, tempo: e.target.value, etapa: item.etapa, coluna: t }
            this.forceUpdate();
       }
       if(key == 1){
            this.state.arrayEditarTempos[1] = { id: item.id, tempo: e.target.value, etapa: item.etapa, coluna: t }
            this.forceUpdate();
       }
       if(key == 2){
            this.state.arrayEditarTempos[2] = { id: item.id, tempo: e.target.value, etapa: item.etapa, coluna: t }
            this.forceUpdate();
       }
       if(key == 3){
            this.state.arrayEditarTempos[3] = { id: item.id, tempo: e.target.value, etapa: item.etapa, coluna: t }
            this.forceUpdate();
       }
       if(key == 4){
            this.state.arrayEditarTempos[4] = { id: item.id, tempo: e.target.value, etapa: item.etapa, coluna: t }
            this.forceUpdate();
       }
       if(key == 5){
            this.state.arrayEditarTempos[5] = { id: item.id, tempo: e.target.value, etapa: item.etapa, coluna: t }
            this.forceUpdate();
       }
       if(key == 6){
            this.state.arrayEditarTempos[6] = { id: item.id, tempo: e.target.value, etapa: item.etapa, coluna: t }
            this.forceUpdate();
       }
       if(key == 7){
            this.state.arrayEditarTempos[7] = { id: item.id, tempo: e.target.value, etapa: item.etapa, coluna: t }
            this.forceUpdate();
       }
       if(key == 8){
            this.state.arrayEditarTempos[8] = { id: item.id, tempo: e.target.value, etapa: item.etapa, coluna: t }
            this.forceUpdate();
       }
       if(key == 9){
            this.state.arrayEditarTempos[9] = { id: item.id, tempo: e.target.value, etapa: item.etapa, coluna: t }
            this.forceUpdate();
       }
       
    }

    bPos(){
        if(this.state.arrayEditarTempos.length >= 1){
            alert("Clique em editar para salvar as alterações")
            return 0;
        }
        this.setState({ bPos: true, bPre: false, arrayEditarTempos: [] });
    }

    bPre(){
        if(this.state.arrayEditarTempos.length >= 1){
            alert("Clique em editar para salvar as alterações")
            return 0;
        }
        this.setState({ bPos: false, bPre: true, arrayEditarTempos: [] });
    }

    async editarDados(){
        var filtered = this.state.arrayEditarTempos.filter(function (el) {
            return el != null;
        });

        await api.post('/recuperacao/editarTempos', { arrayEditar: filtered })
        await this.setState({ arrayEditarTempos: [] });
        await this.limparDados();
        this.props.close();
    }

    render() {
        const self = this.props;
        const state = this.state;
        return (
            <div>
                <Modal
                    show={self.open}
                    onHide={() => self.close()}
                    size="lg"
                >
                    <Modal.Header closeButton><p style={{ fontSize: 16, marginBottom: 0, fontWeight: 'bold' }}>Ordem de Serviço: {state.ordem_servico}</p>
                        <p style={{ fontSize: 12, marginBottom: 0 }}>Cliente: {state.cliente}, Tipo: {state.tipo}</p>
                    </Modal.Header>
                    <Modal.Body
                    >
                        <div className="container">
                            <div style={{ marginLeft: 150 }}>
                                <Button onClick={() => this.bPre()} className="bPre">Tempo Pré</Button>
                                <Button onClick={() => this.bPos()} className="bPre2">Tempos Pós</Button>
                            </div>
                            <div className="line" />
                            {this.state.bPre && !this.state.bPos ?
                                <div>
                                    <p>Tempos Pré Cadastrados</p>
                                    <div className="item1">
                                        {this.state.arrayCategorias != '' ?
                                            this.state.arrayCategorias.map((item, index) => {
                                                if (index <= 4) {
                                                    if (item.tempo.substring(0, 2) < 10)
                                                        var t = "0" + item.tempo.replace(".", ":");
                                                    else
                                                        var t = item.tempo.replace(".", ":");
                                                    return (

                                                        <div>
                                                            <p>{item.nome}</p>
                                                            <input defaultValue={t} onChange={(e) => this.handleInput(e, index, item, 'tempo_pre')} min="00:00:00" max="24:00:00" type="time" />
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        null
                                                    )
                                                }
                                            })
                                            : null
                                        }
                                    </div>
                                    <div className="item1">
                                        {this.state.arrayCategorias != '' ?
                                            this.state.arrayCategorias.map((item, index) => {
                                                if (index >= 5) {
                                                    if (item.tempo.substring(0, 2) < 10)
                                                        var t = "0" + item.tempo.replace(".", ":");
                                                    else
                                                        var t = item.tempo.replace(".", ":");
                                                    return (
                                                        <div>
                                                            <p>{item.nome}</p>
                                                            <input onChange={(e) => this.handleInput(e, index, item, 'tempo_pre')} defaultValue={t} min="00:00:00" max="24:00:00" type="time" />
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        null
                                                    )
                                                }
                                            })
                                            : null
                                        }
                                    </div>
                                </div>
                                : this.state.bPos && !this.state.bPre ?
                                    <div>
                                        <p>Tempos Pós Cadastrados</p>
                                        <div className="item2">
                                            {this.state.arrayTempoPos != '' ?
                                                this.state.arrayTempoPos.map((item, index) => {
                                                    if (index <= 4) {
                                                        if (item.tempo2.substring(0, 2) < 10)
                                                            var t = "0" + item.tempo2.replace(".", ":");
                                                        else
                                                            var t = item.tempo2.replace(".", ":");
                                                        return (
                                                            <div>
                                                                <p>{item.nome}</p>
                                                                <input key={index} onChange={(e) => this.handleInput(e, index, item, 'tempo_total',)} defaultValue={t} min="00:00:00" max="24:00:00" type="time" />
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            null
                                                        )
                                                    }
                                                })
                                                : null
                                            }
                                        </div>
                                        <div className="item2" >
                                            {this.state.arrayTempoPos != '' ?
                                                this.state.arrayTempoPos.map((item, index) => {
                                                    if (index >= 5) {
                                                        if (item.tempo2.substring(0, 1) < 10)
                                                            var t = "0" + item.tempo2.replace(".", ":");
                                                        else
                                                            var t = item.tempo2.replace(".", ":");
                                                        return (
                                                            <div>
                                                                <p>{item.nome}</p>
                                                                <input key={index} onChange={(e) => this.handleInput(e, index, item, 'tempo_total')} defaultValue={t} min="00:00:00" max="24:00:00" type="time" />
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            null
                                                        )
                                                    }
                                                })
                                                : null
                                            }
                                        </div>
                                    </div>
                                    : null
                            }

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary">Cancelar</Button>
                        <Button variant="primary" onClick={() => this.editarDados()} >Editar</Button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}
