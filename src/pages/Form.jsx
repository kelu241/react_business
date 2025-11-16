import { useState } from 'react';

const Form = () => {
  // Estado para os campos do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    cargo: '',
    ativo: false
  });

  // Estado para erros de validação
  const [errors, setErrors] = useState({});

  // Estado para loading
  const [loading, setLoading] = useState(false);

  // Função para atualizar campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpar erro quando o usuário digita
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validação dos campos
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório';
    }

    if (!formData.cargo.trim()) {
      newErrors.cargo = 'Cargo é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Dados enviados:', formData);
      alert('Usuário cadastrado com sucesso!');
      
      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        cargo: '',
        ativo: false
      });
    } catch (error) {
      alert('Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Cadastro de Usuário</h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="row">
            {/* Nome */}
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Nome completo</label>
                <input
                  type="text"
                  name="nome"
                  className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite o nome completo"
                />
                {errors.nome && (
                  <div className="invalid-feedback">{errors.nome}</div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Digite o email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>

            {/* Senha */}
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  name="senha"
                  className={`form-control ${errors.senha ? 'is-invalid' : ''}`}
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Digite a senha"
                />
                {errors.senha && (
                  <div className="invalid-feedback">{errors.senha}</div>
                )}
              </div>
            </div>

            {/* Telefone */}
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                />
                {errors.telefone && (
                  <div className="invalid-feedback">{errors.telefone}</div>
                )}
              </div>
            </div>

            {/* Cargo */}
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Cargo</label>
                <select
                  name="cargo"
                  className={`form-select ${errors.cargo ? 'is-invalid' : ''}`}
                  value={formData.cargo}
                  onChange={handleChange}
                >
                  <option value="">Selecione um cargo</option>
                  <option value="desenvolvedor">Desenvolvedor</option>
                  <option value="designer">Designer</option>
                  <option value="gerente">Gerente</option>
                  <option value="analista">Analista</option>
                </select>
                {errors.cargo && (
                  <div className="invalid-feedback">{errors.cargo}</div>
                )}
              </div>
            </div>

            {/* Ativo */}
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-check">
                  <input
                    type="checkbox"
                    name="ativo"
                    className="form-check-input"
                    checked={formData.ativo}
                    onChange={handleChange}
                  />
                  <span className="form-check-label">Usuário ativo</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer text-end">
          <button 
            type="button" 
            className="btn btn-secondary me-2"
            onClick={() => setFormData({
              nome: '',
              email: '',
              senha: '',
              telefone: '',
              cargo: '',
              ativo: false
            })}
          >
            Limpar
          </button>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Salvando...
              </>
            ) : (
              'Salvar Usuário'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;