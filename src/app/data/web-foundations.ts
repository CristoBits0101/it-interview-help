import type { FoundationGuide } from '../../shared/lib/foundation-guide';
import { webRenderingGuide } from '../../features/software-engineering/software-development/web-rendering/data/web-rendering';
import { bufferGuide } from '../../features/computer-systems/operating-systems/buffer/data/buffer';
import { httpGuide } from '../../features/computer-systems/computer-networks/http-protocol/data/http';
import { restApiGuide } from '../../features/software-engineering/software-design/api-design/rest-api/data/rest-api';
import { restArchitectureGuide } from '../../features/software-engineering/software-architecture/architectural-styles/rest/data/rest';


export const webFoundations: FoundationGuide[] = [webRenderingGuide, bufferGuide, httpGuide, restApiGuide, restArchitectureGuide];
