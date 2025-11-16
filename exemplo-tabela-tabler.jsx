// Exemplo: componente de tabela avançada com Tabler
import { useState } from 'react';

const TabelaAvancada = ({ dados }) => {
  const [ordenacao, setOrdenacao] = useState({ campo: null, direcao: 'asc' });
  const [filtro, setFiltro] = useState('');

  const ordenarDados = (campo) => {
    const direcao = ordenacao.campo === campo && ordenacao.direcao === 'asc' ? 'desc' : 'asc';
    setOrdenacao({ campo, direcao });
  };

  const dadosFiltrados = dados
    .filter(item => 
      Object.values(item).some(valor => 
        valor.toString().toLowerCase().includes(filtro.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!ordenacao.campo) return 0;
      
      const valorA = a[ordenacao.campo];
      const valorB = b[ordenacao.campo];
      
      if (ordenacao.direcao === 'asc') {
        return valorA > valorB ? 1 : -1;
      } else {
        return valorA < valorB ? 1 : -1;
      }
    });

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Dados</h3>
        <div className="card-actions">
          <input
            type="text"
            className="form-control"
            placeholder="Filtrar..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
      </div>
      
      <div className="card-table table-responsive">
        <table className="table table-vcenter">
          <thead>
            <tr>
              <th 
                className="cursor-pointer" 
                onClick={() => ordenarDados('data')}
              >
                Data 
                {ordenacao.campo === 'data' && (
                  <span className="ms-1">
                    {ordenacao.direcao === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th 
                className="cursor-pointer" 
                onClick={() => ordenarDados('usuario')}
              >
                Usuário
                {ordenacao.campo === 'usuario' && (
                  <span className="ms-1">
                    {ordenacao.direcao === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th>Ação</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.map(item => (
              <tr key={item.id}>
                <td>{item.data}</td>
                <td>{item.usuario}</td>
                <td>{item.acao}</td>
                <td>
                  <span className={`badge ${item.status === 'success' ? 'bg-success' : 'bg-warning'}`}>
                    {item.statusTexto}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaAvancada;