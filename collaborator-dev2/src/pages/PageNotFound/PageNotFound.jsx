import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom'; // Importa o Link do React Router
// import { ContainerPageNotFound } from '../../styles/PageNotFound.styles';

const PageNotFound = () => (
  // <ContainerPageNotFound>
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, essa página não existe."
      extra={ // Substitui o Button diretamente pelo Link
        <Link to="/">
          <Button type="primary">Voltar para Página Inicial</Button>
        </Link>
      }
    />
  // </ContainerPageNotFound>
);

export default PageNotFound;
