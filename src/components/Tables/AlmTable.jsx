import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { visuallyHidden } from '@mui/utils';

//Função para criar linha de dados
function createData(id, name, description, status) {
  return {
    id,
    name,
    description,
    status,
  };
}

const initialRows = [
  createData(1, 'Cupcake', 'A small cake', 'Available'),
  createData(2, 'Donut', 'A ring-shaped fried cake', 'Out of Stock'),
  createData(3, 'Eclair', 'A pastry filled with cream', 'Available'),
  createData(4, 'Frozen yoghurt', 'A frozen dessert made with yogurt', 'Available'),
  createData(5, 'Gingerbread', 'A cake flavored with ginger', 'Out of Stock'),
  createData(6, 'Honeycomb', 'A dessert made from honey and sugar', 'Available'),
  createData(7, 'Ice cream sandwich', 'Ice cream between two cookies', 'Out of Stock'),
  createData(8, 'Jelly Bean', 'A small bean-shaped candy', 'Available'),
  createData(9, 'KitKat', 'A chocolate-covered wafer bar', 'Available'),
  createData(10, 'Lollipop', 'A hard candy on a stick', 'Out of Stock'),
  createData(11, 'Marshmallow', 'A soft, chewy candy', 'Available'),
  createData(12, 'Nougat', 'A sweet made from sugar and nuts', 'Out of Stock'),
  createData(13, 'Oreo', 'A chocolate cookie with cream filling', 'Available'),
];

// Função para comparar dois elementos e ordená-los em ordem descendente
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Função para obter o comparador correto com base na ordem e na coluna
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Função para ordenar um array de forma estável
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Definição das colunas da tabela
const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nome',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: false,
    label: 'Tipo',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Ação',
  },
];

// Componente para a cabeçalho da tabela
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// Componente para a barra de ferramentas da tabela
function EnhancedTableToolbar(props) {
  const { numSelected, onAddItem, filterText, onFilterTextChange } = props;

  return (
    <Toolbar
      sx={{
        background: "linear-gradient(to bottom, #2d939c, #68C7CF)",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <TextField
          sx={{ flex: '1 1 100%' }}
          variant="outlined"
          size="small"
          placeholder="Search…"
          value={filterText}
          onChange={onFilterTextChange}
          InputProps={{
            startAdornment: <FilterListIcon sx={{ mr: 1 }} />,
            style: { backgroundColor: 'white' },
          }}
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
      <Button variant="contained" onClick={onAddItem} style={{backgroundColor:"#2D939C", border: "2px solid black", width: "10%", height:"50px"}}>
        Adicionar Item
      </Button>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onAddItem: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
};

// Componente principal da tabela
export default function AlmTable() {
  const [order, setOrder] = React.useState('asc'); // Estado para armazenar a ordem de classificação
  const [orderBy, setOrderBy] = React.useState('name'); // Estado para armazenar a coluna a ser classificada
  const [selected, setSelected] = React.useState([]); // Estado para armazenar as linhas selecionadas
  const [page, setPage] = React.useState(0); // Estado para armazenar a página atual
  const [dense, setDense] = React.useState(false); // Estado para controle da densidade da tabela
  const [rowsPerPage, setRowsPerPage] = React.useState(10); // Estado para armazenar o número de linhas por página
  const [rows, setRows] = React.useState(initialRows); // Estado para armazenar os dados da tabela
  const [open, setOpen] = React.useState(false); // Estado para controlar a abertura do modal de adição de item
  const [editOpen, setEditOpen] = React.useState(false); // Estado para controlar a abertura do modal de edição de item
  const [newItem, setNewItem] = React.useState({ // Estado para armazenar os dados do novo item a ser adicionado
    id: initialRows.length + 1,
    name: '',
    status: '',
    type: '',
  });
  const [editItem, setEditItem] = React.useState({
    // Estado para armazenar os dados do item em edição
    id: '',
    name: '',
    status: '',
    type: '',
  });
  const [filterText, setFilterText] = React.useState('');// Estado para armazenar o texto de filtro

  // Função para lidar com a solicitação de classificação de coluna

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Função para lidar com o clique na seleção de todas as linhas
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // Função para lidar com o clique em uma linha
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  // Função para lidar com a mudança de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Função para lidar com a mudança do número de linhas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Função para lidar com a mudança da densidade da tabela
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Função para abrir o modal de adição de item
  const handleAddItem = () => {
    setNewItem({
      id: rows.length + 1,
      name: '',
      status: '',
      type: '',
    });
    setOpen(true);
  };

   // Função para abrir o modal de edição de item
  const handleEditItem = (row) => {
    setEditItem(row);
    setEditOpen(true);
  };

  // Função para salvar um novo item adicionado
  const handleSaveItem = () => {
    setRows([...rows, newItem]);
    setOpen(false);
  };

  // Função para salvar um item editado
  const handleSaveEditItem = () => {
    const updatedRows = rows.map((row) =>
      row.id === editItem.id ? editItem : row
    );
    setRows(updatedRows);
    setEditOpen(false);
  };

  // Função para cancelar a edição de um item
  const handleCancelEdit = () => {
    setEditOpen(false);
  };

   // Função para lidar com a exclusão de itens selecionados
  const handleDeleteItems = () => {
    const updatedRows = rows.filter((row) => !selected.includes(row.name));
    setRows(updatedRows);
    setSelected([]);
  };

  // Função para fechar o modal de adição de item
  const handleClose = () => {
    setOpen(false);
  };

  // Função para lidar com a mudança no texto de filtro
  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  // Filtragem das linhas com base no texto de filtro
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(filterText.toLowerCase())
  );

  // Cálculo do número de linhas vazias a serem exibidas
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

     // Função para verificar se uma linha está selecionada
  const isSelected = (name) => selected.indexOf(name) !== -1;

   // Ordenação e paginação das linhas visiveis
  const visibleRows = stableSort(filteredRows, getComparator(order, orderBy))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onAddItem={handleAddItem}
          filterText={filterText}
          onFilterTextChange={handleFilterTextChange}
        
        />
        <TableContainer sx={{ maxHeight: "60vh"}}>
          <Table
            stickyHeader
            sx={{ minWidth: { xs: '100%', sm: 400, md: 750 } }}
            aria-labelledby="tableTitle"
            size={dense ? 'medium' : 'small'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditItem(row)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={handleDeleteItems}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
         style={{background: "linear-gradient(to bottom, #2d939c, #68C7CF)"}}
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />

      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Add New Item
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={newItem.name}
            onChange={(e) =>
              setNewItem({ ...newItem, name: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Status"
            value={newItem.status}
            onChange={(e) =>
              setNewItem({ ...newItem, status: e.target.value })
            }
          />
          <Button
            variant="contained"
            onClick={handleSaveItem}
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      <Modal open={editOpen} onClose={handleCancelEdit}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Item
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            value={editItem.name}
            onChange={(e) =>
              setEditItem({ ...editItem, name: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            value={editItem.description}
            onChange={(e) =>
              setEditItem({ ...editItem, description: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Status"
            value={editItem.status}
            onChange={(e) =>
              setEditItem({ ...editItem, status: e.target.value })
            }
          />
          <Button
            variant="contained"
            onClick={handleSaveEditItem}
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
