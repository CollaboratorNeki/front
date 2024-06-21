import api from './api';

export const storeMessage = async (itemMessage) => {
  console.log('chamando a api para cadastrar Mensagem');
  try {
    const response = await api.post('/messages/cadastro_message/', itemMessage); //COLOCAR A URL CORRETA DA API
    // console.log(response);
    alert('Mensagem cadastrada com sucesso');
  } catch (error) {
    console.log('Erro post Message: ', error);
  }
};

export const getMessage = async () => {
  try {
    const arrayGetMessage = [];
    const response = await api.get('messages/list_message/');//COLOCAR A URL CORRETA DA API
    // console.log(response.data);

    // o key pega a chave/index do array
    for (let key in response.data) {
      const teste = {
        ...response.data[key],
        id: key,
      };

      arrayGetAlms.push(teste);
    }
    console.log(arrayGetMessage);
    // console.log(arrayGetAlms.map((alm) => alm.nome));
    return arrayGetMessage;
  } catch (error) {
    console.log('Erro em pegar dados da Mensagem: ', error);
  }
};

export const deleteMessage = async (idMessage) => {
  try {
    const response = await api.delete(`messages/deletar/${idMessage}`);//COLOCAR A URL CORRETA DA API
    console.log('Id deletado com sucesso ');
  } catch (error) {
    console.log('Erro em deletar Message: ', error);
  }
};

export const updateMessage = async (idMessage, itemMessage) => {
  try {
    const response = await api.patch(`messages/atualizar/${idMessage}`, itemMessage);//COLOCAR A URL CORRETA DA API
    alert('Mensagem alterada com sucesso');
  } catch (error) {
    console.log('Erro em atualizar Message: ', error);
    alert('Falha ao atualizar Mensagem');
  }
};