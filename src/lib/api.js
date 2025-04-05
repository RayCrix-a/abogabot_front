import { mockCases, mockDocuments } from './mockData';

// Función para simular delay en las respuestas
const simulateDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Función para obtener todos los casos
export const getCases = async () => {
  await simulateDelay();
  return [...mockCases];
};

// Función para obtener un caso por ID
export const getCaseById = async (id) => {
  await simulateDelay();
  const caseData = mockCases.find(c => c.id === id);
  
  if (!caseData) {
    throw new Error('Caso no encontrado');
  }
  
  return { ...caseData };
};

// Función para crear un nuevo caso
export const createCase = async (data) => {
  await simulateDelay(1500);
  
  // Generar un nuevo ID para el caso
  const newId = `case-${Date.now()}`;
  
  // Crear nuevo caso con los datos proporcionados
  const newCase = {
    id: newId,
    title: `${data.legalMatter} - ${data.plaintiffName} vs. ${data.defendantName}`,
    createdAt: new Date().toISOString(),
    status: 'En curso',
    statusText: 'En curso',
    description: data.caseDescription,
    procedureType: data.procedureType,
    legalMatter: data.legalMatter,
    plaintiffName: data.plaintiffName,
    plaintiffId: data.plaintiffId,
    plaintiffAddress: data.plaintiffAddress,
    defendantName: data.defendantName,
    defendantId: data.defendantId,
    defendantAddress: data.defendantAddress,
    type: 'Civil',
    parties: `${data.plaintiffName} vs. ${data.defendantName}`
  };
  
  // En una implementación real, aquí se guardaría en la base de datos
  mockCases.push(newCase);
  
  // Crear un documento asociado al caso
  const documentContent = generateDocumentContent(newCase);
  
  const newDocument = {
    id: `doc-${Date.now()}`,
    caseId: newId,
    title: `Caso nº ${newId.split('-')[1]} - Generador de demandas civiles`,
    content: documentContent,
    type: 'Demanda civil',
    pages: 12,
    status: 'En curso',
    lastUpdate: '2 mins ago',
    plaintiffName: data.plaintiffName,
    plaintiffId: data.plaintiffId,
    plaintiffAddress: data.plaintiffAddress,
    defendantName: data.defendantName,
    defendantId: data.defendantId,
    defendantAddress: data.defendantAddress,
    contractDate: '15 de enero de 2024',
    obligation: 'DESCRIBIR OBLIGACIÓN',
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
  };
  
  mockDocuments.push(newDocument);
  
  return { ...newCase, documentId: newDocument.id };
};

// Función para actualizar un caso existente
export const updateCase = async (id, data) => {
  await simulateDelay(1000);
  
  const caseIndex = mockCases.findIndex(c => c.id === id);
  
  if (caseIndex === -1) {
    throw new Error('Caso no encontrado');
  }
  
  // Actualizar el caso con los nuevos datos
  const updatedCase = {
    ...mockCases[caseIndex],
    title: `${data.legalMatter} - ${data.plaintiffName} vs. ${data.defendantName}`,
    status: data.status,
    statusText: data.status,
    description: data.description,
    procedureType: data.procedureType,
    legalMatter: data.legalMatter,
    plaintiffName: data.plaintiffName,
    plaintiffId: data.plaintiffId,
    plaintiffAddress: data.plaintiffAddress,
    defendantName: data.defendantName,
    defendantId: data.defendantId,
    defendantAddress: data.defendantAddress,
    parties: `${data.plaintiffName} vs. ${data.defendantName}`,
    lastUpdated: new Date().toISOString()
  };
  
  mockCases[caseIndex] = updatedCase;
  
  // Actualizar documento asociado si existe
  const documentIndex = mockDocuments.findIndex(d => d.caseId === id);
  if (documentIndex !== -1) {
    mockDocuments[documentIndex] = {
      ...mockDocuments[documentIndex],
      title: `Caso nº ${id.split('-')[1]} - ${data.legalMatter}`,
      status: data.status,
      lastUpdate: 'Ahora mismo',
      plaintiffName: data.plaintiffName,
      plaintiffId: data.plaintiffId,
      plaintiffAddress: data.plaintiffAddress,
      defendantName: data.defendantName,
      defendantId: data.defendantId,
      defendantAddress: data.defendantAddress,
      content: generateDocumentContent({
        ...updatedCase,
        contractDate: mockDocuments[documentIndex].contractDate,
        obligation: mockDocuments[documentIndex].obligation
      }),
      activities: [
        {
          description: 'Case Information Updated',
          time: 'Ahora mismo',
          icon: '📝'
        },
        ...mockDocuments[documentIndex].activities
      ]
    };
  }
  
  return { ...updatedCase };
};

