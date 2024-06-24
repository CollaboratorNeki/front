import './accessibility.css'
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import {  useTheme } from '../../themes/Dark';
import i18n from '../i18n';
import { SiGoogletranslate } from "react-icons/si";
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import Menos from '../../assets/img/aMenus.png';
import Mais from '../../assets/img/aPlus.png';



//variaveis que definem o valor max e min da fonte 
const MinFontSize = 10
const MaxFontSize = 22

//Função para aumentar e diminuir a fonte, no selectors passar os elementos que quer aumentar e diminuir da pagina
function handleFontSize(updateValue) {
  const selectors = "h1, h2, h3, h4, h5, h6, a, p, label, input, button, span";
  let elements = document.querySelectorAll(selectors);
  elements.forEach((element) => {
      let currentFontSize = parseInt(window.getComputedStyle(element).fontSize);
      let newFontSize = currentFontSize + updateValue;
      if (newFontSize >= MinFontSize && newFontSize <= MaxFontSize) {
          element.style.fontSize = `${newFontSize}px`;
      }
  });
}



function Accessibility() {
    
 //função para alternar o idioma entre inglês e português
  const toggleLanguage = () => {
    const newLanguage = i18n.language.startsWith('pt') ? 'en' : 'pt';
    i18n.changeLanguage(newLanguage);
  };

 //FUNÇÃO PARA ADICIONAR OUTLINE
 const [outlineIsActive, setOutlineIsActive] = useState(false);
 function handleOutlineIsActive(event) {
  if (
    (event.nativeEvent instanceof KeyboardEvent && event.key === "Enter") ||
    event.nativeEvent instanceof PointerEvent
  ) {
    setOutlineIsActive(!outlineIsActive);
  }
}

useEffect(() => {
  const outlineStyle = "*:focus{outline: 5px solid var(--azul-primario)};";
  if (outlineIsActive) {
    let element = document.createElement("style");
    element.innerHTML = outlineStyle;
    document.head.insertAdjacentElement("beforeend", element);
    return;
  }

  let elements = document.querySelectorAll("style");
  elements.forEach((element) => {
    if (element.innerHTML === outlineStyle) {
      element.Remove();
    }
  });
}, [outlineIsActive]);
  
  
  return(
     <div className='divAccessibility'>
        <form
            id="sw-20"
            type="switch"
            label="Moldurar elementos"
            checked={outlineIsActive}
            aria-checked={outlineIsActive}
            aria-label="Ativar moldura destacada aos elementos em foco."
            onChange={(e) => handleOutlineIsActive(e)}
            onKeyDown={(e) => handleOutlineIsActive(e)}
          />
        {/* os botoes de acessibilidade e incrementa a função de aumento e diminuição de fonte */}
   <Button className='translateIcon' aria-label='Mudar de idioma' accessKey='1' tabIndex={0} onClick={toggleLanguage}style={{background:"Transparent", color:"black"}}><SiGoogletranslate  className='translateIcon' style={{fontSize:"25px",}}/> </Button>
   {/* <ToggleButton /> */}
    <Button  id= "decrease" className='decreaseFontSize' aria-label='Diminuir o tamanho da fonte,-A' accessKey='1' tabIndex={0} onClick={() => handleFontSize(-1)} style={{background:"Transparent"}}><img className='Menos' src={Menos}/></Button>
    <Button  id= "increase" className='increaseFontSize' aria-label='Aumentar o tamnho da fonte, +A' accessKey='1' tabIndex={0} onClick={() => handleFontSize(1)}style={{background:"Transparent"}}><img className='Mais' src={Mais}/></Button>
    </div>
    )
}


export default Accessibility;

//area label 
//tab index
//puxar icone de tradução
//ajustar o tamanho da fonte OK
//definir o aumento das fontes, seletores, h1, h2.... OK

