export interface CareerGrowthResource {
  url: string;
  publisher: string;
  language: 'en';
}

const resource = (url: string, publisher: string): CareerGrowthResource => {
  if (new URL(url).protocol !== 'https:') throw new Error('Career resources must use HTTPS.');
  return { url, publisher, language: 'en' };
};
const governmentRole = (role: string) => resource(`https://understand-digital-data-roles-skills.service.gov.uk/role/${role}/`, 'Government Digital and Data');
const design = governmentRole('interaction-designer');
const contentDesign = governmentRole('content-designer');
const dataScience = governmentRole('data-scientist');
const businessAnalysis = governmentRole('business-analyst');
const technicalArchitecture = governmentRole('technical-architect');
const research = resource('https://www.bls.gov/ooh/computer-and-information-technology/computer-and-information-research-scientists.htm', 'U.S. Bureau of Labor Statistics');
const staffEngineering = resource('https://staffeng.com/guides/what-do-staff-engineers-actually-do/', 'StaffEng');
const engineeringLeadership = resource('https://handbook.gitlab.com/job-description-library/engineering/engineering-management/', 'GitLab');

export const careerGrowthResources: Readonly<Record<string, CareerGrowthResource>> = {
  'ux-team-lead': design,
  'content-strategist': governmentRole('content-strategist'),
  'lead-content-designer': contentDesign,
  'head-content-design': contentDesign,
  'ai-research-scientist': research,
  'principal-research-scientist': research,
  'systems-analyst': resource('https://www.bls.gov/ooh/computer-and-information-technology/computer-systems-analysts.htm', 'U.S. Bureau of Labor Statistics'),
  'software-architect': technicalArchitecture,
  'infrastructure-architect': technicalArchitecture,
  'cloud-architect': technicalArchitecture,
  'security-architect': governmentRole('security-architect'),
  'data-architect': governmentRole('data-architect'),
  'ai-architect': resource('https://learn.microsoft.com/en-us/training/modules/introduction-agentic-ai-business-solution-architecture/', 'Microsoft Learn'),
  'principal-data-analyst': governmentRole('data-analyst'),
  'staff-engineer': staffEngineering,
  'principal-engineer': staffEngineering,
  'principal-designer': design,
  'principal-data-scientist': dataScience,
  'business-analysis-specialist': businessAnalysis,
  'technical-lead': resource('https://handbook.gitlab.com/handbook/engineering/careers/ic-leadership/tech-lead/', 'GitLab'),
  'design-lead': design,
  'data-science-lead': dataScience,
  'business-analysis-lead': businessAnalysis,
  'it-service-manager': governmentRole('it-service-manager'),
  'network-operations-manager': governmentRole('command-and-control-centre-manager'),
  'security-operations-manager': resource('https://handbook.gitlab.com/job-description-library/finance/information-technology/manager-it-security-operations/', 'GitLab'),
  'engineering-manager': resource('https://handbook.gitlab.com/job-description-library/engineering/development/management/engineering-manager/', 'GitLab'),
  'design-manager': design,
  'data-science-manager': dataScience,
  'business-analysis-manager': businessAnalysis,
  'engineering-director': engineeringLeadership,
  'engineering-vp': engineeringLeadership,
  'cto': governmentRole('chief-technology-officer'),
  'chief-data-officer': governmentRole('chief-data-officer'),
  'chief-information-security-officer': governmentRole('chief-information-security-officer'),
};
