import './accessibility.css'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import logo from "../../assets/logo-neki-int-branco-PNG.png"
import {  useTheme } from '../../themes/Dark';
import TranslateIcon from '@mui/icons-material/Translate';
import i18n from '../../i18n';

//Função para aumentar e diminuir a fonte, no selectors passar os elementos que quer aumentar e diminuir da pagina
function handleFontSize(updateValue) {
    const selectors = "h1, span";
    let elements = document.querySelectorAll(selectors);
    elements.forEach((element) => {
      let currentFontSize = window.getComputedStyle(element).fontSize;
      let newFontSize = parseInt(currentFontSize) + updateValue;
      element.style.fontSize = `${newFontSize}px`;

    })
  }


function Accessibility() {
    
 //função para alternar o idioma entre inglês e português
  const toggleLanguage = () => {
    const newLanguage = i18n.language.startsWith('pt') ? 'en' : 'pt';
    i18n.changeLanguage(newLanguage);
  };



  const ToggleButton = () => {
    const { toggleTheme } = useTheme();
    return (
      
        <button onClick={toggleTheme}>
        <Brightness4Icon className='themaIcon' />
        </button>
      
    );
  };
  


  return(
     <div className='divAccessibility'>
        {/* os botoes de acessibilidade e incrementa a função de aumento e diminuição de fonte */}
   <button className='translateIcon' onClick={toggleLanguage}><TranslateIcon  className='translateIcon'/></button>
   <ToggleButton />
    <button  id= "decrease" className='decreaseFontSize' aria-label='Diminuir o tamanho da fonte,-A' onClick={() => handleFontSize(-1)}></button>
    <button  id= "increase" className='increaseFontSize' aria-label='Aumentar o tamnho da fonte' onClick={() => handleFontSize(1)}></button>
      <img className="logo" src={logo} alt='Logo da Neki' ></img>
    </div>
    )
}


export default Accessibility;