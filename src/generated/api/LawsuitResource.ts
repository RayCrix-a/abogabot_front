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

import {
  BadRequestResponse,
  DeleteResponse,
  ErrorResponse,
  LawsuitDetailResponse,
  LawsuitRequest,
  LawsuitSummaryResponse,
  TaskDetailResponse,
  TaskSummaryResponse,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class LawsuitResource<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Crea una demanda
   *
   * @tags LawsuitResource
   * @name CreateLawsuit
   * @summary Crea una demanda
   * @request POST:/lawsuit
   */
  createLawsuit = (data: LawsuitRequest, params: RequestParams = {}) =>
    this.request<LawsuitDetailResponse, BadRequestResponse | ErrorResponse>({
      path: `/lawsuit`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Obtiene todas las demandas en una version resumida. Utilizar el endpoint de detalle para expandirlas.
   *
   * @tags LawsuitResource
   * @name GetAllLawsuits
   * @summary Obtiene todas las demandas
   * @request GET:/lawsuit
   */
  getAllLawsuits = (params: RequestParams = {}) =>
    this.request<LawsuitSummaryResponse[], ErrorResponse>({
      path: `/lawsuit`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags LawsuitResource
   * @name GenerateLawsuit
   * @summary Genera un escrito de demanda
   * @request POST:/lawsuit/generate
   */
  generateLawsuit = (
    query?: {
      /**
       * ID de la demanda
       * @example 123
       */
      id?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, ErrorResponse>({
      path: `/lawsuit/generate`,
      method: "POST",
      query: query,
      ...params,
    });
  /**
   * @description Actualiza una demanda
   *
   * @tags LawsuitResource
   * @name UpdateLawsuit
   * @summary Actualiza una demanda
   * @request PATCH:/lawsuit/{id}
   */
  updateLawsuit = (
    id: number,
    data: LawsuitRequest,
    params: RequestParams = {},
  ) =>
    this.request<LawsuitDetailResponse, BadRequestResponse | ErrorResponse>({
      path: `/lawsuit/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description Obtiene una demanda en base a su identificador. Asimismo, también incluye todas sus revisiones con su identificador para la consulta de sus resultados.
   *
   * @tags LawsuitResource
   * @name GetLawsuit
   * @summary Obtiene una demanda
   * @request GET:/lawsuit/{id}
   */
  getLawsuit = (id: number, params: RequestParams = {}) =>
    this.request<LawsuitDetailResponse, ErrorResponse>({
      path: `/lawsuit/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Elimina una demanda en base a su identificador
   *
   * @tags LawsuitResource
   * @name DeleteLawsuit
   * @summary Elimina una demanda
   * @request DELETE:/lawsuit/{id}
   */
  deleteLawsuit = (id: number, params: RequestParams = {}) =>
    this.request<DeleteResponse, ErrorResponse>({
      path: `/lawsuit/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
  /**
   * @description Obtiene todas las revisiones de una demanda, con el respectivo identificador para obtener el archivo generado.
   *
   * @tags LawsuitResource
   * @name GetRevisions
   * @summary Obtiene las revisiones de una demanda
   * @request GET:/lawsuit/{id}/revisions
   */
  getRevisions = (id: number, params: RequestParams = {}) =>
    this.request<TaskSummaryResponse[], ErrorResponse>({
      path: `/lawsuit/${id}/revisions`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Obtiene una revisión junto con la url de descarga.
   *
   * @tags LawsuitResource
   * @name GetRevision
   * @summary Obtiene una revisión
   * @request GET:/lawsuit/{id}/revisions/{uuid}
   */
  getRevision = (id: number, uuid: string, params: RequestParams = {}) =>
    this.request<TaskDetailResponse[], ErrorResponse>({
      path: `/lawsuit/${id}/revisions/${uuid}`,
      method: "GET",
      format: "json",
      ...params,
    });
}
