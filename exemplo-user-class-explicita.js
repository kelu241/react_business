// Versão com declaração explícita (mais clara)
export class User {
  // Declaração explícita (boa prática)
  id = null;
  nome = '';
  email = '';
  senha = '';
  telefone = '';
  cargo = '';
  ativo = false;
  dataCreated = null;
  dataUpdated = null;

  constructor(data = {}) {
    // Agora fica claro quais atributos a classe tem
    this.id = data.id || Date.now();
    this.nome = data.nome || '';
    this.email = data.email || '';
    this.senha = data.senha || '';
    this.telefone = data.telefone || '';
    this.cargo = data.cargo || '';
    this.ativo = data.ativo !== undefined ? data.ativo : false;
    this.dataCreated = data.dataCreated || new Date().toISOString();
    this.dataUpdated = new Date().toISOString();
  }

  validate() {
    const errors = {};

    if (!this.nome?.trim()) {
      errors.nome = 'Nome é obrigatório';
    }

    if (!this.email?.trim()) {
      errors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(this.email)) {
      errors.email = 'Email inválido';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}