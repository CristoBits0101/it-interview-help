import type { Track } from '../../shared/lib/curriculum';
import { distributedSystems } from '../../features/computer-systems/distributed-systems/data/distributed-systems';
import { softwareArchitecture } from '../../features/software-engineering/software-architecture/data/software-architecture';
import { softwareDesign } from '../../features/software-engineering/software-design/data/software-design';
import { informationArchitecture } from '../../features/human-computer-interaction/user-experience-design/information-architecture/data/information-architecture';


export const tracks: Track[] = [distributedSystems, softwareArchitecture, softwareDesign, informationArchitecture];

export const sources: { title: string; url: string }[] = [
  { title: 'Design Patterns · Gamma, Helm, Johnson y Vlissides', url: 'https://www.informit.com/store/design-patterns-elements-of-reusable-object-oriented-software-9780201633610' },
  { title: 'SOLID · Robert C. Martin', url: 'https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html' },
  { title: 'HTTP: semántica e idempotencia · RFC 9110', url: 'https://www.rfc-editor.org/rfc/rfc9110.html' },
  { title: 'Raft · consenso y mayorías', url: 'https://raft.github.io/' },
  { title: 'etcd · coordinación, leases y fencing', url: 'https://etcd.io/docs/v3.7/learning/why/' },
  { title: 'Apache Kafka · protocolo y particiones', url: 'https://kafka.apache.org/protocol.html' },
  { title: 'Apache Cassandra · definición de datos y CQL', url: 'https://cassandra.apache.org/doc/latest/cassandra/developing/cql/ddl.html' },
  { title: 'Apache Avro · evolución y resolución de esquemas', url: 'https://avro.apache.org/docs/1.12.0/specification/#schema-resolution' },
  { title: 'Cockroach Labs · límites del teorema CAP', url: 'https://www.cockroachlabs.com/blog/limits-of-the-cap-theorem/' },
  { title: 'W3C WAI · navegación consistente', url: 'https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html' },
];
