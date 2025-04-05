// Mock de casos para la aplicación
export const mockCases = [
  {
    id: 'case-1234',
    title: 'Ruidos Molestos - Leonel vs. Daniel',
    createdAt: '2024-01-15T08:30:00.000Z',
    status: 'En curso',
    statusText: 'En curso',
    type: 'Civil',
    description: 'Conflicto vecinal por ruidos molestos en horarios de descanso que perturban la tranquilidad del demandante.',
    procedureType: 'Juicio ordinario',
    legalMatter: 'Responsabilidad civil',
    plaintiffName: 'Leonel Messi',
    plaintiffId: '12.345.678-9',
    plaintiffAddress: 'Calle Principal 123, Santiago',
    defendantName: 'Daniel Pérez',
    defendantId: '98.765.432-1',
    defendantAddress: 'Avenida Central 456, Santiago',
    parties: 'Leonel vs. Daniel',
    lastUpdated: '2024-01-20T14:25:00.000Z'
  },
  {
    id: 'case-1235',
    title: 'Incumplimiento de contrato - George Harris vs. Viña',
    createdAt: '2024-01-14T10:15:00.000Z',
    status: 'Pendiente',
    statusText: 'Pendiente',
    type: 'Comercial',
    description: 'Demanda por incumplimiento de contrato de prestación de servicios firmado el 10 de diciembre de 2023.',
    procedureType: 'Juicio ejecutivo',
    legalMatter: 'Incumplimiento de contrato',
    plaintiffName: 'George Harris',
    plaintiffId: '11.222.333-4',
    plaintiffAddress: 'Paseo Viña 789, Viña del Mar',
    defendantName: 'Viña Eventos S.A.',
    defendantId: '76.543.210-K',
    defendantAddress: 'Calle Comercio 567, Viña del Mar',
    parties: 'George Harris vs. Viña Eventos S.A.',
    lastUpdated: '2024-01-18T09:45:00.000Z'
  },
  {
    id: 'case-1236',
    title: 'Cobro de deuda - Empresa A vs. Empresa B',
    createdAt: '2023-12-10T11:20:00.000Z',
    status: 'Finalizado',
    statusText: 'Finalizado',
    type: 'Comercial',
    description: 'Demanda por cobro de deuda de facturas impagas por servicios prestados durante el periodo septiembre-noviembre 2023.',
    procedureType: 'Juicio ejecutivo',
    legalMatter: 'Cobro de deuda',
    plaintiffName: 'Empresa A S.A.',
    plaintiffId: '76.111.222-3',
    plaintiffAddress: 'Avenida Comercial 100, Santiago',
    defendantName: 'Empresa B Ltda.',
    defendantId: '76.333.444-5',
    defendantAddress: 'Calle Industrial 200, Santiago',
    parties: 'Empresa A vs. Empresa B',
    lastUpdated: '2024-01-15T16:30:00.000Z'
  },
  {
    id: 'case-1237',
    title: 'Responsabilidad civil - María vs. Supermercado',
    createdAt: '2023-12-20T09:30:00.000Z',
    status: 'Finalizado',
    statusText: 'Finalizado',
    type: 'Civil',
    description: 'Demanda por daños y perjuicios ocasionados por accidente en establecimiento comercial debido a falta de señalización.',
    procedureType: 'Juicio ordinario',
    legalMatter: 'Responsabilidad civil',
    plaintiffName: 'María González',
    plaintiffId: '14.555.666-7',
    plaintiffAddress: 'Pasaje Residencial 30, Valparaíso',
    defendantName: 'Supermercado XYZ',
    defendantId: '76.777.888-9',
    defendantAddress: 'Avenida Principal 500, Valparaíso',
    parties: 'María vs. Supermercado XYZ',
    lastUpdated: '2024-01-05T10:45:00.000Z'
  },
  {
    id: 'case-1238',
    title: 'Arrendamiento - Carlos vs. Inmobiliaria',
    createdAt: '2024-01-05T14:10:00.000Z',
    status: 'En curso',
    statusText: 'En curso',
    type: 'Civil',
    description: 'Demanda por incumplimiento de contrato de arrendamiento debido a deficiencias estructurales no informadas previamente.',
    procedureType: 'Procedimiento sumario',
    legalMatter: 'Arrendamiento',
    plaintiffName: 'Carlos Rodríguez',
    plaintiffId: '15.999.888-7',
    plaintiffAddress: 'Calle Residencial 55, Concepción',
    defendantName: 'Inmobiliaria Horizonte',
    defendantId: '76.123.456-7',
    defendantAddress: 'Avenida Central 789, Concepción',
    parties: 'Carlos vs. Inmobiliaria Horizonte',
    lastUpdated: '2024-01-12T11:30:00.000Z'
  }
];

