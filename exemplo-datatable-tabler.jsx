// Exemplo: DataTable integrado com Tabler
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';

const TabelaAtividades = () => {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);

  // Colunas da tabela
  const colunas = [
    {
      name: 'Data',
      selector: row => row.data,
      sortable: true,
      width: '120px',
    },
    {
      name: 'Usuário',
      selector: row => row.usuario,
      sortable: true,
    },
    {
      name: 'Ação',
      selector: row => row.acao,
      sortable: true,
      grow: 2,
    },
    {
      name: 'Status',
      cell: row => (
        <span className={`badge ${row.status === 'success' ? 'bg-success' : 'bg-warning'}`}>
          {row.statusTexto}
        </span>
      ),
      width: '120px',
    },
  ];

  // Dados mockados (substitua por API real)
  const dadosMock = [
    {
      id: 1,
      data: '12/11/2025',
      usuario: 'Raquel',
      acao: 'Cadastro de produto',
      status: 'success',
      statusTexto: 'Concluído'
    },
    {
      id: 2,
      data: '12/11/2025',
      usuario: 'Luciano',
      acao: 'Exportação de relatórios',
      status: 'warning',
      statusTexto: 'Processando'
    },
    {
      id: 3,
      data: '11/11/2025',
      usuario: 'Ana',
      acao: 'Login no sistema',
      status: 'success',
      statusTexto: 'Concluído'
    },
    {
      id: 4,
      data: '11/11/2025',
      usuario: 'Carlos',
      acao: 'Atualização de perfil',
      status: 'success',
      statusTexto: 'Concluído'
    },
  ];

  useEffect(() => {
    setLoading(true);
    // Simular carregamento
    setTimeout(() => {
      setDados(dadosMock);
      setLoading(false);
    }, 1000);
  }, []);

  // Estilos customizados para combinar com Tabler
  const estilosCustomizados = {
    table: {
      style: {
        backgroundColor: 'transparent',
      },
    },
    headRow: {
      style: {
        backgroundColor: 'var(--tblr-bg-surface)',
        borderBottomColor: 'var(--tblr-border-color)',
        minHeight: '56px',
      },
    },
    headCells: {
      style: {
        color: 'var(--tblr-body-color)',
        fontSize: '0.875rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.025em',
      },
    },
    rows: {
      style: {
        backgroundColor: 'transparent',
        borderBottomColor: 'var(--tblr-border-color)',
        minHeight: '48px',
        '&:hover': {
          backgroundColor: 'var(--tblr-bg-surface-secondary)',
          cursor: 'pointer',
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: 'var(--tblr-bg-surface)',
        borderTopColor: 'var(--tblr-border-color)',
      },
    },
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Últimas Atividades</h3>
        <div className="card-actions">
          <button className="btn btn-primary btn-sm">
            Exportar
          </button>
        </div>
      </div>
      
      <DataTable
        columns={colunas}
        data={dados}
        customStyles={estilosCustomizados}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        highlightOnHover
        striped
        responsive
        progressPending={loading}
        progressComponent={
          <div className="d-flex justify-content-center p-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        }
        noDataComponent={
          <div className="text-center p-4 text-muted">
            Nenhum dado encontrado
          </div>
        }
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => {
          console.log('Linhas selecionadas:', selectedRows);
        }}
      />
    </div>
  );
};

export default TabelaAtividades;