import React from 'react';
import { FiClock, FiHome, FiMapPin, FiSearch } from 'react-icons/fi';

import {
  CardRow,
  CompanyInfo,
  Container,
  FilterContainer,
  FilterGroup,
  Hero,
  Input,
  JobCard,
  JobsGrid,
  JobTitle,
  ListingsSection,
  LoadingState,
  PageButton,
  PageWrapper,
  PaginationControls,
  SearchButton,
  Select
} from './styles';
import { useHomeScreen } from './useHomeScreen';
import { HeaderHome } from '../../components/HeaderHome/HeaderHome';

export const HomeScreen: React.FC = () => {
  const {
    jobTypeFilter,
    setJobTypeFilter,
    inputValue,
    setInputValue,
    handleSearch,
    loading,
    error,
    jobs,
    displayedJobs,
    getJobInfo,
    formatDate,
    setCurrentPage,
    currentPage,
    hasNextPage,
    searchTerm
  } = useHomeScreen();

  return (
    <>
      <HeaderHome />
      <PageWrapper>
        <Container>
          <Hero>
            <h1>Vagas incríveis selecionadas para você 🚀</h1>
            <p>Explore oportunidades alinhadas com a sua jornada de aprendizado.</p>
          </Hero>

          <FilterContainer>
            <FilterGroup>
              <label htmlFor="job-type">Tipo de vaga <small>(opcional)</small></label>
              <Select
                id="job-type"
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="remoto">Remoto</option>
                <option value="hibrido">Híbrido</option>
                <option value="presencial">Presencial</option>
              </Select>
            </FilterGroup>
            <FilterGroup>
              <label htmlFor="stacks">Stacks <small>(opcional)</small></label>
              <Input 
                id="stacks" 
                type="text" 
                placeholder="Ex: React, Node.js" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </FilterGroup>
            {/* <FilterGroup>
              <label htmlFor="location">Localização <small>(opcional)</small></label>
              <Select id="location"><option>Ex: Fortaleza</option></Select>
            </FilterGroup> */}
            <SearchButton onClick={handleSearch} disabled={loading}><FiSearch /> Buscar</SearchButton>
          </FilterContainer>

          <ListingsSection>
            <h2>Últimas vagas anunciadas:</h2>
            {loading && <LoadingState>Carregando vagas...</LoadingState>}
            {error && <LoadingState>Ocorreu um erro: {error}</LoadingState>}
            {!loading && !error && jobs.length > 0 && (
              <>
                <JobsGrid>
                  {displayedJobs.map((job) => {
                    const { modality, location } = getJobInfo(job);
                    return (
                      <JobCard key={job.id} href={job.url} target="_blank" rel="noopener noreferrer">
                        <JobTitle>{job.title}</JobTitle>
                        <CardRow><FiClock /> Publicada em {formatDate(job.created_at)}</CardRow>
                        <CardRow><FiHome /> {modality}</CardRow>
                        <CompanyInfo>
                          <img src={job.repository.organization.avatar_url} alt={job.repository.organization.login} />
                          <div className="company-details">
                            <span className="company-name">{job.repository.organization.login}</span>
                            <span className="company-location"><FiMapPin size={12} /> {location}</span>
                          </div>
                        </CompanyInfo>
                      </JobCard>
                    );
                  })}
                </JobsGrid>

                {displayedJobs.length === 0 && (
                  <LoadingState>Nenhuma vaga encontrada com os filtros atuais.</LoadingState>
                )}

                <PaginationControls>
                  <PageButton onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1 || loading}>
                    Anterior
                  </PageButton>
                  <span>Página {currentPage}</span>
                  <PageButton onClick={() => setCurrentPage(p => p + 1)} disabled={!hasNextPage || loading}>
                    Próxima
                  </PageButton>
                </PaginationControls>
              </>
            )}
            {!loading && !error && jobs.length === 0 && (
              <LoadingState>Nenhuma vaga encontrada{searchTerm && ` para "${searchTerm}"`}.</LoadingState>
            )}
          </ListingsSection>
        </Container>
      </PageWrapper>
    </>
  );
};
