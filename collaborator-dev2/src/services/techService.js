import api from './api';

export const storeTechnology = async (itemTechnology) => {
  console.log('chamando a api para cadastrar Tecnologia');
  try {
    const response = await api.post('/technology/cadastrar_technology', itemTechnology);
    alert('Tecnologia cadastrada com sucesso');
  } catch (error) {
    console.log('Erro ao cadastrar Tecnologia: ', error);
  }
};

export const getTechnology = async () => {
  try {
    const response = await api.get('/technology/listar_technology');
    return response.data;
  } catch (error) {
    console.log('Erro ao pegar dados da Tecnologia: ', error);
  }
};

export const deleteTechnology = async (idTechnology) => {
  try {
    await api.delete(`/technology/deletar_technology/${idTechnology}`);
    alert('Tecnologia deletada com sucesso');
  } catch (error) {
    console.log('Erro ao deletar Tecnologia: ', error);
  }
};

export const updateTechnology = async (idTechnology, itemTechnology) => {
  try {
    await api.patch(`/technology/alterar_technology/${idTechnology}`, itemTechnology);
    alert('Tecnologia alterada com sucesso');
  } catch (error) {
    console.log('Erro ao atualizar Tecnologia: ', error);
    alert('Falha ao atualizar Tecnologia');
  }
};
