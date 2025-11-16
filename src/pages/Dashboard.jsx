import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import { ProjetoService } from '../services/ProjetoService';    

const Dashboard = () => {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  // ✅ useEffect com cleanup para evitar vazamento
  useEffect(() => {
    setLoading(true);
    
    // Criar Observable
    const testeApi = ProjetoService(
      'https://jsonplaceholder.typicode.com/posts', 
      'GET', 
      {'Content-Type': 'application/json'}, 
      null
    );

    // Subscribe com referência para cleanup
    const subscription = testeApi.subscribe({
      next: (data) => {
        console.log('Dados da API:', data);
        setApiData(data);
        setLoading(false);
      },
      error: (err) => {
        console.error('Erro na API:', err);
        setLoading(false);
      }
    });

    // ✅ CLEANUP - MUITO IMPORTANTE!
    return () => {
      subscription.unsubscribe();
      console.log('Observable desconectado - sem vazamento!');
    };
  }, []); // ← Array vazio = executa só uma vez

  // Dados das atividades
  const dadosAtividades = [
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
      data: '10/11/2025',
      usuario: 'Carlos',
      acao: 'Atualização de perfil',
      status: 'success',
      statusTexto: 'Concluído'
    },
  ];

  // Configuração das colunas
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
      width: '150px',
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

  // Estilos para combinar com Tabler
  const estilosTabler = {
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
        },
      },
    },
  };

  // Simular carregamento dos dados
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAtividades(dadosAtividades);
      setLoading(false);
    }, 500);
  }, []);
  return (
    <>
      {/* Row para as métricas */}
      <div className="row mb-4">
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="subheader">Vendas (Hoje)</div>
              <div className="h1 mb-3">R$ 3.240</div>
              <div className="d-flex align-items-center">
                <div className="text-green me-2">+8%</div>
                <small className="text-muted">vs ontem</small>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="subheader">Usuários ativos</div>
              <div className="h1 mb-3">1.287</div>
              <div className="d-flex align-items-center">
                <div className="text-red me-2">-2%</div>
                <small className="text-muted">vs semana passada</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row para a tabela */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Últimas atividades</h3>
            </div>
            <DataTable
              columns={colunas}
              data={atividades}
              customStyles={estilosTabler}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 15]}
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
                  Nenhuma atividade encontrada
                </div>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;