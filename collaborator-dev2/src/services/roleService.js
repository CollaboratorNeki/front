import api from './api';

export const storeRole = async (itemRole) => {
  console.log('chamando a api para cadastrar funcao');
  try {
    const response = await api.post('/role/cadastro_role', itemRole);
    console.log(response);
    alert('Funcao cadastrada com sucesso');
  } catch (error) {
    console.log('Erro post Funcao: ', error);
  }
};

export const getRole = async () => {
  try {
    const arrayGetRole = [];
    const response = await api.get('role/listar_role');
    // console.log(response.data);

    for (let key in response.data) {
      const teste = {
        ...response.data[key],
        id: key,
      };
      arrayGetRole.push(teste);
    }
    // console.log(arrayGetRole);
    return arrayGetRole;
  } catch (error) {
    console.log('Erro em pegar dados Funcao: ', error);
  }
}

  export const deleteRole = async (idRole) => {
  console.log('chamando a api para deletar função');
  try {
    const response = await api.delete(`/role/deletar/${idRole}`);
    console.log(response);
    alert('Função deletada com sucesso');
  } catch (error) {
    console.log('Erro ao deletar função: ', error);
  }
}

export const updateRole = async (idRole, updatedRole) => {
    console.log('chamando a api para atualizar função');
    try {
      const response = await api.put(`/role/atualizar/${idRole}`, updatedRole);
      console.log(response);
      alert('Função atualizada com sucesso');
    } catch (error) {
      console.log('Erro ao atualizar função: ', error);
    }
  };

