import type { ServiceResponse } from '@/DTOs';
import type { PagingRequest } from '@/models';
import type { AxiosResponse } from 'axios';
import BaseApiConfig from './base-api-config';

export default class BaseApi<T> {
    protected baseApi;

    controller = '';

    constructor(controller: string) {
        this.baseApi = BaseApiConfig;
        this.controller = controller;
    }

    getAll() {
        return this.baseApi.get(this.controller);
    }

    getByID(id: string | number) {
        return this.baseApi.get(this.controller + `/${id}`);
    }

    getFilterPaging(
        param: PagingRequest
    ): Promise<AxiosResponse<ServiceResponse>> {
        return this.baseApi.post(this.controller + '/paging', param);
    }

    insert(param: T) {
        return this.baseApi.post(this.controller, param);
    }

    insertBulk(param: T[]) {
        return this.baseApi.post(this.controller + `/bulk`, param);
    }

    update(param: T) {
        return this.baseApi.put(this.controller, param);
    }

    updateBulk(param: T[]) {
        return this.baseApi.post(this.controller + `/bulk`, param);
    }

    delete(id: string | number) {
        return this.baseApi.put(this.controller + `/${id}`);
    }

    deleteBulk(param: T[]) {
        return this.baseApi.post(this.controller + '/batch', param);
    }
}
