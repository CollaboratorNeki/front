import React, { useState, useEffect } from 'react'; // Importa React e hooks necessários
import { Space, Table, Grid, Input, Button, Modal, Form, InputNumber, Popconfirm, Switch } from 'antd'; // Importa componentes do Ant Design
import "./Table.css"; // Importa estilos CSS
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { deleteEvent, storeEvent, getEvent, updateEventReason } from '../../services/eventReasonService';
import {useTranslation} from "react-i18next"

const { useBreakpoint } = Grid; // Hook para detectar breakpoints
const { Search } = Input; // Componente de entrada com funcionalidade de pesquisa

const defaultTitle = () => 'Motivos de Eventos'; // Função para título padrão da tabela
const defaultFooter = () => 'Here is footer'; // Função para rodapé padrão da tabela

const TableEventReason = () => {
  const screens = useBreakpoint(); // Detecta o tamanho da tela
  const isSmallScreen = screens.xs; // Define se a tela é pequena
 const {t} = useTranslation();

  // Estados para gerenciar dados e UI
  const [searchText, setSearchText] = useState('');
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
  const response = async () => {
      const dadosEvent = await getEvent();
      const setDadosEvent= dadosEvent?.map((item) => ({
        id: item.idEventReason,
        nome: item.nome,
        descricao: item.descricao,
        status: item.status,
      }));
      // console.log(setDadosAlm);
      // setDataAlm(setDadosAlm);
      setFilteredData(setDadosEvent);
    };

    response();
  }, []);

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

  const handleAdd = () => {

    if (
      cadastro.nome !== '' &&
      cadastro.descricao !== '' &&
      cadastro.status !== ''
    ) {
      return storeEvent(cadastro);
    }
    return alert('Preencha todos os campos!');
  };

  // Função para mostrar o modal de edição
  const showEditModal = (item) => {
    console.log('Dados que estão renderizados na linha da tabela showEditModal', item);
    setEditingItem(item);
    // o parametro (item) aqui é passado para jogar os dados do input do formulário de edição na função handleEdit, no handleEdit o parametro values são os dados do formulário
    form.setFieldsValue(item);
    setIsEditModalVisible(true);
  };

  // Função para cancelar o modal de edição
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingItem(null);
  };

  // Função para salvar as edições
  const handleEdit = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log('Dados do formulário parametro values', values);
        console.log('dados editingItem', editingItem);
        console.log('dados filteredData', filteredData);
        const idEditingItem = editingItem.idEventReason;
        console.log(idEditingItem, 'id item separado');
        //parametro values são os dados do formulário, e o método validateFields é responsável por validar os dados
        form.resetFields();
        setIsEditModalVisible(false);

        const updatedData = filteredData.map((item) =>
          item.idEventReason === editingItem.idEventReason ? { ...item, ...values } : item,
        );

        const filtro = updatedData.filter((item) => item.idEventReason === idEditingItem);
        // console.log(filtro, 'filtro');
        // console.log(filtro[0]);

        console.log(updatedData, 'Dados da variavel updatedData');
        setFilteredData(updatedData);
        const response = await updateEventReason(idEditingItem, filtro[0]);
        setEditingItem(null);
        console.log(filteredData, 'Dados do filteredData');
       
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
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
    
        title: 'Id',
        dataIndex: 'id',
        key: 'idEventReason',
        sorter: (a, b) => a.id - b.id, //método para ordenar a coluna id
        width: 50,
      
    },
    
    {
      title: 'Nome',
      dataIndex: 'nome',
      width: 150,
      key: 'nomeEvent'
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      width: 80,
      key: 'decricaoEvent',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 200,
      key:'statusEvent',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Ação",
      key: 'action',
      width: 150,

      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}><FaEdit /></Button>
          <Popconfirm title="Tem certeza que deseja excluir?" onConfirm={() => {
            console.log("record", record)
            handleDelete(record.key)
          }}>
            <Button><MdDeleteForever /></Button>
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
        {t("Cadastrar")}
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
            rules={[{ message: 'Por favor, insira a descrição!' }]}>
            <Input

              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, descricao: e.target.value })} />
          </Form.Item>
          <Form.Item name="statusEvent" label="Status">
            <Switch onChange={(checked) => onChangeSwitch(checked)} />
            {status ? <p>Ativo</p> : <p>Inativo</p>}
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
            <Switch onChange={(status) => setStatus(status)} />
            {!status ? <p>Inativo</p> : <p>Ativo</p>}
          </Form.Item>

        </Form>
      </Modal>
    </>

  );
};

export default TableEventReason;
