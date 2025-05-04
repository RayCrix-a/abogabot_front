/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum RequestErrors {
  EMPTY = "EMPTY",
  NULL = "NULL",
  NON_UNIQUE = "NON_UNIQUE",
  NON_EXISTING_REFERENCE = "NON_EXISTING_REFERENCE",
  CONSTRAINT = "CONSTRAINT",
  FORMAT = "FORMAT",
}

export interface BadRequestResponse {
  /**
   * Dia y hora del error
   * @example "2025-04-18T16:51:22.758209177"
   */
  timestamp: string;
  /**
   * Mensaje explicando el error
   * @example "Error en la base de datos"
   */
  content: string;
  /**
   * código HTTP de respuesta
   * @format int32
   * @example 500
   */
  status: number;
  /**
   * Tipo de error
   * @example "EMPTY"
   */
  code: RequestErrors;
  /**
   * Campo del error
   * @example "idNumber"
   */
  field: string;
}

export interface DeleteResponse {
  /**
   * Identificador del elemento eliminado
   * @format int64
   * @example 123
   */
  id: number;
  /**
   * Si el procedimiento tuvo éxito
   * @example true
   */
  success: boolean;
}

export interface ErrorResponse {
  /**
   * Dia y hora del error
   * @example "2025-04-18T16:51:22.758209177"
   */
  timestamp: string;
  /**
   * Mensaje explicando el error
   * @example "Error en la base de datos"
   */
  content: string;
  /**
   * código HTTP de respuesta
   * @format int32
   * @example 500
   */
  status: number;
}

export interface LawsuitDetailResponse {
  /**
   * identificador de demanda
   * @format int64
   * @example 123
   */
  id: number;
  /** Tipo de procedimiento */
  proceedingType: ProceedingTypeDictionaryResponse;
  /**
   * Materia de la demanda
   * @example "Prescripción extintiva"
   */
  subjectMatter: string;
  /** Demandantes */
  plaintiffs: {
    /**
     * identificador del sujeto
     * @format int64
     * @example 123
     */
    id: number;
    /**
     * Número de documento
     * @example "99999999-9"
     */
    idNumber: string;
    /**
     * Nombre completo
     * @example "Pedro Pablo Pérez Pereira"
     */
    fullName: string;
    /**
     * Dirección
     * @example "Avenida Siempreviva # 123"
     */
    address: string;
  }[];
  /** Abogado patrocinante */
  attorneyOfRecord: ParticipantDetailResponseLawyer;
  /** Demandados */
  defendants: {
    /**
     * identificador del sujeto
     * @format int64
     * @example 123
     */
    id: number;
    /**
     * Número de documento
     * @example "99999999-9"
     */
    idNumber: string;
    /**
     * Nombre completo
     * @example "Pedro Pablo Pérez Pereira"
     */
    fullName: string;
    /**
     * Dirección
     * @example "Avenida Siempreviva # 123"
     */
    address: string;
  }[];
  /** Represenante legal de los demandados */
  representative?: ParticipantDetailResponseRepresentative;
  /**
   * Suma de peticiones al tribunal
   * @example ["DEMANDA EJECUTIVA Y MANDAMIENTO DE EJECUCIÓN Y EMBARGO","SEÑALA BIENES PARA EMBARGO Y DEPOSITARIO PROVISIONAL","ACOMPAÑA DOCUMENTOS, CON CITACIÓN","FORMACIÓN DE CUADERNO SEPARADO","PATROCINIO Y PODER","FORMA DE NOTIFICACIÓN ELECTRÓNICA"]
   */
  claims: string[];
  /**
   * Tribunal al que se presentará la demanda
   * @example "S.J.L. EN LO CIVIL"
   */
  institution: string;
  /**
   * Relato en lenguaje cotidiano
   * @example "El 31 de mayo de 2016, firmé como arrendador un contrato de arrendamiento para el inmueble ubicado en Calle Siempre Viva N°12345 Local A, en la comuna de Springfield, Santiago. El contrato lo firmó don Fulanito como arrendatario y doña Fulanita como aval y codeudora solidaria. Según la cláusula CUARTA del contrato, la renta mensual es de $700.000, que debe pagarse por adelantado el día 15 de cada mes mediante depósito o transferencia a mi cuenta en Banco Estado (Cuenta Vista/RUT N° 111111). Debido a varios incumplimientos en el pago de la renta y los servicios básicos, y a que el arrendatario se negó sin justificación a devolver el inmueble, inicié un proceso judicial para cobrar las rentas adeudadas y recuperar la propiedad. Este proceso, con rol C-12345-1234, se tramitó en el 3° Juzgado Civil de Springfield. El 1 de enero de 2023, se dictó una sentencia que acogió la demanda y ordenó al demandado pagar $52.385.000 por rentas no pagadas, $4.091.833 por consumo eléctrico, y $101.890 por consumo de agua potable y alcantarillado. También se ordenó pagar los ajustes correspondientes a las rentas y consumos devengados después de la demanda."
   */
  narrative: string;
  /**
   * Fecha de creación
   * @example "2025-04-18T16:51:22.758209177"
   */
  createdAt: string;
}

