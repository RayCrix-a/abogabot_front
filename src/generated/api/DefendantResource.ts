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

export class DefendantResource<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Crea un registro de demandado
   *
   * @tags DefendantResource
   * @name CreateDefendant
   * @summary Crea un registro de demandando
   * @request POST:/defendant
   */
  createDefendant = (data: ParticipantRequest, params: RequestParams = {}) =>
    this.request<ParticipantDetailResponse, BadRequestResponse | ErrorResponse>(
      {
        path: `/defendant`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      },
    );
  /**
   * @description Obtiene todos los demandados almacenados
   *
   * @tags DefendantResource
   * @name GetAllDefendants
   * @summary Obtiene todos los registros de demandados
   * @request GET:/defendant
   */
  getAllDefendants = (params: RequestParams = {}) =>
    this.request<ParticipantSummaryResponse[], ErrorResponse>({
      path: `/defendant`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Actualiza un registro de demandado en base a su identificador
   *
   * @tags DefendantResource
   * @name UpdateDefendant
   * @summary Actualiza un registro de demandando
   * @request PATCH:/defendant/{id}
   */
  updateDefendant = (
    id: number,
    data: ParticipantRequest,
    params: RequestParams = {},
  ) =>
    this.request<ParticipantDetailResponse, BadRequestResponse | ErrorResponse>(
      {
        path: `/defendant/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      },
    );
  /**
   * @description Obtiene un registro de demandado en base a su identificador
   *
   * @tags DefendantResource
   * @name GetDefendant
   * @summary Obtiene un registro de demandando
   * @request GET:/defendant/{id}
   */
  getDefendant = (id: number, params: RequestParams = {}) =>
    this.request<ParticipantDetailResponse, ErrorResponse>({
      path: `/defendant/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * @description Elimina un registro de demandado en base a su identificador
   *
   * @tags DefendantResource
   * @name DeleteDefendant
   * @summary Elimina un registro de demandando
   * @request DELETE:/defendant/{id}
   */
  deleteDefendant = (id: number, params: RequestParams = {}) =>
    this.request<DeleteResponse, ErrorResponse>({
      path: `/defendant/${id}`,
      method: "DELETE",
      format: "json",
      ...params,
    });
}
