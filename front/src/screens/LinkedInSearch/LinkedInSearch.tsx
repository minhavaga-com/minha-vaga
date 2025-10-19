import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  FormContainer,
  Title,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  ButtonGroup,
  Alert,
  BackButton
} from './styles';

interface DeveloperFormValues {
  tab: 'jobs' | 'content';
  tech: string;
  seniority?: string;
  skip?: number;
  exclude?: string;
}

const seniorityMap: Record<string, string> = {
  'Estágio': '1',
  'Junior': '2',
  'Pleno': '3,4',
  'Senior': '5,6',
};

export const LinkedInSearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState<string | null>(null);
  
  const { handleSubmit, control, watch, reset } = useForm<DeveloperFormValues>({
    defaultValues: {
      tab: 'jobs',
      tech: '',
      seniority: 'Junior',
      skip: 0,
      exclude: '',
    },
  });

  const values = watch();

  const onSubmit = (data: DeveloperFormValues) => {
    let url = '';
    
    if (data.tab === 'jobs') {
      const keywords = data.exclude 
        ? `${data.tech} NOT (${data.exclude})`
        : data.tech;
      
      const experienceLevel = data.seniority ? seniorityMap[data.seniority] : '';
      const skipValue = data.skip || 0;
      
      url = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keywords)}&location=Brasil&f_AL=true${
        experienceLevel ? `&f_E=${experienceLevel}` : ''
      }&start=${skipValue}`;
    } else {
      const keywords = data.exclude 
        ? `${data.tech} NOT (${data.exclude})`
        : data.tech;
      
      url = `https://www.linkedin.com/search/results/content/?keywords=${encodeURIComponent(keywords)}`;
    }

    setSearchResult(url);
    window.open(url, '_blank');
  };

  const handleClear = () => {
    reset({
      tab: values.tab,
      tech: '',
      seniority: 'Junior',
      skip: 0,
      exclude: '',
    });
    setSearchResult(null);
  };

  const isFormFilled = values.tab && values.tech?.trim() && values.skip !== undefined;

  return (
    <Container>
      <FormContainer>
        <BackButton onClick={() => navigate(-1)}>
          ← Voltar
        </BackButton>
        <Title>🔎 Filtrar Vagas no LinkedIn</Title>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <Label>Buscar em:</Label>
            <Controller
              name="tab"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  <option value="jobs">Vagas</option>
                  <option value="content">Publicações</option>
                </Select>
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label>Tecnologia *</Label>
            <Controller
              name="tech"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="React, QA, Frontend..."
                  required
                />
              )}
            />
          </FormGroup>

          <FormGroup>
            <Label>Excluir palavras-chave</Label>
            <Controller
              name="exclude"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Ex: estágio, júnior"
                />
              )}
            />
          </FormGroup>

          {values.tab === 'jobs' && (
            <>
              <FormGroup>
                <Label>Senioridade:</Label>
                <Controller
                  name="seniority"
                  control={control}
                  render={({ field }) => (
                    <Select {...field}>
                      <option value="Estágio">Estágio</option>
                      <option value="Junior">Junior</option>
                      <option value="Pleno">Pleno</option>
                      <option value="Senior">Senior</option>
                    </Select>
                  )}
                />
              </FormGroup>

              <FormGroup>
                <Label>Página de Pesquisa</Label>
                <Controller
                  name="skip"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="0"
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  )}
                />
              </FormGroup>
            </>
          )}

          <ButtonGroup>
            <Button type="button" onClick={handleClear} variant="secondary">
              Limpar Filtros
            </Button>
            <Button type="submit" variant="primary" disabled={!isFormFilled}>
              Buscar no LinkedIn
            </Button>
          </ButtonGroup>
        </form>

        {searchResult && (
          <Alert>
            🎉 Pesquisa aberta em nova aba do LinkedIn!
          </Alert>
        )}
      </FormContainer>
    </Container>
  );
};


