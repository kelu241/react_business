// Exemplo: Como usar os modelos no seu Form.jsx

import { 
  UserModel, 
  createUser, 
  validateUser, 
  UserRoles 
} from '../models/User.js';

const FormWithModel = () => {
  // 1. Inicializar com o modelo
  const [formData, setFormData] = useState(UserModel);
  
  // 2. Usar validação do modelo
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateUser(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    // 3. Criar usuário usando factory
    const newUser = createUser(formData);
    console.log('Usuário criado:', newUser);
    
    // 4. Resetar para modelo limpo
    setFormData(UserModel);
  };

  // 5. Usar enums do modelo
  const renderCargoOptions = () => (
    Object.entries(UserRoles).map(([key, value]) => (
      <option key={key} value={value}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </option>
    ))
  );

  return (
    <form onSubmit={handleSubmit}>
      <select name="cargo" value={formData.cargo} onChange={handleChange}>
        <option value="">Selecione um cargo</option>
        {renderCargoOptions()}
      </select>
      {/* resto do formulário */}
    </form>
  );
};