// Función para actualizar solo el estado de un caso
export const updateCaseStatus = async (id, status) => {
  await simulateDelay();
  
  const caseIndex = mockCases.findIndex(c => c.id === id);
  
  if (caseIndex === -1) {
    throw new Error('Caso no encontrado');
  }
  
  // Actualizar el estado del caso
  mockCases[caseIndex] = {
    ...mockCases[caseIndex],
    status: status,
    statusText: status,
    lastUpdated: new Date().toISOString()
  };
  
  // Actualizar documento asociado si existe
  const documentIndex = mockDocuments.findIndex(d => d.caseId === id);
  if (documentIndex !== -1) {
    mockDocuments[documentIndex] = {
      ...mockDocuments[documentIndex],
      status: status,
      lastUpdate: 'Ahora mismo',
      activities: [
        {
          description: `Status Changed to ${status}`,
          time: 'Ahora mismo',
          icon: '🔄'
        },
        ...mockDocuments[documentIndex].activities
      ]
    };
  }
  
  return { ...mockCases[caseIndex] };
};

// Función para eliminar un caso
export const deleteCase = async (id) => {
  await simulateDelay();
  
  const index = mockCases.findIndex(c => c.id === id);
  
  if (index === -1) {
    throw new Error('Caso no encontrado');
  }
  
  mockCases.splice(index, 1);
  
  // Eliminar documentos asociados
  const documentIndex = mockDocuments.findIndex(d => d.caseId === id);
  if (documentIndex !== -1) {
    mockDocuments.splice(documentIndex, 1);
  }
  
  return { success: true };
};

// Función para obtener un documento por ID
export const getDocumentById = async (id) => {
  await simulateDelay();
  
  const document = mockDocuments.find(d => d.id === id);
  
  if (!document) {
    throw new Error('Documento no encontrado');
  }
  
  return { ...document };
};

// Función para generar el contenido del documento
const generateDocumentContent = (caseData) => {
  return `DEMANDA CIVIL POR INCUMPLIMIENTO DE CONTRATO

Señor Juez:

Yo, ${caseData.plaintiffName}, cédula de identidad ${caseData.plaintiffId}, con domicilio en ${caseData.plaintiffAddress}, 
interpongo demanda civil en contra de ${caseData.defendantName}, cédula de identidad ${caseData.defendantId}, 
con domicilio en ${caseData.defendantAddress}, por incumplimiento de contrato. Con fecha [FECHA], 
las partes suscribimos un contrato en el cual el demandado se obligó a [PRESCRIBIR OBLIGACIÓN]....... 
compromiso que hasta la fecha no ha cumplido, causando perjuicio a mi persona.

Por lo expuesto, ruego a SS. tener por interpuesta la demanda, dar curso a la misma y, en definitiva 
, acogerla en todas sus partes, con expresa condena en costas.

[NOMBRE Y FIRMA DEL DEMANDANTE]
[FECHA]`;
};

// Función para enviar mensaje al chat
export const sendChatMessage = async (caseId, message) => {
  await simulateDelay();
  
  // En una implementación real, aquí se guardaría el mensaje en la base de datos
  const response = {
    id: `msg-${Date.now()}`,
    caseId,
    content: `He recibido tu mensaje: "${message}". Estoy procesando la información...`,
    sender: 'bot',
    timestamp: new Date().toISOString()
  };
  
  return response;
};

// Función para descargar un documento
export const downloadDocument = async (documentId) => {
  await simulateDelay();
  
  const document = mockDocuments.find(d => d.id === documentId);
  
  if (!document) {
    throw new Error('Documento no encontrado');
  }
  
  // En una implementación real, aquí se generaría el documento para descargar
  // Para simular la descarga, creamos un objeto Blob con el contenido
  // y usamos FileSaver o descarga nativa del navegador
  
  // Simulación de descarga exitosa
  return {
    success: true,
    document: document,
    filename: `demanda-${documentId}.docx`,
    url: `#/download/${documentId}`
  };
};

// Función para compartir un documento
export const shareDocument = async (documentId, email) => {
  await simulateDelay();
  
  // En una implementación real, aquí se enviaría el documento por email
  return {
    success: true,
    message: `Documento compartido con ${email}`
  };
};
