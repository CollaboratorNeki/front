import React, { useState, useEffect } from 'react';
import { storeRole, getRole } from '../../services/roleService';
import { Space, Table, Grid, Input, Button, Modal, Form, InputNumber, Popconfirm, Switch, } from 'antd';
import './Table.css';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
const { useBreakpoint } = Grid;
const { Search } = Input;
import { useTranslation } from 'react-i18next';

const initialData = [];
// for (let i = 1; i <= 10; i++) {
//   initialData.push({
//     key: i,
//     nome: 'Python',
//     descricao: Number(`${i}2`),
//     status: `New York No. ${i} Lake Park`,
//     description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
//   });
// }

const defaultTitle = () => 'Funçao';
const defaultFooter = () => 'Aqui é o footer';



// Componente de tabela
const TableFunction = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs; // Consider xs as small screen
  const { t } = useTranslation();

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(initialData);
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
  const [dataRole, setDataRole] = useState([]);

  // Chamando os dados do banco e guardando em um useState para poder usar na lista, é preciso usar useEffect para não criar o erro do loop infinito na renderização
  useEffect(() => {
    const response = async () => {
      const pegandoRole = await getRole();
      console.log(pegandoRole);
      setDataRole(pegandoRole);
    };

    response();
  }, []);


  // essa função é para filtrar a tabela

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = initialData.filter((item) =>
      item.nome.toLowerCase().includes(value.toLowerCase()) ||
      item.descricao.toString().includes(value) ||
      item.status.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  // FIM ############# lógica filtrar ROle

  // essa função é para abrir e fechar o modal de cadastro de ALM
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };
  // FIM ############# lógica abrir e fechar modal de cadastro 

  // essa função é para clicar no botão de OK dentro do modal de cadastro 
  const handleAdd = () => {
    if (
      cadastro.nome !== '' &&
      cadastro.descricao !== '' &&
      cadastro.status !== ''
    ) {
      return storeRole(cadastro);
    }

    return alert('Preencha todos os campos!');
    // setCadastro({ nome: '', url: '', login: '', senha: '', tipo: '', vpn: '', status: '' });

    // form
    //   .validateFields()
    //   .then((values) => {
    //     form.resetFields();
    //     setIsAddModalVisible(false);
    //     const newItem = {
    //       key: filteredData.length + 1,
    //       ...values,
    //     };
    //     setFilteredData([...filteredData, newItem]);
    //   })
    //   .catch((info) => {
    //     console.log('Validate Failed:', info);
    //   });
  };
  // essa função é para abrir o modal de edição de um item
  const showEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsEditModalVisible(true);
  };
  // essa função é para fechar o modal de edição de um item
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingItem(null);
  };
  //  essa função é para salvar o item editado
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
      })
      .catch((info) => {
        // console.log('Validate Failed:', info);
      });
  };
  // essa função é para deletar um item da tabela
  const handleDelete = (key) => {
    const newData = filteredData.filter((item) => item.key !== key);
    setFilteredData(newData);
  };
  // esse array é para definir as colunas da tabela
  const columns = [
    {
      title: t("Nome"),
      dataIndex: 'nome',
      sorter: (a, b) => a.nome - b.nome,
      width: 200,
    },
    {
      title: t("Descrição"),
      dataIndex: 'descricao',
    
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 50,
      filters: [
        {
          text: 'Ativo',
          value: 'ativo',
        },
        {
          text: 'Inativo',
          value: 'inativo',
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: t("Ação"),
      key: 'acao',
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

    // lógica do switch de status
    const onChangeSwitch = (checked) => {
      setCadastro({ ...cadastro, status: checked });
      checked ? setStatus(false) : setStatus(true);
    };

  return (
    <>
          {/* Container botao e barra de pesquisa */}
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

            {/* FIM ############# Container botao e barra de pesquisa */}


                  {/* Tabela modal */}
      <Table
        {...tableProps}
        pagination={{
          position: ['bottomRight'],
        }}
        columns={columns}
        dataSource={filteredData}
      />

            {/* FIM ############# Tabela modal */}

            {/* Esse modal é para cadastrar um novo item na tabela, apertando o botão de cadastro */}
      <Modal
        title="Cadastrar Novo Item"
        visible={isAddModalVisible}
            // função para fechar o modal de cadastro
        onCancel={handleAddCancel}
                // função para que faz o botão OK do modal de cadastro ser executado
        onOk={handleAdd}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: false, message: 'Por favor, insira o nome!' }]}
          >
            {/*dentro de setCadastro é criado um novo objeto {}, e dentro dele é criado uma cópia do objeto cadastro(está no useState) por meio do rest operator e em seguida é adicionado a propriedade a ser alterada ou criada  */}
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, nome: e.target.value })}
            />


            <Input />
          </Form.Item>
          <Form.Item
          
            name="descricao"
            label="Descrição"
            rules={[{ required: false, message: 'Por favor, insira a descrição!' }]}
          >
            <Input
              type="text"
              required
              onChange={(e) => setDescricao({ ...cadastro, descricao: e.target.value })}
            />

              {/* Aqui entra o Switch */}

          <Form.Item name="statusRole" label="Status" rules={[{ required: false }]}>
            <Switch onChange={() => onChangeSwitch(status)} />
            {status ? <p>Ativo</p> : <p>Inativo</p>}
          </Form.Item>


            {/* <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Por favor, insira o status!' }]}
          >
            <Input /> */}
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
            name="nome"
            label="Nome"
            rules={[{ required: false, message: 'Por favor, insira o nome!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="descricao"
            label="Descrição"
            rules={[{ required: false, message: 'Por favor, insira a descrição!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: false, message: 'Por favor, insira o status!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
            {/* FIM ############# Modal Editar Alm */}
    </>
  );
};





export default TableFunction;