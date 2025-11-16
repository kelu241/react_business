// Modelo de Usuário - JavaScript (sem TypeScript)

// 1. Estrutura básica do objeto
export const UserModel = {
  id: null,
  nome: '',
  email: '',
  senha: '',
  telefone: '',
  cargo: '',
  ativo: false,
  dataCreated: null,
  dataUpdated: null
};

// 2. Factory function para criar novos usuários
export const createUser = (data = {}) => ({
  ...UserModel,
  ...data,
  id: data.id || Date.now(), // ID simples
  dataCreated: data.dataCreated || new Date().toISOString(),
  dataUpdated: new Date().toISOString()
});

// 3. Validação do usuário
export const validateUser = (user) => {
  const errors = {};

  if (!user.nome?.trim()) {
    errors.nome = 'Nome é obrigatório';
  }

  if (!user.email?.trim()) {
    errors.email = 'Email é obrigatório';
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = 'Email inválido';
  }

  if (!user.senha || user.senha.length < 6) {
    errors.senha = 'Senha deve ter pelo menos 6 caracteres';
  }

  if (!user.telefone?.trim()) {
    errors.telefone = 'Telefone é obrigatório';
  }

  if (!user.cargo?.trim()) {
    errors.cargo = 'Cargo é obrigatório';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// 4. Transformações úteis
export const userToDisplayName = (user) => {
  return `${user.nome} (${user.email})`;
};

export const userToSelectOption = (user) => ({
  value: user.id,
  label: userToDisplayName(user)
});

// 5. Status do usuário
export const UserStatus = {
  ACTIVE: 'ativo',
  INACTIVE: 'inativo',
  PENDING: 'pendente'
};

// 6. Cargos disponíveis
export const UserRoles = {
  DEVELOPER: 'desenvolvedor',
  DESIGNER: 'designer',
  MANAGER: 'gerente',
  ANALYST: 'analista'
};