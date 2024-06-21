import api from './api';

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


  export const getEvent = async () => {
    try {
      const arrayGetAlms = [];
      const response = await api.get('/event_reason/listar')
      // console.log(response.data);
  
      // o key pega a chave/index do array
      for (let key in response.data) {
        const teste = {
          ...response.data[key],
          id: key,
        };
  
        arrayGetAlms.push(teste);
      }
      console.log(arrayGetAlms);
      // console.log(arrayGetAlms.map((alm) => alm.nome));
      return arrayGetAlms;
    } catch (error) {
      console.log('Erro em pegar dados Event: ', error);
    }
  };


export const deleteEvent = async (idEventReason) => {
  try {
    const response = await api.delete(`/event_reason/deletar/${idEventReason}`);
    console.log('Id deletado com sucesso ');
  } catch (error) {
    console.log('Erro em deletar Event: ', error);
  }
};
