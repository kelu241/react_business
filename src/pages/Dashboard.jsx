export default function Dashboard() {
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
            <div className="card-table table-responsive">
              <table className="table table-vcenter">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Usuário</th>
                    <th>Ação</th>
                    <th className="w-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>12/11/2025</td>
                    <td>Raquel</td>
                    <td>Cadastro de produto</td>
                    <td>
                      <span className="badge bg-success me-1"></span>
                      Concluído
                    </td>
                  </tr>
                  <tr>
                    <td>12/11/2025</td>
                    <td>Luciano</td>
                    <td>Exportação de relatórios</td>
                    <td>
                      <span className="badge bg-warning me-1"></span>
                      Processando
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}