import React from 'react'
import Layout from './Layout'

export default function Step1(props) {

    return(
        <Layout active={1}>
            <h3>Passo 01</h3>
            <p>Para iniciar crie uma nova campanha ou escolha uma já existente.</p>
        </Layout>
    )

}