// Mock de documentos para la aplicación
export const mockDocuments = [
  {
    id: 'doc-1234',
    caseId: 'case-1234',
    title: 'Caso nº 12345 - Generador de demandas civiles',
    content: `DEMANDA CIVIL POR RUIDOS MOLESTOS

Señor Juez:

Yo, Leonel Messi, cédula de identidad 12.345.678-9, con domicilio en Calle Principal 123, Santiago, 
interpongo demanda civil en contra de Daniel Pérez, cédula de identidad 98.765.432-1, 
con domicilio en Avenida Central 456, Santiago, por ruidos molestos que perturban mi tranquilidad. 

Los hechos en que fundo mi demanda son los siguientes:

1. El demandado, en forma reiterada y a distintas horas del día y de la noche, produce ruidos molestos que perturban la tranquilidad de mi hogar.
2. Dichos ruidos son de una intensidad que impide el normal descanso y desarrollo de mis actividades cotidianas.
3. He intentado solucionar el problema de manera amistosa, sin obtener respuesta positiva de parte del demandado.

Por lo expuesto, ruego a SS. tener por interpuesta la demanda, dar curso a la misma y, en definitiva, acogerla en todas sus partes, 
con expresa condena en costas.

Leonel Messi
12.345.678-9
15 de enero de 2024`,
    type: 'Demanda civil',
    pages: 12,
    status: 'En curso',
    lastUpdate: '2 mins ago',
    plaintiffName: 'Leonel Messi',
    plaintiffId: '12.345.678-9',
    plaintiffAddress: 'Calle Principal 123, Santiago',
    defendantName: 'Daniel Pérez',
    defendantId: '98.765.432-1',
    defendantAddress: 'Avenida Central 456, Santiago',
    contractDate: '15 de enero de 2024',
    obligation: 'respetar las normas de convivencia del edificio',
    activities: [
      {
        description: 'Plaintiff Information Updated',
        time: '2 minutes ago',
        icon: '📝'
      },
      {
        description: 'Case Precedents Added',
        time: '15 minutes ago',
        icon: '📚'
      }
    ]
  },
  {
    id: 'doc-1235',
    caseId: 'case-1235',
    title: 'Caso nº 12344 - Generador de demandas civiles',
    content: `DEMANDA CIVIL POR INCUMPLIMIENTO DE CONTRATO

Señor Juez:

Yo, George Harris, cédula de identidad 11.222.333-4, con domicilio en Paseo Viña 789, Viña del Mar, 
interpongo demanda civil en contra de Viña Eventos S.A., RUT 76.543.210-K, 
con domicilio en Calle Comercio 567, Viña del Mar, por incumplimiento de contrato.

Con fecha 10 de diciembre de 2023, las partes suscribimos un contrato en el cual el demandado se obligó a prestar servicios de organización
de eventos para el día 31 de diciembre de 2023, compromiso que no cumplió, causando perjuicio a mi persona.

Por lo expuesto, ruego a SS. tener por interpuesta la demanda, dar curso a la misma y, en definitiva, acogerla en todas sus partes, 
con expresa condena en costas.

George Harris
11.222.333-4
14 de enero de 2024`,
    type: 'Demanda civil',
    pages: 10,
    status: 'Pendiente',
    lastUpdate: '5 mins ago',
    plaintiffName: 'George Harris',
    plaintiffId: '11.222.333-4',
    plaintiffAddress: 'Paseo Viña 789, Viña del Mar',
    defendantName: 'Viña Eventos S.A.',
    defendantId: '76.543.210-K',
    defendantAddress: 'Calle Comercio 567, Viña del Mar',
    contractDate: '10 de diciembre de 2023',
    obligation: 'prestar servicios de organización de eventos',
    activities: [
      {
        description: 'Document Generated',
        time: '5 minutes ago',
        icon: '📄'
      },
      {
        description: 'Contract Details Added',
        time: '20 minutes ago',
        icon: '📋'
      }
    ]
  },
  {
    id: 'doc-1236',
    caseId: 'case-1236',
    title: 'Caso nº 12343 - Generador de demandas civiles',
    content: `DEMANDA CIVIL POR COBRO DE DEUDA

Señor Juez:

Yo, Representante Legal de Empresa A S.A., RUT 76.111.222-3, con domicilio en Avenida Comercial 100, Santiago, 
interpongo demanda civil en contra de Empresa B Ltda., RUT 76.333.444-5, 
con domicilio en Calle Industrial 200, Santiago, por cobro de deuda.

Con fecha septiembre a noviembre de 2023, mi representada prestó servicios a la demandada, quien no ha pagado 
las facturas correspondientes a dichos servicios, a pesar de los reiterados requerimientos de pago.

Por lo expuesto, ruego a SS. tener por interpuesta la demanda, dar curso a la misma y, en definitiva, acogerla en todas sus partes, 
con expresa condena en costas.

Representante Legal Empresa A S.A.
76.111.222-3
10 de diciembre de 2023`,
    type: 'Demanda civil',
    pages: 15,
    status: 'Finalizado',
    lastUpdate: '10 días atrás',
    plaintiffName: 'Empresa A S.A.',
    plaintiffId: '76.111.222-3',
    plaintiffAddress: 'Avenida Comercial 100, Santiago',
    defendantName: 'Empresa B Ltda.',
    defendantId: '76.333.444-5',
    defendantAddress: 'Calle Industrial 200, Santiago',
    contractDate: 'septiembre de 2023',
    obligation: 'pagar por los servicios prestados',
    activities: [
      {
        description: 'Case Closed Successfully',
        time: '10 días atrás',
        icon: '✓'
      },
      {
        description: 'Judgment Issued',
        time: '12 días atrás',
        icon: '⚖️'
      }
    ]
  },
  {
    id: 'doc-1237',
    caseId: 'case-1237',
    title: 'Caso nº 12342 - Generador de demandas civiles',
    content: `DEMANDA CIVIL POR RESPONSABILIDAD CIVIL

Señor Juez:

Yo, María González, cédula de identidad 14.555.666-7, con domicilio en Pasaje Residencial 30, Valparaíso, 
interpongo demanda civil en contra de Supermercado XYZ, RUT 76.777.888-9, 
con domicilio en Avenida Principal 500, Valparaíso, por daños y perjuicios.

Con fecha 15 de noviembre de 2023, sufrí un accidente en las dependencias del demandado debido a la falta 
de señalización de un piso húmedo, lo que me ocasionó lesiones que han requerido tratamiento médico.

Por lo expuesto, ruego a SS. tener por interpuesta la demanda, dar curso a la misma y, en definitiva, acogerla en todas sus partes, 
con expresa condena en costas.

María González
14.555.666-7
20 de diciembre de 2023`,
    type: 'Demanda civil',
    pages: 20,
    status: 'Finalizado',
    lastUpdate: '20 días atrás',
    plaintiffName: 'María González',
    plaintiffId: '14.555.666-7',
    plaintiffAddress: 'Pasaje Residencial 30, Valparaíso',
    defendantName: 'Supermercado XYZ',
    defendantId: '76.777.888-9',
    defendantAddress: 'Avenida Principal 500, Valparaíso',
    contractDate: '15 de noviembre de 2023',
    obligation: 'mantener condiciones seguras para los clientes',
    activities: [
      {
        description: 'Settlement Reached',
        time: '20 días atrás',
        icon: '💰'
      },
      {
        description: 'Mediation Completed',
        time: '25 días atrás',
        icon: '🤝'
      }
    ]
  },
  {
    id: 'doc-1238',
    caseId: 'case-1238',
    title: 'Caso nº 12341 - Generador de demandas civiles',
    content: `DEMANDA CIVIL POR ARRENDAMIENTO

Señor Juez:

Yo, Carlos Rodríguez, cédula de identidad 15.999.888-7, con domicilio en Calle Residencial 55, Concepción, 
interpongo demanda civil en contra de Inmobiliaria Horizonte, RUT 76.123.456-7, 
con domicilio en Avenida Central 789, Concepción, por incumplimiento de contrato de arrendamiento.

Con fecha 1 de diciembre de 2023, firmé un contrato de arrendamiento con la demandada, quien no informó 
de deficiencias estructurales en el inmueble, las cuales hacen imposible habitarlo en condiciones normales.

Por lo expuesto, ruego a SS. tener por interpuesta la demanda, dar curso a la misma y, en definitiva, acogerla en todas sus partes, 
con expresa condena en costas.

Carlos Rodríguez
15.999.888-7
5 de enero de 2024`,
    type: 'Demanda civil',
    pages: 8,
    status: 'En curso',
    lastUpdate: '3 días atrás',
    plaintiffName: 'Carlos Rodríguez',
    plaintiffId: '15.999.888-7',
    plaintiffAddress: 'Calle Residencial 55, Concepción',
    defendantName: 'Inmobiliaria Horizonte',
    defendantId: '76.123.456-7',
    defendantAddress: 'Avenida Central 789, Concepción',
    contractDate: '1 de diciembre de 2023',
    obligation: 'proporcionar un inmueble en condiciones habitables',
    activities: [
      {
        description: 'Property Inspection Requested',
        time: '3 días atrás',
        icon: '🔍'
      },
      {
        description: 'Complaint Filed',
        time: '7 días atrás',
        icon: '📋'
      }
    ]
  }
];
