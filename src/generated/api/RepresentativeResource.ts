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

export class RepresentativeResource<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Crea un registro de representante legal de demandados
   *
   * @tags RepresentativeResource
   * @name CreateRepresentative
   * @summary Crea un registro de representante
   * @request POST:/representative
   */
  createRepresentative = (
    data: ParticipantRequest,
    params: RequestParams = {},
  ) =>
    this.request<ParticipantDetailResponse, BadRequestResponse | ErrorResponse>(
      {
        path: `/representative`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      },
    );
  /**
   * @description Obtiene todos los registros de representantes legales de demandados
   *
   * @tags RepresentativeResource
   * @name GetAllRepresentatives
   * @summary Obtiene todos los registros de representantes
   * @request GET:/representative
   */
  getAllRepresentatives = (params: RequestParams = {}) =>
    this.request<ParticipantSummaryResponse[], ErrorResponse>({
      path: `/representative`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Actualiza un registro de representante legal de demandados en base a su identificador
   *
   * @tags RepresentativeResource
   * @name UpdateRepresentative
   * @summary Actualiza un registro de representante
   * @request PATCH:/representative/{id}
   */
  updateRepresentative = (
    id: number,
    data: ParticipantRequest,
    params: RequestParams = {},
  ) =>
    this.request<ParticipantDetailResponse, BadRequestResponse | ErrorResponse>(
      {
        path: `/representative/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      },
    );
  /**
   * @description Obtiene un registro de un representante legal de demandados en base a su identificador
   *
   * @tags RepresentativeResource
   * @name GetRepresentative
   * @summary Obtiene un registro de representante
   * @request GET:/representative/{id}
   */
  getRepresentative = (id: number, params: RequestParams = {}) =>
    this.request<ParticipantDetailResponse, ErrorResponse>({
      path: `/representative/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Elimina un registro de un representante legal de demandados a través de su identificador
   *
   * @tags RepresentativeResource
   * @name DeleteRepresentative
   * @summary Elimina un registro de representante
   * @request DELETE:/representative/{id}
   */
  deleteRepresentative = (id: number, params: RequestParams = {}) =>
    this.request<DeleteResponse, ErrorResponse>({
      path: `/representative/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}
