import api from "./api"; 

// Função assíncrona para registrar uma função
export const postRole = async (roleData) => {
    try {
        const response = await api.post('/', roleData); // Envia uma requisição POST para a API com os dados da função
        console.log("Registrando role: ", response.data); // Exibe a resposta da API (dados da função registrada)
    } catch (err) {
        console.log("Erro ao registrar role", err); // Exibe um erro caso ocorra algum problema no registro da função
    }
}

// Função assíncrona para deletar uma função
export const deleteRole = async (roleId) => {
    try {
        const response = await api.delete((`/role/${roleId}.json`)); // Envia uma requisição DELETE para a API para deletar a função com o ID fornecido
        console.log("Deletando role: ", response.status); // Exibe o status da resposta da API (indica se a deleção foi bem-sucedida)
    } catch(err) {
        console.log("Erro ao deletar role: ", err); // Exibe um erro caso ocorra algum problema na deleção da função
    }
}

// Função assíncrona para atualizar uma função
export const updateRole = async (roleId, updatedData) => {
    try {
        const response = await api.patch(`/role/${roleId}.json`, updatedData); // Envia uma requisição PATCH para a API para atualizar a função com o ID fornecido, usando os dados atualizados fornecidos
        console.log("Atualizando role: ", response.status); // Exibe o status da resposta da API (indica se a atualização foi bem-sucedida)
    } catch(err) {
        console.log("Erro ao atualizar role: ", err); // Exibe um erro caso ocorra algum problema na atualização da função
    }
}

// Função assíncrona para obter todas as funções
export const getAllRole = async () => {
    try {
        const roles = []; // Inicializa uma array vazia para armazenar as funções
        const res = await api.get("/"); // Faz uma requisição GET para a API para obter todas as funções
        for(let roleId in res.data){ // Itera sobre os dados retornados pela API
            roles.push({ // Adiciona um novo objeto à array 'roles' com o ID e os dados da função
                id: roleId,
                ...res.data[roleId]
            })
        }

        return roles; // Retorna todas as funções obtidas da API
    } catch (error) {
        console.log("Error getting all roles: " + error); // Exibe um erro caso ocorra algum problema ao obter as funções da API

        return; // Retorna 'undefined' caso ocorra um erro
    }
}
