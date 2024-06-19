import api from "./api"; 

// Função assíncrona para registrar um motivo de evento
export const postEventReason = async (eventReasonData) => {
    try {
        const response = await api.post('/', eventReasonData); // Envia uma requisição POST para a API com os dados do motivo do evento
        console.log("Registrando o event: ", response.data); // Exibe a resposta da API (dados do evento registrados)
    } catch (err) {
        console.log("Erro ao registrar event", err); // Exibe um erro caso ocorra algum problema no registro do evento
    }
}

// Função assíncrona para deletar um motivo de evento
export const deleteEventReason = async (eventReasonId) => {
    try {
        const response = await api.delete((`/eventReason/${eventReasonId}.json`)); // Envia uma requisição DELETE para a API para deletar o motivo do evento com o ID fornecido
        console.log("Deletando o event: ", response.status); // Exibe o status da resposta da API (indica se a deleção foi bem-sucedida)
    } catch(err) {
        console.log("Erro ao deletar event: ", err); // Exibe um erro caso ocorra algum problema na deleção do evento
    }
}

// Função assíncrona para atualizar um motivo de evento
export const updateEventReason = async (eventReasonId, updatedData) => {
    try {
        const response = await api.patch(`/eventReason/${eventReasonId}.json`, updatedData); // Envia uma requisição PATCH para a API para atualizar o motivo do evento com o ID fornecido, usando os dados atualizados fornecidos
        console.log("Atualizando o event: ", response.status); // Exibe o status da resposta da API (indica se a atualização foi bem-sucedida)
    } catch(err) {
        console.log("Erro ao atualizar event: ", err); // Exibe um erro caso ocorra algum problema na atualização do evento
    }
}















// Função assíncrona para obter todos os motivos de eventos
export const getAllEventReason = async () => {
    console.log("eeee");
    try {
        const eventReasons = []; // Inicializa uma array vazia para armazenar os motivos de eventos
        const res = await api.get("/event_reason/listar"); // Faz uma requisição GET para a API para obter todos os motivos de eventos
        console.log(res);
        for(let eventReasonId in res.data){ // Itera sobre os dados retornados pela API
            eventReasons.push({ // Adiciona um novo objeto à array 'eventReasons' com o ID e os dados do motivo de evento
                id: eventReasonId,
                ...res.data[eventReasonId]
            })
        }

        return eventReasons; // Retorna todos os motivos de eventos obtidos da API
    } catch (error) {
        console.log("Error getting all eventReasons: " + error); // Exibe um erro caso ocorra algum problema ao obter os motivos de eventos da API

        return; // Retorna 'undefined' caso ocorra um erro
    }
}
