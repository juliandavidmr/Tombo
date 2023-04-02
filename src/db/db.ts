import {TDb} from './types';

const db = Object.freeze<TDb>({
  autos: {
    preventionAndSafetyEquipment: {
      meta: {
        article: 30,
        title: 'Equipos de prevención y seguridad',
        information:
          'El presente listado es de carácter obligatorio, es deber de cada conductor verificar que se encuentre en perfecto estado de funcionamiento y que se encuentre en condiciones de ser utilizado. Articulo 30 del Reglamento de Tránsito Terrestre 769 de 2002.',
        appliesTo: ['car', 'truck', 'bus'],
      },
      list: [
        {
          id: 'article-30-1',
          title: 'Gato',
          description: 'Un gato con capacidad para elevar el vehículo',
        },
        {
          id: 'article-30-2',
          title: 'Cruceta',
          description: 'Una cruceta',
        },
        {
          id: 'article-30-3',
          title: 'Señales de carretera',
          description:
            'Dos señales de carretera en forma de triángulo en material reflectivo y provistas de soportes para ser colocadas en forma vertical o lámparas de señal de luz amarilla intermitentes o de destello',
        },
        {
          id: 'article-30-4',
          title: 'Botiquín de primeros auxilios',
          description: 'Un botiquín de primeros auxilios',
        },
        {
          id: 'article-30-5',
          title: 'Extintor',
          description: 'Un extintor',
        },
        {
          id: 'article-30-6',
          title: 'Tacos para bloquear el vehículo',
          description: 'Dos tacos para bloquear el vehículo',
        },
        {
          id: 'article-30-7',
          title: 'Caja de herramienta básica',
          description:
            'Caja de herramienta básica que como mínimo deberá contener: alicate, destornilladores, llave de expansión y llaves fijas',
        },
        {
          id: 'article-30-8',
          title: 'Llanta de repuesto',
          description: 'Llanta de repuesto',
        },
        {
          id: 'article-30-9',
          title: 'Linterna',
          description: 'Linterna',
        },
      ],
    },
  },
  motorcycles: {
    preventionAndSafetyEquipment: {
      meta: {
        article: 30,
        title: 'Equipos de prevención y seguridad',
        information:
          'El presente listado es de carácter obligatorio, es deber de cada conductor verificar que se encuentre en perfecto estado de funcionamiento y que se encuentre en condiciones de ser utilizado. Reglamento de Tránsito Terrestre 769 de 2002.',
        appliesTo: ['motorcycle', 'moto-taxi'],
      },
      list: [
        {
          id: 'article-30-motorcycle-1',
          title: 'Casco de seguridad',
          description:
            'El conductor y el acompañante deberán portar siempre el casco de seguridad, conforme a la reglamentación que expida el Ministerio de Transporte. En todo caso, no se podrá exigir que el casco contenga el número de placa correspondiente al del vehículo en que se moviliza.',
        },
        {
          id: 'article-30-motorcycle-2',
          title: 'Chaleco reflectivo',
          description:
            'El coductor o el acompañante deberán portar siempre el chaleco reflectivo despues de las 6:00 p.m. y antes de las 6:00 a.m. o en condiciones de poca visibilidad.',
        },
      ],
    },
  },
  mandatoryDocuments: {
    meta: {
      article: 31,
      title: 'Documentos obligatorios',
      information: 'Ley 769 de 2002 del Código Nacional de Tránsito Colombiano',
      appliesTo: ['all'],
    },
    list: [
      {
        id: 'document-1',
        title: 'Licencia de conducción',
        description: 'Licencia de conducción',
      },
      {
        id: 'document-2',
        title: 'Tarjeta de propiedad',
        description: 'Tarjeta de propiedad',
      },
      {
        id: 'document-3',
        title: 'Documento de identidad',
        description: 'Documento de identidad',
      },
      {
        id: 'document-4',
        title: 'Seguro Obligatorio de Accidentes de Tránsito (SOAT)',
        description: 'Seguro Obligatorio de Accidentes de Tránsito (SOAT)',
      },
      {
        id: 'document-5',
        title: 'Certificado de revisión técnico mecánica y de gases',
        description:
          'Certificado de revisión técnico mecánica y de gases (RTM y Gases)',
      },
    ],
  },
});

export default db;
