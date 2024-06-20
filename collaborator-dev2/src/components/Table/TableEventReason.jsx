import React, { useState, useEffect } from 'react'; // Importa React e hooks necessários
import { Space, Table, Grid, Input, Button, Modal, Form, InputNumber, Popconfirm, Switch } from 'antd'; // Importa componentes do Ant Design
import "./Table.css"; // Importa estilos CSS
import api from '../../services/api'; // Importa a configuração do Axios
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const { useBreakpoint } = Grid; // Hook para detectar breakpoints
const { Search } = Input; // Componente de entrada com funcionalidade de pesquisa

const defaultTitle = () => 'Motivos de Eventos'; // Função para título padrão da tabela
const defaultFooter = () => 'Here is footer'; // Função para rodapé padrão da tabela

const TableEventReason = () => {
  const screens = useBreakpoint(); // Detecta o tamanho da tela
  const isSmallScreen = screens.xs; // Define se a tela é pequena

  // Estados para gerenciar dados e UI
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm(); // Hook do Ant Design para gerenciar formulários
  const [cadastro, setCadastro] = useState({
    nome: '',
    descricao: '',
    status: '',
  });
  const [status, setStatus] = useState(false);
  // useEffect para buscar dados ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/event_reason/listar'); // Faz a requisição para a API
        const data = response.data.map((item, index) => ({
          key: index + 1,
          name: item.nome,
          description: item.descricao,  
          status: item.status,
          ...item,
        }));
        setData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

   const storeEvent = async (itemEvent) => {
    console.log('chamando a api para cadastrar Event');
    try {
      const response = await api.post('/event_reason/salvar', itemEvent);
      console.log(response);
      alert('Event cadastrado com sucesso');
    } catch (error) {
      console.log('Erro post Event: ', error);
    }
  };
  
   // Função para adicionar um novo item
   const handleAdd = () => {
   
    if(
      cadastro.nome !== '' &&
      cadastro.descricao !== '' 
    ){
    return storeEvent(cadastro);
    }
    
  
    return alert('Preencha todos os campos!');
  

};
 
  // Função para filtrar dados com base na pesquisa
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.description.toString().includes(value) ||
      item.status.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Função para mostrar o modal de adicionar
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  // Função para cancelar o modal de adicionar
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  // Função para mostrar o modal de edição
  const showEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsEditModalVisible(true);
  };

  // Função para cancelar o modal de edição
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingItem(null);
  };

  // Função para salvar as edições
  const handleEdit = async (values) => {
    console.log(values)
    try {
      const values = await form.validateFields();
      form.resetFields();
      setIsEditModalVisible(false);

      
      // Verifica se 'statusEvent' está presente e não é vazio
      // if (cadastro.status) {
      //   throw new Error("status' is required");
      // }
  
      // Atualiza localmente os dados na tabela
      const updateItem = {
        ...values,
        // statusEvent: status,
      }
      console.log("values console",updateItem)
      const updatedData = data.map(item =>
        item.key === editingItem.key ? { ...item, ...values } : item
      );
      setData(updatedData);
      setFilteredData(updatedData);
      setEditingItem(null);

      await api.put(`/atualizar/${editingItem.key}`,updateItem );
      console.log('Dados atualizados no backend com sucesso!');
        
    } catch (error) {
      console.error('Erro ao atualizar dados no backend:', error);
    }
  };
  
  
  
  const deleteEvent = async (idEventReason) => {
    try {
      const response = await api.delete(`/event_reason/deletar/${idEventReason}`);
      console.log('Id deletado com sucesso ');
    } catch (error) {
      console.log('Erro em deletar Event: ', error);
    }
  };
  

  // Função para deletar um item
  const handleDelete = async (id) => {
    //  console.log(record.id);
    try {
      const response = await deleteEvent(id);
    } catch (error) {
      console.log(error);
    }

    // setFilteredData(newData);
  };

// lógica do switch de status

const onChangeSwitch = (checked) => {
  console.log(checked)
  setCadastro({ ...cadastro, status: checked });
  checked ? setStatus(false) : setStatus(true);
};
  // Define as colunas da tabela
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      width: 80,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 200,
      filters: [
        {
          text: '',
          value: '',
        },
        {
          text: '',
          value: '',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: 'Ação',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
        <Button onClick={() => showEditModal(record)}><FaEdit/></Button>
        <Popconfirm title="Tem certeza que deseja excluir?" onConfirm={() => {
          console.log("record",record)
          handleDelete(record.key)}}>
          <Button><MdDeleteForever/></Button>
        </Popconfirm>
      </Space>
      ),
    },
  ];  

  // Propriedades da tabela
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
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search..."
          enterButton
          onSearch={handleSearch}
          backgroud="linear-gradient(to bottom, #2d939c, #68C7CF)"
        />
        <Button type="primary" onClick={showAddModal}>
          Cadastrar
        </Button>
      </Space>
      <Table
        {...tableProps}
        pagination={{
          position: ['bottomRight'],
        }}
        columns={columns}
        dataSource={filteredData}
      />
      <Modal
        title="Cadastrar Novo Item"
        visible={isAddModalVisible}
        onCancel={handleAddCancel}
        onOk={handleAdd}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
            
          >
            <Input
               type="text"
               required
               onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descrição"
            rules={[{  message: 'Por favor, insira a descrição!' }]}>
            <Input 
            
            type="text"
            required
            onChange={(e) => setCadastro({ ...cadastro, descricao: e.target.value })}/>
          </Form.Item>
          <Form.Item name="statusEvent" label="Status"> 
            <Switch onChange={(checked) => onChangeSwitch(checked)}/>
            { status ? <p>Ativo</p> : <p>Inativo</p>}
          </Form.Item>
         
        </Form>
      </Modal>
      <Modal
        title="Editar Item"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        onOk={handleEdit}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Descrição"
            rules={[{ message: 'Por favor, insira a descrição!' }]}
          >
         <Input />
          </Form.Item>
         
          <Form.Item name="statusEvent" label="Status"> 
          <Switch onChange={(status)=> setStatus(status)}/>
          { !status ? <p>Inativo</p> : <p>Ativo</p>}
        </Form.Item>
          
        </Form>
      </Modal>
    </>
     
  );
};

export default TableEventReason;
