import React, { useState } from 'react';
import { 
  useLocalStorage, 
  useFetch, 
  useCounter, 
  useToggle, 
  useDebounce, 
  useWindowSize,
  useFormValidation 
} from '../hooks/customHooks';

const CustomHooksExample = () => {
  // ===== 1. useLocalStorage =====
  const [name, setName] = useLocalStorage('user-name', '');
  const [preferences, setPreferences] = useLocalStorage('user-preferences', {
    theme: 'light',
    notifications: true
  });

  // ===== 2. useFetch =====
  const { data: users, loading: usersLoading, error: usersError, refetch } = 
    useFetch('https://jsonplaceholder.typicode.com/users?_limit=5');

  // ===== 3. useCounter =====
  const { count, increment, decrement, reset } = useCounter(0, 1);

  // ===== 4. useToggle =====
  const { value: isVisible, toggle, setTrue, setFalse } = useToggle(false);

  // ===== 5. useDebounce =====
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // ===== 6. useWindowSize =====
  const { width, height } = useWindowSize();

  // ===== 7. useFormValidation =====
  const { values, errors, isValid, setValue, validateAll, reset: resetForm } = 
    useFormValidation(
      { email: '', password: '', confirmPassword: '' },
      {
        email: {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Email deve estar em formato válido'
        },
        password: {
          required: true,
          minLength: 6,
          message: 'Senha deve ter pelo menos 6 caracteres'
        },
        confirmPassword: {
          required: true,
          message: 'Confirmação de senha é obrigatória'
        }
      }
    );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) {
      alert('Formulário válido!');
    }
  };

  return (
    <div className="container-xl">
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">
                🛠️ Hooks Customizados
              </h2>
              <p className="text-muted">
                Exemplos práticos de hooks customizados reutilizáveis
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <div className="row">
            {/* LocalStorage Hook */}
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <h4>💾 useLocalStorage</h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Nome (salvo automaticamente):</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Digite seu nome"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Preferências:</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={preferences.notifications}
                        onChange={(e) => setPreferences({
                          ...preferences,
                          notifications: e.target.checked
                        })}
                      />
                      <label className="form-check-label">
                        Receber notificações
                      </label>
                    </div>
                  </div>
                  
                  <div className="alert alert-info">
                    Recarregue a página - os dados persistem!
                  </div>
                </div>
              </div>
            </div>

            {/* Counter Hook */}
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <h4>🔢 useCounter</h4>
                </div>
                <div className="card-body">
                  <div className="text-center mb-3">
                    <h1 className="display-4">{count}</h1>
                  </div>
                  
                  <div className="btn-group w-100">
                    <button className="btn btn-danger" onClick={decrement}>
                      -1
                    </button>
                    <button className="btn btn-secondary" onClick={reset}>
                      Reset
                    </button>
                    <button className="btn btn-success" onClick={increment}>
                      +1
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Toggle Hook */}
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <h4>🔄 useToggle</h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className={`alert ${isVisible ? 'alert-success' : 'alert-secondary'}`}>
                      Status: {isVisible ? 'Visível' : 'Oculto'}
                    </div>
                  </div>
                  
                  <div className="btn-group">
                    <button className="btn btn-primary" onClick={toggle}>
                      Toggle
                    </button>
                    <button className="btn btn-success" onClick={setTrue}>
                      Mostrar
                    </button>
                    <button className="btn btn-outline-secondary" onClick={setFalse}>
                      Ocultar
                    </button>
                  </div>

                  {isVisible && (
                    <div className="alert alert-info mt-3">
                      🎉 Este conteúdo está visível!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Debounce Hook */}
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <h4>⏰ useDebounce</h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Busca com Debounce (500ms):</label>
                    <input
                      type="text"
                      className="form-control"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Digite para buscar..."
                    />
                  </div>
                  
                  <div className="alert alert-light">
                    <strong>Valor atual:</strong> {searchTerm}<br />
                    <strong>Valor com debounce:</strong> {debouncedSearchTerm}
                  </div>
                  
                  <small className="text-muted">
                    O valor com debounce só atualiza após 500ms de inatividade
                  </small>
                </div>
              </div>
            </div>

            {/* Window Size Hook */}
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <h4>📐 useWindowSize</h4>
                </div>
                <div className="card-body">
                  <div className="alert alert-info">
                    <strong>Largura:</strong> {width}px<br />
                    <strong>Altura:</strong> {height}px
                  </div>
                  
                  <div className="progress mb-2">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${Math.min(width / 1920 * 100, 100)}%` }}
                    >
                      Largura relativa
                    </div>
                  </div>
                  
                  <small className="text-muted">
                    Redimensione a janela para ver as mudanças
                  </small>
                </div>
              </div>
            </div>

            {/* Fetch Hook */}
            <div className="col-lg-6 mb-4">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h4>🌐 useFetch</h4>
                  <button className="btn btn-sm btn-outline-primary" onClick={refetch}>
                    Recarregar
                  </button>
                </div>
                <div className="card-body">
                  {usersLoading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                      </div>
                    </div>
                  ) : usersError ? (
                    <div className="alert alert-danger">
                      Erro: {usersError}
                    </div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {users?.map(user => (
                        <div key={user.id} className="list-group-item px-0">
                          <div className="d-flex align-items-center">
                            <div className="avatar bg-primary text-white me-3">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="fw-bold">{user.name}</div>
                              <div className="text-muted">{user.email}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form Validation Hook */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4>✅ useFormValidation</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Email:</label>
                          <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={values.email}
                            onChange={(e) => setValue('email', e.target.value)}
                            placeholder="Digite seu email"
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Senha:</label>
                          <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={values.password}
                            onChange={(e) => setValue('password', e.target.value)}
                            placeholder="Digite sua senha"
                          />
                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Confirmar Senha:</label>
                          <input
                            type="password"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            value={values.confirmPassword}
                            onChange={(e) => setValue('confirmPassword', e.target.value)}
                            placeholder="Confirme sua senha"
                          />
                          {errors.confirmPassword && (
                            <div className="invalid-feedback">
                              {errors.confirmPassword}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between">
                      <div>
                        <button 
                          type="submit" 
                          className={`btn ${isValid ? 'btn-success' : 'btn-outline-primary'}`}
                        >
                          {isValid ? '✅ Válido' : '❌ Inválido'} - Enviar
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-secondary ms-2"
                          onClick={resetForm}
                        >
                          Limpar
                        </button>
                      </div>
                      
                      <div className="alert alert-info mb-0">
                        Status: {isValid ? 'Formulário válido' : 'Preencha os campos corretamente'}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomHooksExample;