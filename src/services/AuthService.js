// Utilitário para gerenciar autenticação
export const AuthService = {
  
  // Fazer login e salvar token
  async login(email, password) {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.token) {
        // ✅ Salvar token - interceptor pegará automaticamente
        localStorage.setItem('authToken', data.token);
        console.log('🔐 Token salvo - todas as requisições terão Authorization header');
        return data;
      }
      
      throw new Error('Token não recebido');
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  },
  
  // Logout
  logout() {
    // ✅ Remover token - interceptor parará de adicionar header
    localStorage.removeItem('authToken');
    console.log('🚪 Token removido - requisições sem Authorization');
    window.location.href = '/login';
  },
  
  // Verificar se está logado
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },
  
  // Pegar token atual
  getToken() {
    return localStorage.getItem('authToken');
  }
};