import api from './api';

export const storeEventReason = async (itemEventReason) => {
  console.log('chamando a api para cadastrar EventReason');
  try {
    const response = await api.post('/event_reason/salvar', itemEventReason);
    alert('EventReason cadastrado com sucesso');
  } catch (error) {
    console.log('Erro post EventReason: ', error);
  }
};

export const getEventReason = async () => {
  try {
    const response = await api.get('/event_reason/listar');
    return response.data;
  } catch (error) {
    console.log('Erro em pegar dados EventReason: ', error);
  }
};

export const deleteEventReason = async (idEventReason) => {
  try {
    await api.delete(`/event_reason/deletar/${idEventReason}`);
    alert('EventReason deletado com sucesso');
  } catch (error) {
    console.log('Erro em deletar EventReason: ', error);
  }
};

export const updateEventReason = async (idEventReason, itemEventReason) => {
  try {
    await api.patch(`/event_reason/atualizar/${idEventReason}`, itemEventReason);
    alert('EventReason alterado com sucesso');
  } catch (error) {
    console.log('Erro em atualizar EventReason: ', error);
    alert('Falha ao atualizar EventReason');
  }
};
