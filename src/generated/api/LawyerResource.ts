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

export class LawyerResource<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Crea un registro de abogado
   *
   * @tags LawyerResource
   * @name CreateLawyer
   * @summary Crea un registro de abogado
   * @request POST:/lawyer
   */
  createLawyer = (data: ParticipantRequest, params: RequestParams = {}) =>
    this.request<ParticipantDetailResponse, BadRequestResponse | ErrorResponse>(
      {
        path: `/lawyer`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      },
    );
  /**
   * @description Obtiene todos los abogados almacenados
   *
   * @tags LawyerResource
   * @name GetAllLawyers
   * @summary Obtiene todos los registros de abogados
   * @request GET:/lawyer
   */
  getAllLawyers = (params: RequestParams = {}) =>
    this.request<ParticipantSummaryResponse[], ErrorResponse>({
      path: `/lawyer`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Actualiza un registro de abogado en base a su identificador
   *
   * @tags LawyerResource
   * @name UpdateLawyer
   * @summary Actualiza un registro de abogado
   * @request PATCH:/lawyer/{id}
   */
  updateLawyer = (
    id: number,
    data: ParticipantRequest,
    params: RequestParams = {},
  ) =>
    this.request<ParticipantDetailResponse, BadRequestResponse | ErrorResponse>(
      {
        path: `/lawyer/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      },
    );
  /**
   * @description Obtiene un registro de abogado en base a su identificador
   *
   * @tags LawyerResource
   * @name GetLawyer
   * @summary Obtiene un registro de abogado
   * @request GET:/lawyer/{id}
   */
  getLawyer = (id: number, params: RequestParams = {}) =>
    this.request<ParticipantDetailResponse, ErrorResponse>({
      path: `/lawyer/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Elimina un registro de abogado en base a su identificador
   *
   * @tags LawyerResource
   * @name DeleteLawyer
   * @summary Elimina un registro de abogado
   * @request DELETE:/lawyer/{id}
   */
  deleteLawyer = (id: number, params: RequestParams = {}) =>
    this.request<DeleteResponse, ErrorResponse>({
      path: `/lawyer/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}
