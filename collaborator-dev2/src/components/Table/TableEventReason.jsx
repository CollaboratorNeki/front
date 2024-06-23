import React, { useState, useEffect } from 'react';
import { storeEventReason, getEventReason, updateEventReason, deleteEventReason } from '../../services/eventReasonService';
import { Space, Table, Grid, Input, Button, Modal, Form, Popconfirm, Switch } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import './Table.css';

const { useBreakpoint } = Grid;
const { Search } = Input;

const defaultTitle = () => 'EventReason';
const defaultFooter = () => 'footer';

const TableEventReason = () => {
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
  const [status, setStatus] = useState();
  const [status2, setStatus2] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const dadosEventReason = await getEventReason();
      setFilteredData(dadosEventReason);
    };
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    if (value === '') {
      const fetchData = async () => {
        const dadosEventReason = await getEventReason();
        setFilteredData(dadosEventReason);
      };
      fetchData();
    } else {
      const filtered = filteredData.filter(
        (item) =>
          item.nome.toLowerCase().includes(value.toLowerCase()) ||
          item.descricao.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
    // Limpar o campo de pesquisa após a busca
    setSearchText('');
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAdd = async () => {
    if (cadastro.nome !== '' && cadastro.descricao !== '') {
      await storeEventReason(cadastro);
      setIsAddModalVisible(false);
      setCadastro({ nome: '', descricao: '', status: '' });
      const dadosEventReason = await getEventReason();
      setFilteredData(dadosEventReason);
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
        const idEditingItem = editingItem.idEventReason;
        form.resetFields();
        setIsEditModalVisible(false);
        await updateEventReason(idEditingItem, values);
        const updatedData = filteredData.map((item) =>
          item.idEventReason === idEditingItem ? { ...item, ...values } : item
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
      await deleteEventReason(record.idEventReason);
      const updatedData = filteredData.filter((item) => item.idEventReason !== record.idEventReason);
      setFilteredData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'idEventReason',
      key: 'idEventReason',
      sorter: (a, b) => a.idEventReason - b.idEventReason,
      width: 20,
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nomeEventReason',
      width: 150,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricaoEventReason',
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 50,
      key: 'statusEventReason',
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
    console.log(checked, "switch cadastro status");
    setCadastro({ ...cadastro, status: checked });
    checked ? setStatus(true) : setStatus(false);
  };

  // Lógica do switch de status de editar
  const onChangeSwitch2 = (checked) => {
    console.log(checked, "switch editar status2  ");
    setCadastro({ ...cadastro, status: checked });
    checked ? setStatus2(true) : setStatus2(false);
  };

  const tableProps = {
    bordered: true,
    size: 'small',
    title: defaultTitle,
    showHeader: true,
    footer: defaultFooter,
    // Remova o rowSelection para eliminar os checkboxes
    // rowSelection: {},
    scroll: isSmallScreen ? { x: 'max-content', y: 620 } : { y: 620 },
    pagination: isSmallScreen ? { pageSize: 5 } : false,
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Buscar evento..."
          enterButton
          value={searchText} // Adicionado para limpar o campo de pesquisa
          onChange={(e) => setSearchText(e.target.value)} // Adicionado para controlar o campo de pesquisa
          onSearch={handleSearch}
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
        title="Cadastrar Novo Evento"
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

          <Form.Item name="status" label="Status" rules={[{ required: false }]}>
            <Switch onChange={(checked) => onChangeSwitch(checked)} />
            {status ? <p>Ativo</p> : <p>Inativo</p>}
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Editar Evento"
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

          <Form.Item name="status" label="Status" rules={[{ required: false }]}>
            <Switch onChange={(checked) => onChangeSwitch2(checked)} />
            {status2 ? <p>Ativo</p> : <p>Inativo</p>}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableEventReason;
