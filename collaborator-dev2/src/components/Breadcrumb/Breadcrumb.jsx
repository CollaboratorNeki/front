import React from "react";
import { useLocation, Link } from "react-router-dom"; // Importa hooks do React Router DOM
import { Breadcrumb } from "antd"; // Importa o componente Breadcrumb da biblioteca Ant Design

const BreadCrumb = () => {
  const location = useLocation(); // Obtém a localização atual da página usando o hook useLocation()

  // Função para renderizar o componente Breadcrumb com base no caminho atual
  const breadCrumbView = () => {
    const { pathname } = location; // Extrai o caminho da localização atual
    const pathnames = pathname.split("/").filter((item) => item); // Divide o caminho em partes e remove partes vazias

    // Função para capitalizar a primeira letra de uma string
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
      <div>
        {/* Componente Breadcrumb com separador ">" e estilos específicos */}
        <Breadcrumb separator=">" style={{fontWeight:"bold", marginLeft:"35px"}}>
          {/* Item inicial sempre linkado à Home, se houver caminhos */}
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item/>
          )}

          {/* Mapeia cada parte do caminho para criar os itens do Breadcrumb */}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`; // Constrói o caminho até o índice atual
            const isLast = index === pathnames.length - 1; // Verifica se é o último item do caminho

            return isLast ? (
              <Breadcrumb.Item key={index}>{capitalize(name)}</Breadcrumb.Item> // Último item sem link
            ) : (
              <Breadcrumb.Item key={index}>
                <Link to={routeTo}>{capitalize(name)}</Link> {/* Item linkado para navegação */}
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  };

  return <>{breadCrumbView()}</>; // Renderiza o componente Breadcrumb na função principal
};

export default BreadCrumb; // Exporta o componente BreadCrumb para ser utilizado em outros arquivos
