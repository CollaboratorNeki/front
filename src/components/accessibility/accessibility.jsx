import './accessibility.css'
import Brightness4Icon from '@mui/icons-material/Brightness4';

//Função para aumentar e diminuir a fonte, no selectors passar os elementos que quer aumentar e diminuir da pagina
function handleFontSize(updateValue) {
    const selectors = "h1";
    let elements = document.querySelectorAll(selectors);
    elements.forEach((element) => {
      let currentFontSize = window.getComputedStyle(element).fontSize;
      let newFontSize = parseInt(currentFontSize) + updateValue;
      element.style.fontSize = `${newFontSize}px`;
    })
  }

function Accessibility()  {
    return(
     <div>
        {/* os botoes de acessibilidade e incrementa a função de aumento e diminuição de fonte */}
    <button  className='changeThema'> <Brightness4Icon /> </button>
    <button  id= "decrease" className='decreaseFontSize' aria-label='Diminuir o tamanho da fonte,-A' onClick={() => handleFontSize(-5)}> -A</button>
    <button  id= "increase" className='increaseFontSize' aria-label='Aumentar o tamnho da fonte' onClick={() => handleFontSize(5)}> +A</button>
       <h1>texto teste</h1>
    </div>
    )
}


export default Accessibility;