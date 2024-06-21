import './accessibility.css'
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import {  useTheme } from '../../themes/Dark';
import i18n from '../i18n';
import { SiGoogletranslate } from "react-icons/si";



//variaveis que definem o valor max e min da fonte 
const MinFontSize = 10
const MaxFontSize = 22

//Função para aumentar e diminuir a fonte, no selectors passar os elementos que quer aumentar e diminuir da pagina
function handleFontSize(updateValue) {
  const selectors = "h1, h2, h3, h4, h5, h6, a, p, t, span";
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


// função pro botão alternar o tema
  // const ToggleButton = () => {
  //   const { toggleTheme } = useTheme();
  //   return (
      
  //       <button onClick={toggleTheme}>
  //       <Brightness4Icon className='themaIcon' style={{fontSize:"30px", paddingBottom:"5px"}} />
  //       </button>
      
  //   );

  // };
  
  
  return(
     <div className='divAccessibility'>
        {/* os botoes de acessibilidade e incrementa a função de aumento e diminuição de fonte */}
   <button className='translateIcon' aria-label='Mudar de idioma' accessKey='1' tabIndex={0} onClick={toggleLanguage}><SiGoogletranslate  className='translateIcon' style={{fontSize:"27px",}}/> </button>
   {/* <ToggleButton /> */}
    <button  id= "decrease" className='decreaseFontSize' aria-label='Diminuir o tamanho da fonte,-A' accessKey='1' tabIndex={0} onClick={() => handleFontSize(-1)}></button>
    <button  id= "increase" className='increaseFontSize' aria-label='Aumentar o tamnho da fonte, +A' accessKey='1' tabIndex={0} onClick={() => handleFontSize(1)}></button>
    </div>
    )
}


export default Accessibility;

//area label 
//tab index
//puxar icone de tradução
//ajustar o tamanho da fonte OK
//definir o aumento das fontes, seletores, h1, h2.... OK

