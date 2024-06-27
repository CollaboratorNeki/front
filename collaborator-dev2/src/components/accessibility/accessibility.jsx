import './accessibility.css'; // Importa o arquivo CSS específico para estilos de acessibilidade
import i18n from '../i18n'; // Importa o objeto de internacionalização (i18n) personalizado
import { SiGoogletranslate } from "react-icons/si"; // Importa o ícone do Google Translate da biblioteca react-icons
import { useEffect, useState } from 'react'; // Importa hooks do React: useEffect e useState
import { Button } from 'antd'; // Importa o componente Button da biblioteca Ant Design
import Menos from '../../assets/img/aMenus.png'; // Importa a imagem do ícone de diminuir fonte
import Mais from '../../assets/img/aPlus.png'; // Importa a imagem do ícone de aumentar fonte

// Variáveis que definem o valor máximo e mínimo da fonte
const MinFontSize = 10;
const MaxFontSize = 22;

// Função para aumentar e diminuir a fonte de elementos na página
function handleFontSize(updateValue) {
  const selectors = "h1, h2, h3, h4, h5, h6, a, p, label, input, button, span"; // Seletores dos elementos que terão a fonte alterada
  let elements = document.querySelectorAll(selectors); // Seleciona todos os elementos usando os seletores especificados
  elements.forEach((element) => {
      let currentFontSize = parseInt(window.getComputedStyle(element).fontSize); // Obtém o tamanho atual da fonte do elemento
      let newFontSize = currentFontSize + updateValue; // Calcula o novo tamanho da fonte com base no valor de atualização
      if (newFontSize >= MinFontSize && newFontSize <= MaxFontSize) { // Verifica se o novo tamanho da fonte está dentro dos limites mínimo e máximo
          element.style.fontSize = `${newFontSize}px`; // Aplica o novo tamanho da fonte ao elemento
      }
  });
}

function Accessibility() {
  // Estado para controlar se a moldura está ativada ou desativada
  const [outlineIsActive, setOutlineIsActive] = useState(false);

  // Função para alternar o idioma entre inglês e português usando i18n
  const toggleLanguage = () => {
    const newLanguage = i18n.language.startsWith('pt') ? 'en' : 'pt'; // Verifica o idioma atual e troca para o idioma oposto
    i18n.changeLanguage(newLanguage); // Aplica a mudança de idioma
  };

  // Função para ativar ou desativar a moldura ao focar nos elementos
  function handleOutlineIsActive(event) {
    if (
      (event.nativeEvent instanceof KeyboardEvent && event.key === "Enter") ||
      event.nativeEvent instanceof PointerEvent
    ) {
      setOutlineIsActive(!outlineIsActive); // Alterna o estado da moldura ao pressionar Enter ou ao clicar com o mouse
    }
  }

  // Efeito para adicionar ou remover o estilo de moldura dinamicamente com base no estado de outlineIsActive
  useEffect(() => {
    const outlineStyle = "*:focus{outline: 5px solid var(--azul-primario)};"; // Estilo CSS para a moldura destacada
    if (outlineIsActive) {
      let element = document.createElement("style"); // Cria um elemento <style> dinamicamente
      element.innerHTML = outlineStyle; // Define o estilo CSS para o elemento
      document.head.insertAdjacentElement("beforeend", element); // Insere o elemento <style> no final do <head> do documento
      return () => {
        element.remove(); // Remove o elemento <style> ao desmontar o componente
      };
    }
  }, [outlineIsActive]); // Executa o efeito sempre que outlineIsActive mudar

  return (
    <div className='divAccessibility'> {/* Div que engloba os elementos de acessibilidade */}
      <form
        id="sw-20"
        type="switch"
        label="Moldurar elementos"
        checked={outlineIsActive} // Estado que determina se a moldura está ativa ou não
        aria-checked={outlineIsActive}
        aria-label="Ativar moldura destacada aos elementos em foco."
        onChange={(e) => handleOutlineIsActive(e)}
        onKeyDown={(e) => handleOutlineIsActive(e)}
      />

      {/* Botão para alternar entre idiomas */}
      <Button className='translateIcon' aria-label='Mudar de idioma' accessKey='1' tabIndex={0} onClick={toggleLanguage} style={{background:"Transparent", color:"black"}}>
        <SiGoogletranslate className='translateIcon' style={{fontSize:"25px"}}/>
      </Button>

      {/* Botão para diminuir o tamanho da fonte */}
      <Button id= "decrease" className='decreaseFontSize' aria-label='Diminuir o tamanho da fonte, -A' accessKey='1' tabIndex={0} onClick={() => handleFontSize(-1)} style={{background:"Transparent"}}>
        <img className='Menos' src={Menos}/>
      </Button>

      {/* Botão para aumentar o tamanho da fonte */}
      <Button id= "increase" className='increaseFontSize' aria-label='Aumentar o tamanho da fonte, +A' accessKey='1' tabIndex={0} onClick={() => handleFontSize(1)} style={{background:"Transparent"}}>
        <img className='Mais' src={Mais}/>
      </Button>
    </div>
  );
}

export default Accessibility; // Exporta o componente Accessibility para ser utilizado em outros arquivos
