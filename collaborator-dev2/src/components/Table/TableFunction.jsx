import React, { useState, useEffect } from 'react';
import { storeRole, getRole, updateRole, deleteRole } from '../../services/roleService';
import { Space, Table, Grid, Input, Button, Modal, Form, Popconfirm, Switch } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import './Table.css';

const { useBreakpoint } = Grid;
const { Search } = Input;

const defaultTitle = () => 'Role';
const defaultFooter = () => 'footer';

const TableFunction = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs;
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [cadastro, setCadastro] = useState({
    nome: '',
    descricao: '',
    status: '',
  });
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dadosRole = await getRole();
      setFilteredData(dadosRole);
    };
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = filteredData.filter(
      (item) =>
        item.nome.toLowerCase().includes(value.toLowerCase()) ||
        item.descricao.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAdd = async () => {
    if (
      cadastro.nome !== '' &&
      cadastro.descricao !== '' &&
      cadastro.status !== ''
    ) {
      await storeRole(cadastro);
      setIsAddModalVisible(false);
      setCadastro({ nome: '', descricao: '', status: '' });
      const dadosRole = await getRole();
      setFilteredData(dadosRole);
    } else {
      alert('Preencha todos os campos!');
    }
  };

  const showEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingItem(null);
  };

  const handleEdit = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const idEditingItem = editingItem.idRole;
        form.resetFields();
        setIsEditModalVisible(false);
        await updateRole(idEditingItem, values);
        const updatedData = filteredData.map((item) =>
          item.idRole === idEditingItem ? { ...item, ...values } : item
        );
        setFilteredData(updatedData);
        setEditingItem(null);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = async (record) => {
    try {
      await deleteRole(record.idRole);
      const updatedData = filteredData.filter((item) => item.idRole !== record.idRole);
      setFilteredData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'idRole',
      key: 'idRole',
      sorter: (a, b) => a.idRole - b.idRole,
      width: 50,
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nomeRole',
      width: 150,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricaoRole',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 150,
      key: 'statusRole',
      render: (text) => (text ? 'Ativo' : 'Inativo'),
    },
    {
      title: 'Ação',
      key: 'acao',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}><FaEdit /></Button>
          <Popconfirm
            title="Deseja deletar?"
            onConfirm={() => handleDelete(record)}
          >
            <Button><MdDeleteForever /></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onChangeSwitch = (checked) => {
    setCadastro({ ...cadastro, status: checked });
    checked ? setStatus(true) : setStatus(false);
  };

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
          placeholder="Buscar nome da função..."
          enterButton
          onSearch={handleSearch}
          backgroud="linear-gradient(to bottom, #2d939c, #68C7CF)"
        />
        <Button
          type="primary"
          onClick={showAddModal}
          style={{ background: 'linear-gradient(to bottom, #2d939c, #68C7CF)', border: 'none' }}
        >
          Cadastrar
        </Button>
      </Space>

      <Table
        {...tableProps}
        pagination={{ position: ['bottomRight'] }}
        columns={columns}
        dataSource={filteredData}
      />

      <Modal
        title="Cadastrar Nova Função"
        visible={isAddModalVisible}
        onCancel={handleAddCancel}
        onOk={handleAdd}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: 'Coloque o nome por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[{ required: true, message: 'Coloque a descrição por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, descricao: e.target.value })}
            />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Switch onChange={() => onChangeSwitch(status)} />
            {status ? <p>Ativo</p> : <p>Inativo</p>}
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Editar Função"
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        onOk={handleEdit}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: 'Coloque o nome por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[{ required: true, message: 'Coloque a descrição por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, descricao: e.target.value })}
            />
          </Form.Item>

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Switch onChange={() => onChangeSwitch(status)} />
            {status ? <p>Ativo</p> : <p>Inativo</p>}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableFunction;
