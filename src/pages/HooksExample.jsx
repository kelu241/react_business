import React, { useState, useEffect, useContext, useReducer, useMemo, useCallback, useRef } from 'react';

// ===== 1. useState - Gerenciar estado local =====
const EstadoExample = () => {
  // Declara uma variável de estado "count" com valor inicial 0
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [user, setUser] = useState({ nome: '', idade: 0 });

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h4>1. useState - Estado Local</h4>
      </div>
      <div className="card-body">
        {/* Contador simples */}
        <div className="mb-3">
          <p>Contador: <strong>{count}</strong></p>
          <button 
            className="btn btn-primary me-2"
            onClick={() => setCount(count + 1)}
          >
            Incrementar
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setCount(0)}
          >
            Resetar
          </button>
        </div>

        {/* Input de texto */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p className="mt-2">Olá, <strong>{name || 'anônimo'}</strong>!</p>
        </div>

        {/* Objeto complexo */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nome do usuário"
            value={user.nome}
            onChange={(e) => setUser({...user, nome: e.target.value})}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Idade"
            value={user.idade}
            onChange={(e) => setUser({...user, idade: parseInt(e.target.value) || 0})}
          />
          <p>Usuário: {user.nome}, {user.idade} anos</p>
        </div>
      </div>
    </div>
  );
};

// ===== 2. useEffect - Efeitos colaterais =====
const EfeitoExample = () => {
  const [seconds, setSeconds] = useState(0);
  const [data, setData] = useState(null);

  // Efeito que roda apenas uma vez (componentDidMount)
  useEffect(() => {
    console.log('Componente montado!');
    
    // Cleanup (componentWillUnmount)
    return () => {
      console.log('Componente desmontado!');
    };
  }, []); // Array vazio = roda apenas uma vez

  // Efeito que roda quando 'seconds' muda
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup do timer
    return () => clearInterval(timer);
  }, []); // Dependências controlam quando o efeito roda

  // Efeito para buscar dados quando seconds muda
  useEffect(() => {
    if (seconds > 0 && seconds % 5 === 0) {
      // Simula uma API call a cada 5 segundos
      setData(`Dados atualizados em: ${new Date().toLocaleTimeString()}`);
    }
  }, [seconds]); // Roda quando 'seconds' muda

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h4>2. useEffect - Efeitos Colaterais</h4>
      </div>
      <div className="card-body">
        <p>Timer: <strong>{seconds}</strong> segundos</p>
        {data && (
          <div className="alert alert-info">
            {data}
          </div>
        )}
        <small className="text-muted">
          Dados são atualizados automaticamente a cada 5 segundos
        </small>
      </div>
    </div>
  );
};

// ===== 3. useRef - Referências diretas ao DOM =====
const RefExample = () => {
  const inputRef = useRef(null);
  const countRef = useRef(0);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const incrementCounter = () => {
    countRef.current += 1;
    console.log('Count atual (não re-renderiza):', countRef.current);
  };

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h4>3. useRef - Referências DOM</h4>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Este input pode ser focado programaticamente"
          />
          <button 
            className="btn btn-primary mt-2"
            onClick={focusInput}
          >
            Focar Input
          </button>
        </div>
        
        <div>
          <p>Contador interno (não causa re-render): {countRef.current}</p>
          <button 
            className="btn btn-secondary"
            onClick={incrementCounter}
          >
            Incrementar Silenciosamente
          </button>
          <small className="d-block text-muted mt-2">
            Veja o console para o valor atual
          </small>
        </div>
      </div>
    </div>
  );
};

// ===== 4. useMemo - Memoização de valores calculados =====
const MemoExample = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  // Cálculo caro que só roda quando 'count' muda
  const expensiveValue = useMemo(() => {
    console.log('Calculando valor caro...');
    // Simula um cálculo pesado
    let result = 0;
    for (let i = 0; i < count * 1000; i++) {
      result += i;
    }
    return result;
  }, [count]); // Só recalcula quando 'count' muda

  // Lista filtrada memoizada
  const filteredItems = useMemo(() => {
    console.log('Filtrando items...');
    return items.filter(item => item.includes('Item'));
  }, [items]); // Só recalcula quando 'items' muda

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h4>4. useMemo - Memoização</h4>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <p>Count: {count}</p>
          <p>Valor calculado: <strong>{expensiveValue}</strong></p>
          <button 
            className="btn btn-primary"
            onClick={() => setCount(count + 1)}
          >
            Incrementar Count
          </button>
        </div>

        <div>
          <p>Items filtrados: {filteredItems.join(', ')}</p>
          <button 
            className="btn btn-secondary"
            onClick={() => setItems([...items, `Item ${items.length + 1}`])}
          >
            Adicionar Item
          </button>
        </div>
        
        <small className="d-block text-muted mt-2">
          Abra o console para ver quando os cálculos são executados
        </small>
      </div>
    </div>
  );
};

