// Factory function para criar projetos
export const createProjeto = (dados = {}) => ({
  id: dados.id || 0,
  nome: dados.nome || '',
  descricao: dados.descricao || '',
  dataInicio: dados.dataInicio || new Date(),
  dataFim: dados.dataFim || null,
  status: dados.status || 'ativo'
});

