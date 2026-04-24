import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import dayReadyLogo from '../../imgs/DayReadyLogo.png';
import backgroundImage from '../../imgs/backGroundLogin.png';

export default function RegisterUser() {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState(''); 
  
  const [formData, setFormData] = useState({
    names: '',
    lastNames: '',
    email: '',
    password: '',
    phone: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  // --- PASO 1: Validar correo y enviar código ---
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      setErrors({ email: 'El correo es requerido' });
      return;
    }

    setLoading(true);
    try {
    
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Código enviado a:', formData.email);
      setStep(2); 
    } catch (error) {
      console.error('Error al enviar código:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- PASO 2: Verificar el código ---
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      setErrors({ code: 'Ingresa el código' });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Código verificado:', verificationCode);
      setStep(3);
    } catch (error) {
      console.error('Error al verificar código:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- PASO 3: Registro final ---
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    
    // Validación final
    const newErrors = {};
    if (!formData.names.trim()) newErrors.names = 'Requerido';
    if (!formData.lastNames.trim()) newErrors.lastNames = 'Requerido';
    if (!formData.password) newErrors.password = 'Requerida';
    if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (!formData.phone.trim()) newErrors.phone = 'Requerido';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Usuario registrado con éxito:', formData);
      navigate('/'); 
    } catch (error) {
      console.error('Error al registrarse:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`
      }}
    >
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
          
          <div className="text-center">
            <img src={dayReadyLogo} alt="Day Ready Logo" className="w-64 h-auto mx-auto object-contain" />
          </div>
          
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm font-medium">
              {step === 1 && "Ingresa tu correo para comenzar"}
              {step === 2 && "Ingresa tu código para verificar tu cuenta"}
              {step === 3 && "Ingresa tus datos para finalizar el registro"}
            </p>
          </div>

          {/* ---- INTERFAZ PASO 1 ---- */}
          {step === 1 && (
            <form onSubmit={handleSendCode}>
              <InputField
                label="Correo electrónico"
                type="email"
                placeholder="nombreusuario@ejemplo.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition"
              >
                {loading ? <LoadingSpinner /> : 'Enviar código'}
              </button>
            </form>
          )}

          {/* ---- INTERFAZ PASO 2 ---- */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode}>
              <p className="text-xs text-gray-500 mb-4 text-center">
                Código enviado a <strong>{formData.email}</strong>
              </p>
              <InputField
                label="Código de verificación"
                type="text"
                placeholder="Ej. 123456"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value);
                  setErrors({});
                }}
                error={errors.code}
                required
              />
              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-2/3 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg"
                >
                  {loading ? <LoadingSpinner /> : 'Verificar'}
                </button>
              </div>
            </form>
          )}

          {/* ---- INTERFAZ PASO 3 ---- */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit}>
              <InputField
                label="Nombres"
                type="text"
                name="names"
                placeholder="Ej. David Eduardo"
                value={formData.names}
                onChange={handleChange}
                error={errors.names}
                required
              />
              <InputField
                label="Apellidos"
                type="text"
                name="lastNames"
                placeholder="Ej. Pérez García"
                value={formData.lastNames}
                onChange={handleChange}
                error={errors.lastNames}
                required
              />
              <InputField
                label="Teléfono"
                type="tel"
                name="phone"
                placeholder="Ej. 1234-5678"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
              />
              <InputField
                label="Contraseña"
                type="password"
                name="password"
                placeholder="••••••••"  
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg"
              >
                {loading ? <LoadingSpinner /> : 'Finalizar Registro'}
              </button>
            </form>
          )}

          {step === 1 && (
            <div className="mt-6 text-center">
              <span className="text-gray-600 text-xs">¿Ya tienes cuenta? </span>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-orange-400 hover:text-orange-500 text-xs font-medium"
              >
                Iniciar sesión
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}