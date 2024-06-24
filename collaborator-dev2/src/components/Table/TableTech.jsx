import React, { useState } from 'react';
import { Space, Table, Grid, Input, Button, Modal, Form, Popconfirm, message } from 'antd';
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const { useBreakpoint } = Grid;
const { Search } = Input;

const initialData = [
  { key: 1, tecnologia: 'Java', tipo: 'Linguagem', versao: '8' },
  { key: 2, tecnologia: 'JavaScript', tipo: 'Linguagem', versao: 'ES6' },
  { key: 3, tecnologia: 'Python', tipo: 'Linguagem', versao: '3.8' },
  { key: 4, tecnologia: 'Node.js', tipo: 'Runtime', versao: '14' },
  { key: 5, tecnologia: 'Angular', tipo: 'Framework', versao: '11' },
  { key: 6, tecnologia: 'React', tipo: 'Framework', versao: '17' },
  { key: 7, tecnologia: 'Vue', tipo: 'Framework', versao: '3' },
  { key: 8, tecnologia: 'Spring Boot', tipo: 'Framework', versao: '2.4' },
  { key: 9, tecnologia: 'Django', tipo: 'Framework', versao: '3.1' },
  { key: 10, tecnologia: 'Flask', tipo: 'Framework', versao: '1.1' },
  { key: 11, tecnologia: 'Ruby on Rails', tipo: 'Framework', versao: '6' },
  { key: 12, tecnologia: 'Laravel', tipo: 'Framework', versao: '8' },
  { key: 13, tecnologia: 'ASP.NET', tipo: 'Framework', versao: '5' },
  { key: 14, tecnologia: 'Express.js', tipo: 'Framework', versao: '4' },
  { key: 15, tecnologia: 'Flutter', tipo: 'Framework', versao: '2' },
  { key: 16, tecnologia: 'Swift', tipo: 'Linguagem', versao: '5' },
  { key: 17, tecnologia: 'Kotlin', tipo: 'Linguagem', versao: '1.4' },
  { key: 18, tecnologia: 'React Native', tipo: 'Framework', versao: '0.63' },
  { key: 19, tecnologia: 'Ionic', tipo: 'Framework', versao: '5' },
  { key: 20, tecnologia: 'TensorFlow', tipo: 'Machine Learning', versao: '2.4' },
  { key: 21, tecnologia: 'PyTorch', tipo: 'Machine Learning', versao: '1.7' },
  { key: 22, tecnologia: 'Keras', tipo: 'Machine Learning', versao: '2.4' },
  { key: 23, tecnologia: 'Scikit-learn', tipo: 'Machine Learning', versao: '0.23' },
  { key: 24, tecnologia: 'Pandas', tipo: 'Data Analysis', versao: '1.2' },
  { key: 25, tecnologia: 'NumPy', tipo: 'Data Analysis', versao: '1.19' },
  { key: 26, tecnologia: 'Hadoop', tipo: 'Big Data', versao: '3.2' },
  { key: 27, tecnologia: 'Spark', tipo: 'Big Data', versao: '3.0' },
  { key: 28, tecnologia: 'Kafka', tipo: 'Big Data', versao: '2.6' },
  { key: 29, tecnologia: 'Docker', tipo: 'DevOps', versao: '20.10' },
  { key: 30, tecnologia: 'Kubernetes', tipo: 'DevOps', versao: '1.20' },
];

const defaultTitle = () => 'Tech';
const defaultFooter = () => 'Neki';

const TechTable = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs;
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = initialData.filter((item) =>
      item.tecnologia.toLowerCase().includes(value.toLowerCase()) ||
      item.tipo.toLowerCase().includes(value.toLowerCase()) ||
      item.versao.toLowerCase().includes(value.toLowerCase())
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
        message.success('Tecnologia adicionada com sucesso!');
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
        message.success('Tecnologia atualizada com sucesso!');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = (key) => {
    const newData = filteredData.filter((item) => item.key !== key);
    setFilteredData(newData);
    message.success('Tecnologia excluída com sucesso!');
  };

  const columns = [
    {
      title: t("Tecnologia"),
      dataIndex: 'tecnologia',
      width: 200,
    },
    {
      title: t("Tipo"),
      dataIndex: 'tipo',
      width: 70,
    },
    {
      title: t("Versão"),
      dataIndex: 'versao',
      width: 30,
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
    // rowSelection: {},
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
        title="Adicionar Nova Tecnologia"
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
            name="tecnologia"
            label="Tecnologia"
            rules={[{ required: true, message: 'Por favor, insira a tecnologia!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tipo"
            label="Tipo"
            rules={[{ required: true, message: 'Por favor, insira o tipo!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="versao"
            label="Versão"
            rules={[{ required: true, message: 'Por favor, insira a versão!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Editar Tecnologia"
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
            name="tecnologia"
            label="Tecnologia"
            rules={[{ required: true, message: 'Por favor, insira a tecnologia!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tipo"
            label="Tipo"
            rules={[{ required: true, message: 'Por favor, insira o tipo!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="versao"
            label="Versão"
            rules={[{ required: true, message: 'Por favor, insira a versão!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TechTable;