export interface LawsuitRequest {
  /**
   * Nombre del tipo de procedimiento almacenado
   * @example "ORDINARIO"
   */
  proceedingType: string;
  /**
   * Materia del escrito
   * @example "Prescripción extintiva"
   */
  subjectMatter: string;
  /**
   * Número de documento de los demandantes almacenados
   * @example ["44444444-4"]
   */
  plaintiffs: string[];
  /**
   * Número de documento del abogado patrocinante almacenado
   * @example "77777777-7"
   */
  attorneyOfRecord: string;
  /**
   * Número de documento de los demandados almacenados
   * @example ["11111111-1","22222222-2"]
   */
  defendants: string[];
  /**
   * Suma de peticiones al tribunal
   * @example ["DEMANDA EJECUTIVA Y MANDAMIENTO DE EJECUCIÓN Y EMBARGO","SEÑALA BIENES PARA EMBARGO Y DEPOSITARIO PROVISIONAL","ACOMPAÑA DOCUMENTOS, CON CITACIÓN","FORMACIÓN DE CUADERNO SEPARADO","PATROCINIO Y PODER","FORMA DE NOTIFICACIÓN ELECTRÓNICA"]
   */
  claims: string[];
  /**
   * Número de documento del representante almacenado de los demandados
   * @example "99999999-9"
   */
  representative?: string;
  /**
   * Tribunal al que se presentará la demanda
   * @example "S.J.L. EN LO CIVIL"
   */
  institution: string;
  /**
   * Relato en lenguaje cotidiano
   * @example "El 31 de mayo de 2016, firmé como arrendador un contrato de arrendamiento para el inmueble ubicado en Calle Siempre Viva N°12345 Local A, en la comuna de Springfield, Santiago. El contrato lo firmó don Fulanito como arrendatario y doña Fulanita como aval y codeudora solidaria. Según la cláusula CUARTA del contrato, la renta mensual es de $700.000, que debe pagarse por adelantado el día 15 de cada mes mediante depósito o transferencia a mi cuenta en Banco Estado (Cuenta Vista/RUT N° 111111). Debido a varios incumplimientos en el pago de la renta y los servicios básicos, y a que el arrendatario se negó sin justificación a devolver el inmueble, inicié un proceso judicial para cobrar las rentas adeudadas y recuperar la propiedad. Este proceso, con rol C-12345-1234, se tramitó en el 3° Juzgado Civil de Springfield. El 1 de enero de 2023, se dictó una sentencia que acogió la demanda y ordenó al demandado pagar $52.385.000 por rentas no pagadas, $4.091.833 por consumo eléctrico, y $101.890 por consumo de agua potable y alcantarillado. También se ordenó pagar los ajustes correspondientes a las rentas y consumos devengados después de la demanda."
   */
  narrative: string;
}

export interface LawsuitSummaryResponse {
  /**
   * identificador de demanda
   * @format int64
   * @example 123
   */
  id: number;
  /**
   * Materia de la demanda
   * @example "Prescripción extintiva"
   */
  subjectMatter: string;
  /**
   * Fecha de creación
   * @example "2025-04-18T16:51:22.758209177"
   */
  createdAt: string;
}

export interface ParticipantDetailResponse {
  /**
   * identificador del sujeto
   * @format int64
   * @example 123
   */
  id: number;
  /**
   * Número de documento
   * @example "99999999-9"
   */
  idNumber: string;
  /**
   * Nombre completo
   * @example "Pedro Pablo Pérez Pereira"
   */
  fullName: string;
  /**
   * Dirección
   * @example "Avenida Siempreviva # 123"
   */
  address: string;
}

export interface ParticipantDetailResponseLawyer {
  /**
   * identificador del sujeto
   * @format int64
   * @example 123
   */
  id: number;
  /**
   * Número de documento
   * @example "99999999-9"
   */
  idNumber: string;
  /**
   * Nombre completo
   * @example "Pedro Pablo Pérez Pereira"
   */
  fullName: string;
  /**
   * Dirección
   * @example "Avenida Siempreviva # 123"
   */
  address: string;
}

export interface ParticipantDetailResponseRepresentative {
  /**
   * identificador del sujeto
   * @format int64
   * @example 123
   */
  id: number;
  /**
   * Número de documento
   * @example "99999999-9"
   */
  idNumber: string;
  /**
   * Nombre completo
   * @example "Pedro Pablo Pérez Pereira"
   */
  fullName: string;
  /**
   * Dirección
   * @example "Avenida Siempreviva # 123"
   */
  address: string;
}

export interface ParticipantRequest {
  /**
   * Número de documento
   * @example "99999999-9"
   */
  idNumber: string;
  /**
   * Nombre completo
   * @example "Pedro Pablo Pérez Pereira"
   */
  fullName: string;
  /**
   * Dirección
   * @example "Avenida Siempreviva # 123"
   */
  address: string;
}

export interface ParticipantSummaryResponse {
  /**
   * identificador del sujeto
   * @format int64
   * @example 123
   */
  id: number;
  /**
   * Número de documento
   * @example "99999999-9"
   */
  idNumber: string;
  /**
   * Nombre completo
   * @example "Pedro Pablo Pérez Pereira"
   */
  fullName: string;
}

export interface ProceedingTypeDictionaryResponse {
  /**
   * Nombre único del tipo de procedimiento
   * @example "ORDINARIO"
   */
  name: string;
  /**
   * Descripción del tipo de procedimiento
   * @example "Procedimiento ordinario"
   */
  description: string;
}

export interface RegulationRequest {
  /**
   * Relato en lenguaje cotidiano
   * @example "Me despidieron por ir al baño durante la jornada laboral"
   */
  narrative: string;
}

export interface TaskDetailResponse {
  /**
   * Identificador de la tarea
   * @example "75de69f1-643b-437d-a830-d7850ae22b8"
   */
  uuid: string;
  /**
   * Fecha de creación
   * @example "2025-04-18T16:51:22.758209177"
   */
  createdAt?: string;
  /**
   * Url de descarga
   * @example "https://download.url/file.md"
   */
  url: string;
}

export interface TaskSummaryResponse {
  /**
   * Identificador de la tarea
   * @example "75de69f1-643b-437d-a830-d7850ae22b8"
   */
  uuid: string;
  /**
   * Fecha de creación
   * @example "2025-04-18T16:51:22.758209177"
   */
  createdAt: string;
}
