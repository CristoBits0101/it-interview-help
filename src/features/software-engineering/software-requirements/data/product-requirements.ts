import { conceptSources } from '../../../../shared/data/concept-sources';
import type { FoundationGuide } from '../../../../shared/lib/foundation-guide';
import { localizedText as text } from '../../../../shared/lib/localized-text';

export const productRequirementsGuide: FoundationGuide = {
  route: 'software-requirements/product-constraints',
  label: 'Software Requirements',
  title: text('Requisitos de Software', 'Software Requirements'),
  description: text('Desarrollar un producto exige atender necesidades de usuarios y objetivos del negocio. También exige identificar las obligaciones normativas aplicables.', 'Developing a product requires addressing user needs and business objectives. It also requires identifying applicable regulatory obligations.'),
  diagram: [
    { title: text('Necesidades del Usuario', 'User Needs'), text: text('Expresan lo que una persona necesita lograr con el producto. Orientan la solución sin imponer siempre una función concreta.', 'They express what a person needs to accomplish with the product. They guide the solution without always imposing a specific feature.') },
    { title: text('Requisitos del Negocio', 'Business Requirements'), text: text('Expresan los resultados que la organización espera del producto. Permiten evaluar si la solución contribuye a sus objetivos.', 'They express the outcomes the organization expects from the product. They help assess whether the solution contributes to its objectives.') },
    { title: text('Obligaciones Normativas', 'Regulatory Obligations'), text: text('Establecen condiciones de cumplimiento según el producto y el mercado. Deben convertirse en requisitos verificables desde el diseño.', 'They establish compliance conditions according to the product and market. They must be translated into verifiable requirements from the design stage.') },
  ],
  concepts: [
    { title: text('Aplicación al Producto', 'Application to the Product'), description: text('Identifica qué disposición aplica y documenta cómo comprobar su cumplimiento. Vincula cada obligación con el requisito y su evidencia.', 'Identify which provision applies and document how to verify compliance. Link each obligation to the requirement and its evidence.') },
    { title: text('Procedimientos Internos', 'Internal Procedures'), description: text('Un procedimiento interno describe cómo trabaja una organización. No se convierte por ello en un reglamento jurídico.', 'An internal procedure describes how an organization works. This does not make it a legal regulation.') },
  ],
  sections: [{
    title: text('Normativa y Reglamentación', 'Normative Framework and Regulation'),
    description: text('Esta distinción ayuda a analizar requisitos de producto. Los términos pueden solaparse según el contexto.', 'This distinction helps analyze product requirements. The terms can overlap depending on the context.'),
    items: [
      { title: text('Normativa', 'Normative Framework'), description: text('Reúne las normas aplicables a una actividad o producto. Su alcance depende de la materia y del contexto.', 'It brings together the rules applicable to an activity or product. Its scope depends on the subject and context.'), source: conceptSources.normativeFramework },
      { title: text('Reglamentación', 'Regulation'), description: text('Establece o desarrolla disposiciones y requisitos concretos para regular una actividad. Puede formar parte de la normativa aplicable.', 'It establishes or develops specific provisions and requirements to regulate an activity. It can form part of the applicable normative framework.'), source: conceptSources.regulation },
      { title: text('Norma Técnica y Reglamento Técnico', 'Technical Standard and Technical Regulation'), description: text('Una norma técnica no es por sí misma una ley obligatoria. En la Ley de Industria española el reglamento técnico establece especificaciones obligatorias mediante una disposición.', 'A technical standard is not in itself a mandatory law. Under the Spanish Industry Act a technical regulation establishes mandatory specifications through a provision.'), source: conceptSources.technicalRegulation },
    ],
  }],
  questions: [
    { prompt: text('¿Basta con satisfacer al usuario y al negocio?', 'Is satisfying the user and the business enough?'), answer: text('No basta si el producto incumple obligaciones aplicables. Estas deben incluirse en los requisitos y en su verificación.', 'It is not enough if the product fails to meet applicable obligations. These must be included in the requirements and their verification.') },
    { prompt: text('¿Normativa y reglamentación son categorías excluyentes?', 'Are the normative framework and regulation mutually exclusive categories?'), answer: text('No son categorías excluyentes. La reglamentación puede integrar la normativa que afecta al producto.', 'They are not mutually exclusive categories. Regulation can be part of the normative framework affecting the product.') },
    { prompt: text('¿Toda norma técnica es obligatoria?', 'Is every technical standard mandatory?'), answer: text('No es obligatoria por el mero hecho de ser una norma técnica. Comprueba si una disposición aplicable o un compromiso contractual exige cumplirla.', 'It is not mandatory merely because it is a technical standard. Check whether an applicable provision or a contractual commitment requires compliance.') },
  ],
  related: ['api-design/rest-api'],
  source: conceptSources.technicalRegulation,
};
