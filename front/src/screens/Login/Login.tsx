import { useState, type FC, type FormEvent } from "react";
import {
  ActionButton,
  CheckboxWrapper,
  Column,
  ContentGrid,
  DescriptionText,
  ForgotPasswordLink,
  Input,
  InputGroup,
  Label,
  LoginForm,
  MainTitle,
  OptionsRow,
  PageWrapper,
  Subheading
} from "./styles";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";

export const LoginScreen: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log({
      email,
      password,
      rememberMe,
    });
    alert('Tentativa de login enviada!');
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <MainTitle>Login / Registro</MainTitle>
        
        <ContentGrid>
          <Column>
            <Subheading>Entrar</Subheading>
            <LoginForm onSubmit={handleLoginSubmit}>
              <InputGroup>
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
              
              <InputGroup>
                <Label htmlFor="password">Senha</Label>
                <Input 
                  type="password" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>

              <OptionsRow>
                <CheckboxWrapper onClick={() => setRememberMe(!rememberMe)}>
                  <input 
                    type="checkbox" 
                    id="remember-me" 
                    checked={rememberMe}
                    readOnly
                  />
                  <label htmlFor="remember-me">Lembre-me</label>
                </CheckboxWrapper>
                <ForgotPasswordLink href="#">Perdeu sua senha?</ForgotPasswordLink>
              </OptionsRow>
              
              <ActionButton as={Link} to="/home" type="submit">Acessar Conta</ActionButton>
            </LoginForm>
          </Column>

          <Column>
            <Subheading>Registre-se</Subheading>
            <DescriptionText>
              Se você ainda não possui uma conta, escolha um plano do MinhaVaga e preencha o cadastro para ter acesso a vagas exclusivas e ferramentas para impulsionar sua carreira.
            </DescriptionText>
            <ActionButton as={Link} to="/planos">
              Escolher Plano
            </ActionButton>
          </Column>
        </ContentGrid>
      </PageWrapper>
    </>
  );
};