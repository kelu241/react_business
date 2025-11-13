export default function SalesReports() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Relatórios de Vendas</h3>
      </div>
      <div className="card-body">
        <p>Análise detalhada das vendas e performance.</p>
        
        <div className="row mb-3">
          <div className="col-sm-6 col-lg-3">
            <div className="card">
              <div className="card-body">
                <div className="subheader">Vendas Mensais</div>
                <div className="h2 mb-3">R$ 45.280</div>
                <div className="text-success">+12% vs mês anterior</div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="card">
              <div className="card-body">
                <div className="subheader">Produtos Vendidos</div>
                <div className="h2 mb-3">1.247</div>
                <div className="text-info">+5% vs mês anterior</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="alert alert-warning">
          <strong>Nota:</strong> Dados atualizados em tempo real.
        </div>
      </div>
    </div>
  );
}