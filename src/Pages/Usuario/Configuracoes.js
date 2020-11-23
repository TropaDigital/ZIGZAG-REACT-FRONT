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

export default function Configuracoes(props) {

    const [load, setLoad] = useState(true)
    const [data, setData] = useState({})
    const history = useHistory()

    useEffect(() => {

        api.get('profile').then( response => {

            console.log( response.data )

            setData({...response.data})
            setLoad(false)

        })

    }, [props])

    function handleOnChange(name, value)
    {

        data[name] = value
        setData( {...data} )

        console.log( data )

    }

    function handleOnSave(e)
    {

        e.preventDefault()

        const dataPut = {
            accountId: data.accountId,
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            nascimento: data.nascimento,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
        }

        api.put('profile/update', dataPut).then( response => {

            if ( response.data.error === true ){
                MessageStore.addError( response.data.message )
            } else {
                document.getElementById('name-user').innerHTML = data.nome
                messageStore.addSuccess('Dados alterados com sucesso.')
            }

        })

    }

    async function handleUpload(e)
    {

        if ( e.target.files.length ){

            var formData = new FormData()
                formData.append("file", e.target.files[0], e.target.files[0].name)

            let response = await api.put('profile/upload', formData)

            if ( response.data.link ){

                data.foto = response.data.link
                setData({...data})
                document.getElementById('img-profile').style.backgroundImage = 'url('+response.data.link+')'
                messageStore.addSuccess('Foto alterada com sucesso.')

            } else {

                messageStore.addError('Não foi possivel alterar a foto.')

            }

        }
        
    }

    return(

        <div id="usuario" className="page">

            <H1Page nome="Configurações"/>

            <div className="nav-config">
                <button className="active" onClick={() => history.push('/configuracoes')}>Minhas configurações</button>
                <button onClick={() => history.push('/configuracoes/dados-pagamento')}>Dados de cobrança</button>
            </div>

            <div className="row">

                <FormDefault onSubmit={handleOnSave}>

                    <InputRow>
                        <InputDefault
                            title="E-mail"
                            name="email"
                            value={data.email}
                            onChange={handleOnChange}
                        />
                        <InputDefault
                            title="Nome"
                            name="nome"
                            value={data.nome}
                            onChange={handleOnChange}
                        />
                    </InputRow>

                    <InputRow>
                        <InputDefault
                            title="Data de nascimento"
                            name="nascimento"
                            value={data.nascimento}
                            onChange={handleOnChange}
                        />
                        <InputDefault
                            title="CPF"
                            name="cpf"
                            value={data.cpf}
                            onChange={handleOnChange}
                        />
                    </InputRow>

                    <InputRow>
                        <InputDefault
                            title="Senha"
                            name="password"
                            onChange={handleOnChange}
                            type="password"
                        />
                        <InputDefault
                            title="Confirme a senha"
                            name="passwordConfirm"
                            onChange={handleOnChange}
                            type="password"
                        />
                    </InputRow>

                    <button type="submit">Salvar</button>

                </FormDefault>
                
                <div className="change-photo">

                    <div className="change">
                
                        <span>Imagem de perfil</span>
                        <div style={{backgroundImage: 'url('+data.foto+')'}}></div>
                        
                        <label>
                            <span className="upload">
                                Enviar imagem <i></i>
                            </span>
                            <input id="upload-button" onChange={handleUpload} type="file" name="file"/>
                        </label>

                    </div>

                </div>

            </div>
            
        </div>

    )

}