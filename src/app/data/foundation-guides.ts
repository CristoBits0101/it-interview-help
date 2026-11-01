import { webFoundations } from './web-foundations';
import { mcpGuide } from '../../features/artificial-intelligence/generative-artificial-intelligence/model-context-protocol-mcp/data/mcp';

import { productRequirementsGuide } from '../../features/software-engineering/software-requirements/data/product-requirements';

import { jdkEnvironmentGuide } from '../../features/software-engineering/software-development/programming-languages/java/developer-roadmap/development-environment/data/jdk-environment';
import { springProjectGuide } from '../../features/software-engineering/software-development/programming-languages/java/frameworks/spring-boot/project-creation/data/project-creation';
import { tomcatGuide } from '../../features/software-engineering/software-engineering-operations/servlet-containers/apache-tomcat/data/apache-tomcat';

export const foundationGuides = [...webFoundations, mcpGuide, productRequirementsGuide, jdkEnvironmentGuide, springProjectGuide, tomcatGuide];
