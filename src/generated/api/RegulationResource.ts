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
  ErrorResponse,
  RegulationRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class RegulationResource<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Consulta regulaciones en base a relato
   *
   * @tags RegulationResource
   * @name LookupRegulations
   * @summary Consulta regulaciones
   * @request POST:/regulation/lookup
   */
  lookupRegulations = (data: RegulationRequest, params: RequestParams = {}) =>
    this.request<string[], BadRequestResponse | ErrorResponse>({
      path: `/regulation/lookup`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
