// import axios from "axios";

// const BASE_URL = "http://localhost:"; // servidor passado pela Deby

// // Função assíncrona para criar um usuário usando Axios
// async function createUserAtPostgres(user) {
//   try {
//     const res = axios.post(`${BASE_URL}/users, user`);

//     console.log("usuario criado no banco: ", res.data);
//   } catch (error) {
//     console.error("Erro ao criar novo usuario: ", error);
//   }
// }

// // Função assíncrona para obter todos os usuários usando Axios
// async function getAllUsersFromPostgres() {
//   try {
//     const res = await axios.get(`${BASE_URL}/users`);
//     const users = res.data;

//     console.log("usuarios vindos do banco: ", users);
//     return users;
//   } catch (error) {
//     console.error("Erro ao puxar usuarios: ", error);
//     return [];
//   }
// }

// // Função assíncrona para obter um usuário por e-mail usando Axios
// async function getUserByEmailFromPostgres(email) {
//   try {
//     const res = await axios.get(`${BASE_URL}/users?email=${email}`);
//     const user = res.data[0];

//     console.log("usuario encontrado: ", user);
//     return user;
//   } catch (error) {
//     console.error("Erro ao achar usuario por email: ", error);
//     return null;
//   }
// }

// // Função assíncrona para obter um usuário por ID usando Axios
// async function getUserByIdFromPostgres(id) {
//   try {
//     const res = await axios.get(`${BASE_URL}/users/${id}`);
//     const user = res.data;

//     console.log("usuario achado por meio de id: ", user);
//     return user;
//   } catch (error) {
//     console.error("Erro ao localizar id: ", error);
//     return null;
//   }
// }

// // Função assíncrona para atualizar um usuário usando Axios
// async function updateUserAtPostgres(user) {
//   try {
//     const res = await axios.patch(`${BASE_URL}/users/${user.id}, user`);

//     console.log("dados atualizados: ", res.data);
//   } catch (error) {
//     console.error("Erro ao atualizar dados: ", error);
//   }
// }

// export {
//   createUserAtPostgres,
//   getAllUsersFromPostgres,
//   getUserByEmailFromPostgres,
//   getUserByIdFromPostgres,
//   updateUserAtPostgres,
// };