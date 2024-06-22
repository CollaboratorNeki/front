import React, { useState } from 'react';
import { Space, Table, Grid, Input, Button, Modal, Form, InputNumber, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const { useBreakpoint } = Grid;
const { Search } = Input;

const initialData = [];
for (let i = 1; i <= 10; i++) {
  initialData.push({
    key: i,
    name: `Client ${i}`,
    email: `client${i}@example.com`,
    phone: `123-456-789${i}`,
    cpfCnpj: i % 2 === 0 ? `123.456.789-0${i}` : `12.345.678/0001-0${i}`,
    externalCode: `EXT${i}`,
  });
}


const TableClient = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs; // Consider xs as small screen
  const { t } = useTranslation();
  const defaultTitle = () => t('Clientes');
  const defaultFooter = () => 'Neki';

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = initialData.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.email.toLowerCase().includes(value.toLowerCase()) ||
      item.phone.includes(value) ||
      item.cpfCnpj.includes(value) ||
      (item.externalCode && item.externalCode.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAdd = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        setIsAddModalVisible(false);
        const newItem = {
          key: filteredData.length + 1,
          ...values,
        };
        setFilteredData([...filteredData, newItem]);
        message.success('Clienta adicionado com successo!');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
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

  const handleEdit = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        setIsEditModalVisible(false);
        const updatedData = filteredData.map((item) => 
          item.key === editingItem.key ? { ...item, ...values } : item
        );
        setFilteredData(updatedData);
        setEditingItem(null);
        message.success('Client atualizado com successo!');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = (key) => {
    const newData = filteredData.filter((item) => item.key !== key);
    setFilteredData(newData);
    message.success('Cliente deletado com successo!');
  };

  const columns = [
    {
      title: t("Nome"),
      dataIndex: 'name',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: t("Telefone"),
      dataIndex: 'phone',
      width: 150,
    },
    {
      title: 'CPF/CNPJ',
      dataIndex: 'cpfCnpj',
      width: 150,
    },
    {
      title: t("Código Externo"),
      dataIndex: 'externalCode',
      width: 150,
    },
    {
      title: t("Ação"),
      key: 'action',
      width: 150,
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
        title= {t("Adicionar novo cliente")}
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
            name= {t("Nome")}
            label= {t("Nome")}
            rules={[{ required: true, message: 'Por favor coloque o nome!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor coloque o email!' },
              { type: 'email', message: 'Por favor coloque o email!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={t("Telefone")}
            label={t("Telefone")}
            rules={[{ required: true, message: 'Por favor coloque o telefone!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cpfCnpj"
            label="CPF/CNPJ"
            rules={[
              { required: true, message: 'Por favor insira o CPF ou CNPJ!' },
              {
                pattern: /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/,
                message: 'Please input a valid CPF or CNPJ!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={t("Código Externo")}
            label={t("Código Externo")}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={t("Editar Clientes")}
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
            name={t("Nome")}
            label={t("Nome")}
            rules={[{ required: true, message: 'Por favor insira um nome!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor insira um email!' },
              { type: 'email', message: 'Por favor insira um email válido!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={t("Telefone")}
            label={t("Telefone")}
            rules={[{ required: true, message: 'Por favor insira um telefone!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cpfCnpj"
            label="CPF/CNPJ"
            rules={[
              { required: true, message: 'Por favor insira um CPF ou CNPJ!' },
              {
                pattern: /^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/,
                message: 'Please input a valid CPF or CNPJ!'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={t("Código Externo")}
            label={t("Código Externo")}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableClient;
