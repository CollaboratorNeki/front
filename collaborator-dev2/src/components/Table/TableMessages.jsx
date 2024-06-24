import React, { useState, useEffect } from 'react';
import { storeMessage, getMessage, updateMessage, deleteMessage } from '../../services/messageService';
import { Space, Table, Grid, Input, Button, Modal, Form, Popconfirm, Switch } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import './Table.css';

const { useBreakpoint } = Grid;
const { Search } = Input;



const TableMessages = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs;
  const { t } = useTranslation();
  const defaultTitle = () => t('Mensagens');
const defaultFooter = () => 'Neki';
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [cadastro, setCadastro] = useState({
    conteudo: '',
    dataInicio: '',
    dataFim: '',
    tipo: '',
  });

  useEffect(() => {
    // Função para buscar os dados das mensagens
    const fetchData = async () => {
      const dadosMessage = await getMessage();
      setFilteredData(dadosMessage);
    };
    fetchData();
  }, []);

  const handleSearch = (value) => {
    // Função para filtrar os dados da tabela com base no texto de busca
    setSearchText(value);
    if (value === '') {
      const fetchData = async () => {
        const dadosMessage = await getMessage();
        setFilteredData(dadosMessage);
      };
      fetchData();
    } else {
      const filtered = filteredData.filter(
        (item) =>
          item.conteudo.toLowerCase().includes(value.toLowerCase()) ||
          item.tipo.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
    // Limpar o campo de pesquisa após a busca
    setSearchText('');
  };

  const showAddModal = () => {
    // Função para exibir o modal de adicionar mensagem
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    // Função para cancelar a adição de mensagem e fechar o modal
    setIsAddModalVisible(false);
  };

  const handleAdd = async () => {
    // Função para adicionar uma nova mensagem
    if (
      cadastro.conteudo !== '' &&
      cadastro.dataInicio !== '' &&
      cadastro.dataFim !== '' &&
      cadastro.tipo !== ''
    ) {
      await storeMessage(cadastro);
      setIsAddModalVisible(false);
      setCadastro({ conteudo: '', dataInicio: '', dataFim: '', tipo: '' });
      const dadosMessage = await getMessage();
      setFilteredData(dadosMessage);
    } else {
      alert ('Preencha todos os campos!');
    }
  };

  const showEditModal = (item) => {
    // Função para exibir o modal de edição de mensagem
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    // Função para cancelar a edição de mensagem e fechar o modal
    setIsEditModalVisible(false);
    setEditingItem(null);
  };

  const handleEdit = async () => {
    // Função para editar uma mensagem existente
    form
      .validateFields()
      .then(async (values) => {
        const idEditingItem = editingItem.idMessage;
        form.resetFields();
        setIsEditModalVisible(false);
        await updateMessage(idEditingItem, values);
        const updatedData = filteredData.map((item) =>
          item.idMessage === idEditingItem ? { ...item, ...values } : item
        );
        setFilteredData(updatedData);
        setEditingItem(null);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = async (record) => {
    // Função para deletar uma mensagem
    try {
      await deleteMessage(record.idMessage);
      const updatedData = filteredData.filter((item) => item.idMessage !== record.idMessage);
      setFilteredData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  // FUNÇÃO PARA FORMATAR A DATA ( CRIA UMA VARIAVEL D E RECEBE A DATA, CRIA UMA VARIAVEL DAY QUE RECEBE O DIA, CRIA 
  // UMA VARIAVEL MONTH QUE RECEBE O MES, CRIA UMA VARIAVEL YEAR QUE RECEBE O ANO, RETORNA A DATA FORMATADA  "return `${day}/${month}/${year}`")
  // OBS. NA COLUNA DATA INICIO E DATA FIM, FOI INSERIDO O CÓDIGO QUE CHAMA A FUNÇÃO FORMATDATE USANDO O MÉTODO RENDER PARA FORMATAR A DATA
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };
  // FIM DA FUNÇÃO PARA FORMATAR A DATA

  const columns = [
    {
      title: 'Id',
      dataIndex: 'idMessage',
      key: 'idMessage',
      sorter: (a, b) => a.idMessage - b.idMessage,
      width: 30,
    },
    {
      title: t('Conteúdo'),
      dataIndex: 'conteudo',
      key: 'conteudoMessage',
      sorter: (a, b) => {
        if (a.conteudo < b.conteudo) {
          return -1;
        }
        if (a.conteudo > b.conteudo) {
          return 1;
        }
        return 0;
      },
      width: 200,
    },
    {
      title: t('Tipo'),
      dataIndex: 'tipo',
      key: 'tipoMessage',
      sorter: (a, b) => {
        if (a.tipo < b.tipo) {
          return -1;
        }
        if (a.tipo > b.tipo) {
          return 1;
        }
        return 0;
      },
      width: 100,
    },
    {
      title: t('Data Início'),
      dataIndex: 'dataInicio',
      key: 'dataInicioMessage',
      width: 100,
      render: (text) => formatDate(text), // CHAMA A FUNÇÃO FORMATDATE USANDO O MÉTODO RENDER PARA FORMATAR A DATA
    },
    {
      title: t('Data Fim'),
      dataIndex: 'dataFim',
      key: 'dataFimMessage',
      width: 100,
      render: (text) => formatDate(text), // CHAMA A FUNÇÃO FORMATDATE USANDO O MÉTODO RENDER PARA FORMATAR A DATA
    },
    {
      title: t('Ação'),
      key: 'acao',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}><FaEdit /></Button>
          <Popconfirm
            title= {t("Deseja deletar?")}
            onConfirm={() => handleDelete(record)}
          >
            <Button><MdDeleteForever /></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
          placeholder= {t("Buscar mensagem...")}
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
         {t("Cadastrar")}
        </Button>
      </Space>

      <Table
        {...tableProps}
        pagination={{ position: ['bottomRight'] }}
        columns={columns}
        dataSource={filteredData}
      />

      <Modal
        title= {t("Cadastrar Nova Mensagem")}
        visible={isAddModalVisible}
        onCancel={handleAddCancel}
        onOk={handleAdd}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="conteudo"
            label= {t("Conteúdo")}
            rules={[{ required: true, message: t("Coloque o conteúdo por favor!") }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, conteudo: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="tipo"
            label={t("Tipo")}
            rules={[{ required: true, message: t("Coloque o tipo por favor!") }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, tipo: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="dataInicio"
            label={t("Data Início")}
            rules={[{ required: true, message: t("Coloque a data de início por favor!") }]}
          >
            <Input
              type="date"
              required
              onChange={(e) => setCadastro({ ...cadastro, dataInicio: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="dataFim"
            label={t("Data Fim")}
            rules={[{ required: true, message: t("Coloque a data de fim por favor!" )}]}
          >
            <Input
              type="date"
              required
              onChange={(e) => setCadastro({ ...cadastro, dataFim: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={t("Editar Mensagem")}
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        onOk={handleEdit}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="conteudo"
            label={t("Conteúdo")}
            rules={[{ required: true, message: t( "Coloque o conteúdo por favor!") }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, conteudo: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="tipo"
            label={t("Tipo")}
            rules={[{ required: true, message: t("Coloque o tipo por favor!" )}]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, tipo: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="dataInicio"
            label={t("Data Início")}
            rules={[{ required: true, message: t("Coloque a data de início por favor!") }]}
          >
            <Input
              type="date"
              required
              onChange={(e) => setCadastro({ ...cadastro, dataInicio: e.target.value })}
            />
          </Form.Item>

          <Form.Item
            name="dataFim"
            label={t("Data Fim")}
            rules={[{ required: true, message: t("Coloque a data de fim por favor!") }]}
          >
            <Input
              type="date"
              required
              onChange={(e) => setCadastro({ ...cadastro, dataFim: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableMessages;
