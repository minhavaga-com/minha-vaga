import React from 'react';
import { FiBriefcase } from 'react-icons/fi';
import { HeaderHome } from '../../components/HeaderHome/HeaderHome';
import {
  Container,
  PageWrapper,
  Hero,
  CompaniesSection,
  CompaniesGrid,
  CompanyCard,
  CompanyLogo,
  CompanyName,
  CompanyStats,
  StatRow,
  LoadingState,
  PaginationControls,
  PageButton
} from './styles';
import { useCompaniesScreen } from './useCompaniesScreen';

export const CompaniesScreen: React.FC = () => {
  const {
    loading,
    error,
    displayedCompanies,
    currentPage,
    setCurrentPage,
    hasNextPage,
    hasPreviousPage,
    totalPages
  } = useCompaniesScreen();

  return (
    <>
      <HeaderHome />
      <PageWrapper>
        <Container>
          <Hero>
            <h1>Empresas Parceiras 🤝</h1>
            <p>Conheça as empresas que confiam em nosso trabalho e oferecem oportunidades incríveis.</p>
          </Hero>

          <CompaniesSection>
            <h2>Nossas Empresas Parceiras:</h2>
            {loading && <LoadingState>Carregando empresas...</LoadingState>}
            {error && <LoadingState>Ocorreu um erro: {error}</LoadingState>}
            {!loading && !error && displayedCompanies.length > 0 && (
              <>
                <CompaniesGrid>
                  {displayedCompanies.map((company) => (
                    <CompanyCard key={company.id}>
                      <CompanyLogo src={company.avatar_url} alt={company.name} />
                      <CompanyName>{company.name}</CompanyName>
                      <CompanyStats>
                        <StatRow>
                          <FiBriefcase />
                          {company.jobCount} {company.jobCount === 1 ? 'vaga disponível' : 'vagas disponíveis'}
                        </StatRow>
                      </CompanyStats>
                    </CompanyCard>
                  ))}
                </CompaniesGrid>

                {totalPages > 1 && (
                  <PaginationControls>
                    <PageButton onClick={() => setCurrentPage(p => p - 1)} disabled={!hasPreviousPage || loading}>
                      Anterior
                    </PageButton>
                    <span>Página {currentPage} de {totalPages}</span>
                    <PageButton onClick={() => setCurrentPage(p => p + 1)} disabled={!hasNextPage || loading}>
                      Próxima
                    </PageButton>
                  </PaginationControls>
                )}
              </>
            )}
            {!loading && !error && displayedCompanies.length === 0 && (
              <LoadingState>Nenhuma empresa encontrada.</LoadingState>
            )}
          </CompaniesSection>
        </Container>
      </PageWrapper>
    </>
  );
};

