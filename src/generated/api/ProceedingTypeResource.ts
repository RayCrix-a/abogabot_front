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
  ErrorResponse,
  ProceedingTypeDictionaryResponse,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class ProceedingTypeResource<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description Obtiene todos los registros de tipos de procedimiento
   *
   * @tags ProceedingTypeResource
   * @name GetAllProceedingTypes
   * @summary Obtiene todos los tipos de procedimiento
   * @request GET:/proceeding/type
   */
  getAllProceedingTypes = (params: RequestParams = {}) =>
    this.request<ProceedingTypeDictionaryResponse[], ErrorResponse>({
      path: `/proceeding/type`,
      method: "GET",
      format: "json",
      ...params,
    });
}
