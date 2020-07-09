import { Injectable } from '@nestjs/common';
import Axios from 'axios';
import { ApiType } from './axios.apiType.enum';

@Injectable()
export class AxiosService {
  get(apiType: ApiType, url) {
    return this.generateAxios(apiType)
      .get(url)
      .then(response => response.data);
  }

  post(apiType: ApiType, url, data) {
    return this.generateAxios(apiType)
      .post(url, data)
      .then(response => response.data);
  }

  private generateAxios(apiType: ApiType) {
    switch (apiType) {
      case ApiType.animal:
        return Axios.create({
          baseURL: process.env.ANIMAL_ENDPOINT,
          timeout: 10000,
        });
      case ApiType.lotr:
        return Axios.create({
          baseURL: process.env.LOTR_ENDPOINT,
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${process.env.LOTR_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
      default:
        return Axios.create();
    }
  }
}
