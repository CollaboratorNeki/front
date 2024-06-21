import api from './api';

export const storeMessage = async (itemMessage) => {
  console.log('chamando a api para cadastrar Mensagem');
  try {
    const response = await api.post('/messages/cadastro_message', itemMessage);
    alert('Mensagem cadastrada com sucesso');
  } catch (error) {
    console.log('Erro post Message: ', error);
  }
};

export const getMessage = async () => {
  try {
    const response = await api.get('/messages/list_message');
    return response.data;
  } catch (error) {
    console.log('Erro em pegar dados da Mensagem: ', error);
  }
};

export const deleteMessage = async (idMessage) => {
  try {
    await api.delete(`/messages/deletar/${idMessage}`);
    alert('Mensagem deletada com sucesso');
  } catch (error) {
    console.log('Erro em deletar Message: ', error);
  }
};

export const updateMessage = async (idMessage, itemMessage) => {
  try {
    await api.patch(`/messages/atualizar/${idMessage}`, itemMessage);
    alert('Mensagem alterada com sucesso');
  } catch (error) {
    console.log('Erro em atualizar Message: ', error);
    alert('Falha ao atualizar Mensagem');
  }
};