// ===== 5. useCallback - Memoização de funções =====
const CallbackExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Função memoizada que só é recriada quando 'count' muda
  const handleCount = useCallback(() => {
    console.log('Função handleCount executada com count:', count);
    setCount(count + 1);
  }, [count]);

  // Função memoizada independente de state
  const handleReset = useCallback(() => {
    setCount(0);
    setName('');
  }, []); // Nunca é recriada

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h4>5. useCallback - Memoização de Funções</h4>
      </div>
      <div className="card-body">
        <p>Count: {count}</p>
        <p>Name: {name}</p>
        
        <div className="btn-group">
          <button className="btn btn-primary" onClick={handleCount}>
            Incrementar (Callback)
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            Reset (Callback)
          </button>
        </div>
        
        <input
          type="text"
          className="form-control mt-2"
          placeholder="Digite algo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  );
};

// ===== 6. useReducer - Estado complexo =====
const initialState = { count: 0, name: '', loading: false };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'set_name':
      return { ...state, name: action.payload };
    case 'set_loading':
      return { ...state, loading: action.payload };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

const ReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="card mb-3">
      <div className="card-header">
        <h4>6. useReducer - Estado Complexo</h4>
      </div>
      <div className="card-body">
        <p>Count: {state.count}</p>
        <p>Name: {state.name}</p>
        <p>Loading: {state.loading ? 'Sim' : 'Não'}</p>

        <div className="btn-group mb-2">
          <button 
            className="btn btn-success"
            onClick={() => dispatch({ type: 'increment' })}
          >
            +
          </button>
          <button 
            className="btn btn-warning"
            onClick={() => dispatch({ type: 'decrement' })}
          >
            -
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => dispatch({ type: 'reset' })}
          >
            Reset
          </button>
        </div>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Digite um nome"
          value={state.name}
          onChange={(e) => dispatch({ type: 'set_name', payload: e.target.value })}
        />

        <button
          className={`btn ${state.loading ? 'btn-danger' : 'btn-info'}`}
          onClick={() => dispatch({ type: 'set_loading', payload: !state.loading })}
        >
          Toggle Loading
        </button>
      </div>
    </div>
  );
};

// ===== Componente Principal =====
const HooksExample = () => {
  return (
    <div className="container-xl">
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">
                🎣 React Hooks Explicados
              </h2>
              <p className="text-muted">
                Demonstração prática de todos os Hooks principais do React
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <EstadoExample />
          <EfeitoExample />
          <RefExample />
          <MemoExample />
          <CallbackExample />
          <ReducerExample />

          {/* Resumo conceitual */}
          <div className="card">
            <div className="card-header">
              <h4>📚 Resumo dos Hooks</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h5>🎯 Hooks Básicos:</h5>
                  <ul>
                    <li><strong>useState:</strong> Gerencia estado local</li>
                    <li><strong>useEffect:</strong> Efeitos colaterais (API, timers, etc)</li>
                    <li><strong>useContext:</strong> Acessa Context API</li>
                  </ul>
                  
                  <h5>⚡ Hooks de Performance:</h5>
                  <ul>
                    <li><strong>useMemo:</strong> Memoiza valores calculados</li>
                    <li><strong>useCallback:</strong> Memoiza funções</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>🔧 Hooks Avançados:</h5>
                  <ul>
                    <li><strong>useReducer:</strong> Estado complexo (como Redux)</li>
                    <li><strong>useRef:</strong> Referências DOM e valores mutáveis</li>
                    <li><strong>useImperativeHandle:</strong> Controla refs expostos</li>
                    <li><strong>useLayoutEffect:</strong> Efeitos síncronos no DOM</li>
                  </ul>

                  <h5>🎨 Hooks Customizados:</h5>
                  <p className="text-muted">
                    Você pode criar seus próprios hooks combinando hooks existentes!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HooksExample;