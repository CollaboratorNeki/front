export const storeEvent = async (itemEvent) => {
    console.log('chamando a api para cadastrar Event');
    try {
      const response = await api.post('/event_reason/salvar', itemEvent);
      console.log(response);
      alert('Event cadastrado com sucesso');
    } catch (error) {
      console.log('Erro post Event: ', error);
    }
  };

  export const deleteEvent = async (idEventReason) => {
    try {
      const response = await api.delete(`EventReason/deletar_EventReason/${idEventReason}`);
      console.log('Id deletado com sucesso ');
    } catch (error) {
      console.log('Erro em deletar Event: ', error);
    }
  };