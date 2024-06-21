import api from './api';

export const storeRole = async (itemRole) => {
  try {
    const response = await api.post('/role/cadastro_role', itemRole);
    alert('Role cadastrada com sucesso');
  } catch (error) {
    console.log('Erro post role: ', error);
  }
};

export const getRole = async () => {
  try {
    const response = await api.get('/role/listar_role'); // Corrigido para incluir a barra inicial
    return response.data;
  } catch (error) {
    console.log('Erro em pegar dados Role: ', error);
  }
};

export const deleteRole = async (idRole) => {
  try {
    await api.delete(`/role/deletar/${idRole}`);
    alert('Role deletada com sucesso');
  } catch (error) {
    console.log('Erro em deletar role: ', error);
  }
};

export const updateRole = async (idRole, itemRole) => {
  try {
    await api.patch(`/role/atualizar/${idRole}`, itemRole);
    alert('Role alterada com sucesso');
  } catch (error) {
    console.log('Erro em atualizar role: ', error);
    alert('Falha ao atualizar o role');
  }
};
