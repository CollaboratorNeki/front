import React, { useState, useEffect } from 'react';
import { storeAlm, getAlm, updateAlm } from '../../services/almService';
import {
  Space,
  Table,
  Grid,
  Input,
  Button,
  Modal,
  Form,
  InputNumber,
  Popconfirm,
  Switch,
} from 'antd';
import './Table.css';
import { deleteAlm } from '../../services/almService';

const { useBreakpoint } = Grid;
const { Search } = Input;

// const initialData = [];

const defaultTitle = () => 'Alm';
const defaultFooter = () => 'footer';

// Componente de tabela

const TableAlm = () => {
  const screens = useBreakpoint();
  const isSmallScreen = screens.xs; // Consider xs as small screen
  const [searchText, setSearchText] = useState('');
  //usando esse use state para guardar os dados da listagem da tabela
  const [filteredData, setFilteredData] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  //useState que pega os valores atualizados do formulário e guarda em uma variável
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const [cadastro, setCadastro] = useState({
    nome: '',
    url: '',
    login: '',
    senha: '',
    tipo: '',
    vpn: '',
    status: '',
  });
  const [status, setStatus] = useState(false);
  // const [dataAlm, setDataAlm] = useState([]);

  // Chamando os dados do banco e guardando em um useState para poder usar na lista, é preciso usar useEffect para não criar o erro do loop infinito na renderização
  useEffect(() => {
    const response = async () => {
      const dadosAlm = await getAlm();
      const setDadosAlm = dadosAlm?.map((item) => ({
        idAlmTool: item.idAlmTool,
        nome: item.nome,
        url: item.url,
        login: item.login,
        senha: item.senha,
        tipo: item.tipo,
        vpn: item.vpn,
        status: item.status,
      }));
      // console.log(setDadosAlm);
      // setDataAlm(setDadosAlm);
      setFilteredData(setDadosAlm);
    };

    response();
  }, []);

  // essa função é para utilizar a barra de pesquisa
  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = initialData.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.age.toString().includes(value) ||
        item.address.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredData(filtered);
  };
  // FIM ############# lógica filtrar ALM

  // essa função é para abrir e fechar o modal de cadastro de ALM
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };
  // FIM ############# lógica abrir e fechar modal de cadastro de ALM

  // essa função é para clicar no botão de OK dentro do modal de cadastrar
  const handleAdd = () => {
    if (
      cadastro.nome !== '' &&
      cadastro.url !== '' &&
      cadastro.login !== '' &&
      cadastro.senha !== '' &&
      cadastro.tipo !== '' &&
      cadastro.vpn !== '' &&
      cadastro.status !== ''
    ) {
      return storeAlm(cadastro);
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

  // essa função é para abrir o modal de edição da coluna ação e é passado no parametro (item) os dados do input do formulário de edição

  const showEditModal = (item) => {
    console.log('Dados que estão renderizados na linha da tabela showEditModal', item);
    setEditingItem(item);

    // o parametro (item) aqui é passado para jogar os dados do input do formulário de edição na função handleEdit, no handleEdit o parametro values são os dados do formulário
    form.setFieldsValue(item);
    setIsEditModalVisible(true);
  };
  // essa função é para fechar o modal de edição de um item
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingItem(null);
  };

  //  essa função é para editar utilizando a coluna ação

  const handleEdit = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log('Dados do formulário parametro values', values);
        console.log('dados editingItem', editingItem);
        console.log('dados filteredData', filteredData);
        const idEditingItem = editingItem.idAlmTool;
        console.log(idEditingItem, 'id item separado');
        //parametro values são os dados do formulário, e o método validateFields é responsável por validar os dados
        form.resetFields();
        setIsEditModalVisible(false);

        const updatedData = filteredData.map((item) =>
          item.idAlmTool === editingItem.idAlmTool ? { ...item, ...values } : item,
        );

        const filtro = updatedData.filter((item) => item.idAlmTool === idEditingItem);
        // console.log(filtro, 'filtro');
        // console.log(filtro[0]);

        console.log(updatedData, 'Dados da variavel updatedData');
        setFilteredData(updatedData);
        const response = await updateAlm(idEditingItem, filtro[0]);
        setEditingItem(null);
        console.log(filteredData, 'Dados do filteredData');
        // console.log(filteredData)
        // const atualizarAlm = await updateAlm(editingItem.id,filteredData); //esse método é responsável por atualizar o item no banco de dados
        // console.log(atualizarAlm);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  // essa função é para deletar um item da tabela usando o botão de deletar da coluna ação
  const handleDelete = async (record) => {
    console.log(record.idAlmTool);
    try {
      const response = await deleteAlm(record.idAlmTool);
    } catch (error) {
      console.log(error);
    }

    // setFilteredData(newData);
  };

  // esse array é para definir as colunas da tabela
  const columns = [
    {
      title: 'Id',
      dataIndex: 'idAlmTool',
      key: 'idAlmTool',
      sorter: (a, b) => a.idAlmTool - b.idAlmTool, //método para ordenar a coluna id
      width: 50,
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nomeAlm',
      width: 150,
    },
    // {
    //   title: 'Age trocar',
    //   dataIndex: 'age',
    //   sorter: (a, b) => a.age - b.age,
    //   width: 80,
    // },
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'loginAlm',
      width: 150,
    },
    {
      title: 'Senha',
      dataIndex: 'senha',
      key: 'senhaAlm',
      width: 150,
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipoAlm',
      width: 150,
    },
    {
      title: 'Vpn',
      dataIndex: 'vpn',
      key: 'vpnAlm',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 150,
      key: 'statusAlm',
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

    // const [filteredData, setFilteredData] = useState([]);
    /*
              id: item.idAlmTool,
              nome: item.nome,
              url: item.url,
              login: item.login,
              senha: item.senha,
              tipo: item.tipo,
              vpn: item.vpn,
              status: item.status,'

    */

    // pop up para deletar o item pelo botão editar
    {
      title: 'Ação',
      key: 'acao',
      width: 150,
      // o parametro record é a linha da tabela e os dados correspondentes
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}>Editar</Button>
          <Popconfirm
            title="Deseja deletar?"
            onConfirm={() => {
              handleDelete(record);
            }}
          >
            <a>Deletar</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // lógica do switch de status
  const onChangeSwitch = (checked) => {
    setCadastro({ ...cadastro, status: checked });
    checked ? setStatus(false) : setStatus(true);
  };

  // Variável que define estilo da tabela principal
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
      {/* Container botao e barra de pesquisa */}
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Buscar nome do projeto..."
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

      {/* FIM ############# Container botao e barra de pesquisa */}

      {/* Definição da tabela principal */}
      <Table
        {...tableProps}
        pagination={{
          position: ['bottomRight'],
        }}
        columns={columns}
        dataSource={filteredData}
      />
      {/* FIM ############# Tabela principal */}

      {/* Esse modal é para cadastrar um novo item na tabela, apertando o botão de cadastro */}
      <Modal
        title="Cadastrar Novo ALM"
        visible={isAddModalVisible}
        // função para fechar o modal de cadastro
        onCancel={handleAddCancel}
        // função para que faz o botão OK do modal de cadastro ser executado
        onOk={handleAdd}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="nameAlm"
            label="Nome"
            rules={[{ required: true, message: 'Coloque o nome por favor!' }]}
          >
            {/*dentro de setCadastro é criado um novo objeto {}, e dentro dele é criado uma cópia do objeto cadastro(está no useState) por meio do rest operator e em seguida é adicionado a propriedade a ser alterada ou criada  */}
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
            <Input
              type="text"
              required
              onChange={(e) => setCadastro({ ...cadastro, senha: e.target.value })}
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

          {/* Aqui entra o Switch */}

          <Form.Item name="statusAlm" label="Status" rules={[{ required: true }]}>
            <Switch onChange={() => onChangeSwitch(status)} />
            {status ? <p>Ativo</p> : <p>Inativo</p>}
          </Form.Item>
        </Form>
      </Modal>
      {/* FIM ############# Modal Cadastrar Alm */}

      {/* Esse modal é para editar um item na tabela pelo botão de editar */}

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
            {/*dentro de setCadastro é criado um novo objeto {}, e dentro dele é criado uma cópia do objeto cadastro(está no useState) por meio do rest operator e em seguida é adicionado a propriedade a ser alterada ou criada  */}
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

          {/* Aqui entra o Switch */}

          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Switch onChange={() => onChangeSwitch(status)} />
            {status ? <p>Ativo</p> : <p>Inativo</p>}
          </Form.Item>
        </Form>
      </Modal>
      {/* FIM ############# Modal Editar Alm */}
    </>
  );
};

export default TableAlm;
