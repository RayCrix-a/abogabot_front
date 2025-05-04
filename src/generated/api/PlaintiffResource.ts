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
  ParticipantDetailResponse,
  ParticipantRequest,
  ParticipantSummaryResponse,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class PlaintiffResource<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Crea un registro de demandante
   *
   * @tags PlaintiffResource
   * @name CreatePlaintiff
   * @summary Crea un registro de demandante
   * @request POST:/plaintiff
   */
  createPlaintiff = (data: ParticipantRequest, params: RequestParams = {}) =>
    this.request<ParticipantDetailResponse, BadRequestResponse | ErrorResponse>(
      {
        path: `/plaintiff`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      },
    );
  /**
   * @description Obtiene todos los demandantes almacenados
   *
   * @tags PlaintiffResource
   * @name GetAllPlaintiffs
   * @summary Obtiene todos los registros de demandantes
   * @request GET:/plaintiff
   */
  getAllPlaintiffs = (params: RequestParams = {}) =>
    this.request<ParticipantSummaryResponse[], ErrorResponse>({
      path: `/plaintiff`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Actualiza un registro de demandante en base a su identificador
   *
   * @tags PlaintiffResource
   * @name UpdatePlaintiff
   * @summary Actualiza un registro de demandante
   * @request PATCH:/plaintiff/{id}
   */
  updatePlaintiff = (
    id: number,
    data: ParticipantRequest,
    params: RequestParams = {},
  ) =>
    this.request<ParticipantDetailResponse, BadRequestResponse | ErrorResponse>(
      {
        path: `/plaintiff/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      },
    );
  /**
   * @description Obtiene un registro de demandante en base a su identificador
   *
   * @tags PlaintiffResource
   * @name GetPlaintiff
   * @summary Obtiene un registro de demandante
   * @request GET:/plaintiff/{id}
   */
  getPlaintiff = (id: number, params: RequestParams = {}) =>
    this.request<ParticipantDetailResponse, ErrorResponse>({
      path: `/plaintiff/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Elimina un registro de demandante en base a su identificador
   *
   * @tags PlaintiffResource
   * @name DeletePlaintiff
   * @summary Elimina un registro de demandante
   * @request DELETE:/plaintiff/{id}
   */
  deletePlaintiff = (id: number, params: RequestParams = {}) =>
    this.request<DeleteResponse, ErrorResponse>({
      path: `/plaintiff/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}
