import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { api } from '../../Api/app'
import FormDefault from '../../Components/Form/FormDefault'
import InputDefault from '../../Components/Form/InputDefault'
import InputRow from '../../Components/Form/InputRow'
import H1Page from '../../Components/Layout/H1Page'
import messageStore from '../../Store/MessageStore'
import MessageStore from '../../Store/MessageStore'
//scss
import './Usuario.scss'

export default function DadosPagamento(props) {

    const [load, setLoad] = useState(true)
    const [data, setData] = useState(
        {
            enderecoCobranca: {},
            creditCard: {}
        }
    )
    const history = useHistory()

    useEffect(() => {

        api.get('profile').then( response => {

            api.get('/accounts/'+response.data.accountId).then( account => {

                setData({...account.data})
                setLoad(false)

            })

        })

    }, [props])

    function handleOnChangeEndereco(name, value)
    {

        data.enderecoCobranca[name] = value
        setData( {...data} )

    }

    function handleOnChangeCredit(name, value)
    {

        data.creditCard[name] = value
        setData( {...data} )

    }

    function handleOnSave(e)
    {

        e.preventDefault()

        const dataPut = {
            enderecoCobranca: {
                cep: data.enderecoCobranca.cep,
                logradouro: data.enderecoCobranca.logradouro,
                numero: data.enderecoCobranca.numero,
                complemento: data.enderecoCobranca.complemento,
                bairro: data.enderecoCobranca.bairro,
                cidade: data.enderecoCobranca.cidade,
                estado: data.enderecoCobranca.estado,
            },
            creditCard: {
                nome: data.creditCard.nome,
                numero: data.creditCard.numero,
                exp: data.creditCard.exp,
                cvv: data.creditCard.cvv,
                cpf: data.creditCard.cpf,
                nascimento: data.creditCard.nascimento,
                telefone: data.creditCard.telefone
            }
        }

        console.log( dataPut )

        api.put('profile/update-payment', dataPut).then( response => {

            console.log( response )

            if ( response.data.error === true ){
                MessageStore.addError( response.data.message )
            } else {
                messageStore.addSuccess('Dados de pagamento alterados com sucesso.')
            }

        })

    }

    return(

        <div id="usuario" className="page">

            <H1Page nome="Configurações"/>

            <div className="nav-config">
                <button onClick={() => history.push('/configuracoes')}>Minhas configurações</button>
                <button className="active" onClick={() => history.push('/configuracoes/dados-pagamento')}>Dados de cobrança</button>
            </div>

            <div className="row">

                <FormDefault onSubmit={handleOnSave}>

                    <InputRow>
                        <InputDefault
                            title="CEP"
                            name="cep"
                            value={data.enderecoCobranca.cep}
                            onChange={handleOnChangeEndereco}
                        />
                        <InputDefault
                            title="Endereço"
                            name="logradouro"
                            value={data.enderecoCobranca.logradouro}
                            onChange={handleOnChangeEndereco}
                        />
                        <InputDefault
                            title="Número"
                            name="numero"
                            value={data.enderecoCobranca.numero}
                            onChange={handleOnChangeEndereco}
                        />
                        <InputDefault
                            title="Complemento"
                            name="complemento"
                            value={data.enderecoCobranca.complemento}
                            onChange={handleOnChangeEndereco}
                        />
                    </InputRow>

                    <InputRow>
                        <InputDefault
                            title="Bairro"
                            name="bairro"
                            value={data.enderecoCobranca.bairro}
                            onChange={handleOnChangeEndereco}
                        />
                        <InputDefault
                            title="Cidade"
                            name="cidade"
                            value={data.enderecoCobranca.cidade}
                            onChange={handleOnChangeEndereco}
                        />
                        <InputDefault
                            title="Estado"
                            name="estado"
                            value={data.enderecoCobranca.estado}
                            onChange={handleOnChangeEndereco}
                        />
                    </InputRow>

                    <InputRow>
                        <InputDefault
                            title="Nome"
                            name="nome"
                            value={data.creditCard.nome}
                            onChange={handleOnChangeCredit}
                        />
                        <InputDefault
                            title="CPF"
                            name="cpf"
                            value={data.creditCard.cpf}
                            onChange={handleOnChangeCredit}
                        />
                        <InputDefault
                            title="Número"
                            name="numero"
                            value={data.creditCard.numero}
                            onChange={handleOnChangeCredit}
                        />
                    </InputRow>

                    <InputRow>
                        <InputDefault
                            title="Vencimento"
                            name="exp"
                            value={data.creditCard.exp}
                            onChange={handleOnChangeCredit}
                        />
                        <InputDefault
                            title="Código de segurança"
                            name="cvv"
                            value={data.creditCard.cvv}
                            onChange={handleOnChangeCredit}
                        />
                    </InputRow>

                    <InputRow>
                        <InputDefault
                            title="Data de nascimento"
                            name="nascimento"
                            value={data.creditCard.nascimento}
                            onChange={handleOnChangeCredit}
                        />
                        <InputDefault
                            title="Telefone"
                            name="telefone"
                            value={data.creditCard.telefone}
                            onChange={handleOnChangeCredit}
                        />
                    </InputRow>

                    <button type="submit">Salvar</button>

                </FormDefault>

            </div>
            
        </div>

    )

}