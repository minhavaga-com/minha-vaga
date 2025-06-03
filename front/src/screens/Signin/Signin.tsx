import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

// interface AuthContextType {
//   signIn: (email: string, password: string) => Promise<void>;
// }

// interface AppError extends Error {
//   message: string;
// }

interface SignInProps {}

export const SignIn: React.FC<SignInProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();
  
  // const { signIn } = useAuth() as AuthContextType;
  // const toast = useToast();

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const handleNewAccount = (): void => {
    navigate('/signup');
  };

  const handleSignIn = async ({ email, password }: FormData): Promise<void> => {
    try {
      setIsLoading(true);
      await signIn(email, password);
      
    } catch (error) {
      const isAppError = error instanceof Error;
      const genericMessage = 'Não foi possível entrar. Tente novamente mais tarde.';
      
      const title = isAppError ? error.message : genericMessage;
      setIsLoading(false);
      
      // toast.show({
      //   title,
      //   type: 'error'
      // });
      console.error(title);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 px-10 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/assets/background.png')` }}
          aria-label="Pessoas treinando em bicicletas na academia"
        />
        
        <div className="flex flex-col items-center my-24">
          <img src="/assets/logo.svg" alt="Logo" className="mb-4" />
          <p className="text-gray-100 text-sm">
            Treine sua mente e o seu corpo
          </p>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-gray-100 text-xl mb-6 font-heading">
            Acesse sua conta
          </h1>

          <form onSubmit={handleSubmit(handleSignIn)} className="w-full max-w-md">
            <Controller
              control={control}
              name="email"
              rules={{ required: 'Informe o e-mail' }}
              render={({ field: { onChange, value } }) => (
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="E-mail"
                    autoCapitalize="none"
                    value={value || ''}
                    onChange={onChange}
                    className="w-full p-3 border rounded-md"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                  )}
                </div>
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{ required: 'Informe a senha' }}
              render={({ field: { onChange, value } }) => (
                <div className="mb-6">
                  <input
                    type="password"
                    placeholder="Senha"
                    autoCapitalize="none"
                    value={value || ''}
                    onChange={onChange}
                    className="w-full p-3 border rounded-md"
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm">{errors.password.message}</span>
                  )}
                </div>
              )}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Carregando...' : 'Acessar'}
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center mt-24">
          <p className="text-gray-100 text-sm mb-3">
            Ainda não tem acesso?
          </p>
          <button
            onClick={handleNewAccount}
            className="border border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-gray-900 transition-colors"
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
};