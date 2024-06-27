import React from "react";
import logo from "../../assets/img/logo.png"; // Importa o logo da pasta de assets

import "./Logo.css"; // Importa o estilo CSS específico para o componente Logo

const Logo = () => {
    return (
        <div className="logo"> {/* Define o container principal com a classe CSS 'logo' */}
            <div className="logo-icon"> {/* Define o container do ícone do logo com a classe CSS 'logo-icon' */}
                <img className="neki" src={logo} alt="neki" /> {/* Renderiza a imagem do logo usando o caminho importado */}
            </div>
        </div>
    );
};

export default Logo; // Exporta o componente Logo para ser utilizado em outras partes da aplicação
