
import { from } from 'rxjs';

// ✅ Service que retorna Observable (não gerencia estado)
export const ProjetoService = (url, method = 'GET', headers = {}, body = null) => {
  
  // Configurar headers padrão
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...headers
  };
  
  // Configurar opções do fetch
  const fetchOptions = {
    method,
    headers: defaultHeaders
  };
  
  // Adicionar body se não for GET
  if (method !== 'GET' && body) {
    fetchOptions.body = JSON.stringify(body);
  }
  
  // Retornar Observable
  return from(
    fetch(url, fetchOptions).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
  );
};



