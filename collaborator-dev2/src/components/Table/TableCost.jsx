import React, { useState } from 'react';
import { Space, Table, Grid, Input, Button, Modal, Form, InputNumber, Popconfirm, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const { useBreakpoint } = Grid;
const { Search } = Input;

const initialData = [
  { key: 1, costType: 'Plano de Saúde', amountSpent: 500, category: 'Saúde' },
  { key: 2, costType: 'Vale Transporte', amountSpent: 150, category: 'Transporte' },
  { key: 3, costType: 'Cartão Alimentação', amountSpent: 300, category: 'Alimentação' },
  { key: 4, costType: 'Seguro de Vida', amountSpent: 200, category: 'Seguro' },
  { key: 5, costType: 'Ajuda de Custo', amountSpent: 400, category: 'Diversos' },
  { key: 6, costType: 'Cartão Refeição', amountSpent: 250, category: 'Alimentação' },
  { key: 7, costType: 'Viagens', amountSpent: 1200, category: 'Viagens' },
  { key: 8, costType: 'Treinamento', amountSpent: 800, category: 'Educação' },
  { key: 9, costType: 'Equipamentos', amountSpent: 1000, category: 'Infraestrutura' },
  { key: 10, costType: 'Uniforme', amountSpent: 100, category: 'Diversos' },
  { key: 11, costType: 'Férias', amountSpent: 1500, category: 'Benefícios' },
  { key: 12, costType: 'Bônus Anual', amountSpent: 2000, category: 'Remuneração' },
  { key: 13, costType: 'Cursos Online', amountSpent: 300, category: 'Educação' },
  { key: 14, costType: 'Assistência Odontológica', amountSpent: 150, category: 'Saúde' },
  { key: 15, costType: 'Eventos Corporativos', amountSpent: 500, category: 'Diversos' },
  { key: 16, costType: 'Auxílio Creche', amountSpent: 400, category: 'Benefícios' },
  { key: 17, costType: 'Assistência Jurídica', amountSpent: 600, category: 'Diversos' },
  { key: 18, costType: 'Consultoria', amountSpent: 700, category: 'Infraestrutura' },
  { key: 19, costType: 'Auxílio Educação', amountSpent: 800, category: 'Educação' },
  { key: 20, costType: 'Ajuda de Custo Home Office', amountSpent: 350, category: 'Diversos' },
];


const TableCost = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs; // Consider xs as small screen
  const { t } = useTranslation();
  const defaultTitle = () => t("Gerenciamento de Custos Extras");
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
      item.costType.toLowerCase().includes(value.toLowerCase()) ||
      item.amountSpent.toString().includes(value) ||
      item.category.toLowerCase().includes(value.toLowerCase())
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
        message.success('Custos inseridos com successo!');
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
        message.success('Custos atualizados com successo!');
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = (key) => {
    const newData = filteredData.filter((item) => item.key !== key);
    setFilteredData(newData);
    message.success('Custos deletados com successo!');
  };

  const columns = [
    {
      title: t("Custos Extras"),
      dataIndex: 'costType',
      width: 150,
    },
    {
      title: t("Valor"),
      dataIndex: 'amountSpent',
      width: 70,
      render: (value) => `R$ ${value.toFixed(2)}`
    },
    {
      title: t("Categoria"),
      dataIndex: 'category',
      width: 70,
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
          placeholder="Procurar..."
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
        title={t("Cadastrar Custos")}
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
            name={t("Tipo de Custo")}
            label= {t("Tipo de Custo")}
            rules={[{ required: true, message: 'Por favor coloque o tipo de custo!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={t("Valor")}
            label={t("Valor")}
            rules={[{ required: true, message: 'Por favor coloque o valor!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name={t("Categoria")}
            label={t("Categoria")}
            rules={[{ required: true, message: 'Por favor coloque a categoria!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={t("Editar Custos")}
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
            name={t("Tipo de Custo")}
            label={t("Tipo de Custo")}
            rules={[{ required: true, message: 'Por favor insira o tipo de custo!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={t("Valor")}
            label={t("Valor")}
            rules={[{ required: true, message: 'Por favor insira o valor!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name={t("Categoria")}
            label={t("Categoria")}
            rules={[{ required: true, message: 'Por favor insira a categoria!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableCost;
