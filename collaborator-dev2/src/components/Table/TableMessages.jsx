import React, { useState, useEffect } from 'react';
import { storeMessage, getMessage, updateMessage, deleteMessage } from '../../services/messageService';
import {
  Space,
  Table,
  Grid,
  Input,
  Button,
  Modal,
  Form,
  InputNumber,
  Popconfirm,
  Switch,
} from 'antd';
import './Table.css';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever, MdTripOrigin } from 'react-icons/md';

const { useBreakpoint } = Grid;
const { Search } = Input;

//const initialData = [];

const defaultTitle = () => 'Mensagens';
const defaultFooter = () => 'Here is footer';

//Componente de tabela

const TableMessages = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs; // Consider xs as small screen
  const [searchText, setSearchText] = useState('');
   //usando esse use state para guardar os dados da listagem da tabela
  const [filteredData, setFilteredData] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  //useState que pega os valores atualizados do formulário e guarda em uma variável
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [cadastro, setCadastro] = useState({
    conteudo: '',
    dataInicio:'',
    dataFim:'',
    tipo:''
  });
  // const [status, setStatus] = useState(false);

   // Chamando os dados do banco e guardando em um useState para poder usar na lista, é preciso usar useEffect para não criar o erro do loop infinito na renderização
   useEffect(()=>{
    const response = async () => {
    const dadosMessage = await getMessage();
    const setDadosMessage = dadosMessage?.map((item) => ({
      idMessage: item.idMessage,
      conteudo: item.conteudo,
      dataInicio: item.dataInicio,
      dataFim: item.dataFim,
    }));
    setFilteredData(setDadosMessage);
  };
  response();
   }, []);

  // essa função é para utilizar a barra de pesquisa
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = initialData.filter((item) =>
      item.idMessage.toLowerCase().includes(value.toLowerCase()) ||
      item.conteudo.toString().includes(value) ||
      item.address.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  // FIM ############# lógica filtrar Message

  // essa função é para abrir e fechar o modal de cadastro de Message
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };
  // FIM ############# lógica abrir e fechar modal de cadastro de Message

   // essa função é para clicar no botão de OK dentro do modal de cadastrar
  const handleAdd = () => {
    if (
      cadastro.conteudo !== ''&& //COLOCAR OS & AO DESCOMENTAR AS DATAS
      cadastro.dataInicio !== '' &&
      cadastro.dataFim !== ''&&
      cadastro.tipo !== ''
    ) {
      return storeMessage(cadastro);
    }
    return alert ('Preencha todos os campos!')
    // setCadastro({ id: '',conteudo: '', dataInicio: '', dataFim: ''});

    // form
    //   .validateFields()
    //   .then(values => {
    //     form.resetFields();
    //     setIsAddModalVisible(false);
    //     const newItem = {
    //       key: filteredData.length + 1,
    //       ...values,
    //     };
    //     setFilteredData([...filteredData, newItem]);
    //   })
    //   .catch(info => {
    //     console.log('Validate Failed:', info);
    //   });
  };

    // essa função é para abrir o modal de edição da coluna ação e é passado no parametro (item) os dados do input do formulário de edição

  const showEditModal = (item) => {
    console.log('Dados que estão renderizados na linha da tabela showEditModal', item);
    setEditingItem(item);

    // o parametro (item) aqui é passado para jogar os dados do input do formulário de edição na função handleEdit, no handleEdit o parametro values são os dados do formulário
    form.setFieldsValue(item);
    setIsEditModalVisible(true);
  };

    // essa função é para fechar o modal de edição de um item
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingItem(null);
  };
   //  essa função é para editar utilizando a coluna ação

  const handleEdit = () => {
    form
      .validateFields()
      .then (async(values) => {
        console.log('Dados do formulário parametro values', values);
        console.log('dados editingItem', editingItem);
        console.log('dados filteredData', filteredData);
        const idEditingItem = editingItem.idAlmTool;
        console.log(idEditingItem, 'id item separado');
        //parametro values são os dados do formulário, e o método validateFields é responsável por validar os dados
        form.resetFields();
        setIsEditModalVisible(false);

        const updatedData = filteredData.map((item) => 
          item.id === editingItem.id ? { ...item, ...values } : item,
        );
        const filtro = updatedData.filter((item) => item.id === idEditingItem);
        // console.log(filtro, 'filtro');
        // console.log(filtro[0]);

        console.log(updatedData, 'Dados da variavel updatedData');
        setFilteredData(updatedData);
        const response = await updateMessage(idEditingItem, filtro[0]);
        setEditingItem(null);
        console.log(filteredData, 'Dados do filteredData');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

   // essa função é para deletar um item da tabela usando o botão de deletar da coluna ação
  const handleDelete = async (record) => {
    console.log(record.id);
    try {
      const response = await deleteMessage(record.id)
    }catch (error){
      console.log(error);
    }
  };
  // esse array é para definir as colunas da tabela
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      width: 150,
      key:'id'
    },
    {
      title: 'Conteudo',
      dataIndex: 'Conteudo',
      key:'conteudoMessage',
      sorter: (a, b) => a.age - b.age,
      width: 80,
    },
    {
      title: 'Data Início',
      dataIndex: 'data início',
      key: 'dataInicioMessage',
      width: 200,
    },

    {
      title: 'Data Fim',
      dataIndex: 'data Fim',
      key: 'dataFimMessage',
      width: 200,
    },

    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipoMessage',
      width: 200,
    },

    // pop up para deletar o item pelo botão editar
    {
      title: 'Ação',
      key: 'ação',
      width: 150,
       // o parametro record é a linha da tabela e os dados correspondentes
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}><FaEdit/></Button>
          <Popconfirm title="Tem certeza que deseja excluir?" onConfirm={() => handleDelete(record.key)}>
            <Button><MdDeleteForever/></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // lógica do switch de status
  // const onChangeSwitch = (checked) => {
  //   setCadastro({ ...cadastro, status: checked });
  //   checked ? setStatus(false) : setStatus(true);
  // };
  // Variável que define estilo da tabela principal
  const tableProps = {
    bordered: true,
    size: 'small',
    title: defaultTitle,
    showHeader: true,
    footer: defaultFooter,
    rowSelection: {},
    scroll: isSmallScreen ? { x: 'max-content', y: 620 } : { y: 620 },
    pagination: isSmallScreen ? { pageSize: 5 } : false,
  };

  return (
    <>
     {/* Container botao e barra de pesquisa */}
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Buscar Mensagem..."
          enterButton
          onSearch={handleSearch}
           backgroud="linear-gradient(to bottom, #2d939c, #68C7CF)"
        />
        <Button type="primary" onClick={showAddModal}
         style={{ background: 'linear-gradient(to bottom, #2d939c, #68C7CF)', border: 'none' }}>
          Cadastrar
        </Button>
      </Space>
        {/* FIM ############# Container botao e barra de pesquisa */}

         {/* Definição da tabela principal */}
      <Table
        {...tableProps}
        pagination={{
          position: ['bottomRight'],
        }}
        columns={columns}
        dataSource={filteredData}
      />
       {/* FIM ############# Tabela principal */}

      {/* Esse modal é para cadastrar um novo item na tabela, apertando o botão de cadastro */}
      <Modal
        title="Cadastrar Nova Mensagem"
        visible={isAddModalVisible}
        // função para fechar o modal de cadastro
        onCancel={handleAddCancel}
        // função para que faz o botão OK do modal de cadastro ser executado
        onOk={handleAdd}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal">
          {/* <Form.Item
            name="idMessage"
            label="Message"
            rules={[{ required: false, message: 'Por favor, coloque a mensagem !' }]}
          >
            {/*dentro de setCadastro é criado um novo objeto {}, e dentro dele é criado uma cópia do objeto cadastro(está no useState) por meio do rest operator e em seguida é adicionado a propriedade a ser alterada ou criada  */}
            {/* /* <Input 
            type="text"
            required
            onChange={(e)=> setCadastro({...
              cadastro, nome: e.target.value
            })}/>
          </Form.Item> */ }

          <Form.Item
            name="Conteudo"
            label="conteudo"
            rules={[{ required: false, message: 'Please input the age!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, url: e.target.value })}
            />
          </Form.Item>
          
          <Form.Item
            name="Data Fim"
            label="data fim"
            rules={[{ required: true, message: 'Por favor, insira a data de fim!' }]}
          />
             <Input
              type="date"
              onChange={(e) => setCadastro({ ...cadastro, url: e.target.value })}
            />

          {/* <Form.Item
            name="Data Início"
            label="data início"
            rules={[{ required: false, message: 'Por favor, insira a data de início!' }]}
          />
             <Input
              type="date"
              onChange={(e) => setCadastro({ ...cadastro, url: e.target.value })}
            /> */}
            
            <Form.Item
            name="Data Fim"
            label="data fim"
            rules={[{ required: true, message: 'Por favor, insira a data de fim!' }]}
          >
             <Input
              type="date"
              onChange={(e) => setCadastro({ ...cadastro, url: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
       {/* FIM ############# Modal Cadastrar Message */}

         {/* Esse modal é para editar um item na tabela pelo botão de editar */}
      <Modal
        title="Editar Message"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        onOk={handleEdit}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal">
          <Form.Item
            name="idMessage"
            label="Message"
            rules={[{ required: true, message: 'Por favor, coloque a mensagem !' }]}
          >
            {/*dentro de setCadastro é criado um novo objeto {}, e dentro dele é criado uma cópia do objeto cadastro(está no useState) por meio do rest operator e em seguida é adicionado a propriedade a ser alterada ou criada  */}
            <Input 
            type="text"
            required
            onChange={(e)=> setCadastro({...
              cadastro, nome: e.target.value
            })}/>
          </Form.Item>

          <Form.Item
            name="Conteudo"
            label="conteudo"
            rules={[{ required: false, message: 'Please input the age!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, url: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="Data Início"
            label="data início"
            rules={[{ required: false, message: 'Por favor, insira a data de início!' }]}
         />
             <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, url: e.target.value })}
            />
            <Form.Item
            name="Data Fim"
            label="data fim"
            rules={[{ required: false, message: 'Por favor, insira a data de fim!' }]}
          >
             <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, url: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
       {/* FIM ############# Modal Editar Alm */}
    </>
  );
};





export default TableMessages;