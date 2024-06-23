import React, { useState, useEffect } from 'react';
import { storeAlm, getAlm, updateAlm, deleteAlm } from '../../services/almService';
import { Space, Table, Grid, Input, Button, Modal, Form, Popconfirm, Switch } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import './Table.css';

const { useBreakpoint } = Grid;
const { Search } = Input;
const defaultTitle = () => 'Alm';
const defaultFooter = () => 'footer';

const TableAlm = () => {
  const { t } = useTranslation();
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
    url: '',
    login: '',
    senha: '',
    confirmarSenha: '',
    tipo: '',
    vpn: '',
    status: '',
  });
  const [status, setStatus] = useState();
  const [status2, setStatus2] = useState();
  const [passwordVisibility, setPasswordVisibility] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const dadosAlm = await getAlm();
      setFilteredData(dadosAlm);
    };
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    if (value === '') {
      const fetchData = async () => {
        const dadosAlm = await getAlm();
        setFilteredData(dadosAlm);
      };
      fetchData();
    } else {
      const filtered = filteredData.filter(
        (item) =>
          item.nome.toLowerCase().includes(value.toLowerCase()) ||
          item.url.toString().includes(value) ||
          item.login.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
    setSearchText('');
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
      cadastro.url !== '' &&
      cadastro.login !== '' &&
      cadastro.senha !== '' &&
      cadastro.confirmPassword !== '' &&
      cadastro.senha === cadastro.confirmPassword &&
      cadastro.tipo !== '' &&
      cadastro.vpn !== ''
    ) {
      await storeAlm(cadastro);
      setIsAddModalVisible(false);
      setCadastro({ nome: '', url: '', login: '', senha: '', confirmarSenha: '', tipo: '', vpn: '', status: '' });
      const dadosAlm = await getAlm();
      setFilteredData(dadosAlm);
    } else {
      alert('Preencha todos os campos e verifique se as senhas coincidem!');
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
        const idEditingItem = editingItem.idAlmTool;
        const updatedItem = { ...values, status: status2 };
        await updateAlm(idEditingItem, updatedItem);
        form.resetFields();
        setIsEditModalVisible(false);
        const updatedData = filteredData.map((item) =>
          item.idAlmTool === idEditingItem ? { ...item, ...updatedItem } : item
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
      await deleteAlm(record.idAlmTool);
      const updatedData = filteredData.filter((item) => item.idAlmTool !== record.idAlmTool);
      setFilteredData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = (id) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'idAlmTool',
      key: 'idAlmTool',
      sorter: (a, b) => a.idAlmTool - b.idAlmTool,
      width: 40,
    },
    {
      title: t('Nome'),
      dataIndex: 'nome',
      key: 'nomeAlm',
      sorter: (a, b) => {
        if (a.nome < b.nome) {
          return -1;
        }
        if (a.nome > b.nome) {
          return 1;
        }
        return 0;
      },
      width: 150,
    },
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'loginAlm',
      width: 220,
    },
    {
      title: t('Senha'),
      dataIndex: 'senha',
      key: 'senhaAlm',
      width: 150,
      render: (senha, record) => (
        <>
          {passwordVisibility[record.idAlmTool] ? senha : '•'.repeat(senha.length)}
          <Button
            icon={passwordVisibility[record.idAlmTool] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={() => togglePasswordVisibility(record.idAlmTool)}
            type="link"
          />
        </>
      ),
    },
    {
      title: t('Tipo'),
      dataIndex: 'tipo',
      key: 'tipoAlm',
      sorter: (a, b) => {
        if (a.tipo < b.tipo) {
          return -1;
        }
        if (a.tipo > b.tipo) {
          return 1;
        }
        return 0;
      },
      width: 180,
    },
    {
      title: 'Vpn',
      dataIndex: 'vpn',
      key: 'vpnAlm',
      width: 80,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 70,
      key: 'statusAlm',
      render: (status) => (
        <>
          {status ? <p>Ativo</p> : <p>Inativo</p>}
        </>
      ),
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
    setStatus(checked);
  };

  const onChangeSwitch2 = (checked) => {
    setCadastro({ ...cadastro, status: checked });
    setStatus2(checked);
  };

  const tableProps = {
    bordered: true,
    size: 'small',
    title: defaultTitle,
    showHeader: true,
    footer: defaultFooter,
    scroll: isSmallScreen ? { x: 'max-content', y: 620 } : { y: 620 },
    pagination: isSmallScreen ? { pageSize: 5 } : false,
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Buscar nome do projeto..."
          enterButton
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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
        title="Cadastrar Novo ALM"
        visible={isAddModalVisible}
        onCancel={handleAddCancel}
        onOk={handleAdd}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="nameAlm"
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
            name="urlAlm"
            label="Url"
            rules={[{ required: true, message: 'Coloque a URL por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, url: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="loginAlm"
            label="Login"
            rules={[{ required: true, message: 'Coloque o usuário de login por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, login: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="senhaAlm"
            label="Senha"
            rules={[{ required: true, message: 'Coloque a senha por favor!' }]}
          >
            <Input.Password
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, senha: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirmação de Senha"
            required
          >
            <Input.Password
              value={cadastro.confirmPassword}
              onChange={(e) => setCadastro({ ...cadastro, confirmPassword: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="tipoAlm"
            label="Tipo"
            rules={[{ required: true, message: 'Coloque o tipo por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, tipo: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="vpnAlm"
            label="Vpn"
            rules={[{ required: true, message: 'Coloque o vpn por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, vpn: e.target.value })}
            />
          </Form.Item>

          <Form.Item name="statusAlm" label="Status">
            <Switch onChange={(checked) => onChangeSwitch(checked)} />
            {status ? <p>Ativo</p> : <p>Inativo</p>}
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Editar Item ALM"
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
            name="url"
            label="Url"
            rules={[{ required: true, message: 'Coloque a URL por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, url: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="login"
            label="Login"
            rules={[{ required: true, message: 'Coloque o usuário de login por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, login: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="senha"
            label="Senha"
            rules={[{ required: true, message: 'Coloque a senha por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, senha: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="tipo"
            label="Tipo"
            rules={[{ required: true, message: 'Coloque o tipo por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, tipo: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="vpn"
            label="Vpn"
            rules={[{ required: true, message: 'Coloque o vpn por favor!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, vpn: e.target.value })}
            />
          </Form.Item>

          <Form.Item name="status" label="Status">
            <Switch onChange={(checked) => onChangeSwitch2(checked)} />
            {status2 ? <p>Ativo</p> : <p>Inativo</p>}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableAlm;
