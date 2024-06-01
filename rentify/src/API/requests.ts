/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import localforage from "localforage";

export class APIRequest {
  private BASEURL = "http://ecosadmin.pythonanywhere.com/rentify-api/v1/";

  async getToken() {
    try {
      const token: { email: string; val: string } | null =
        await localforage.getItem("token");
      return token;
    } catch {
      /* empty */
    }

    return null;
  }

  private async setToken(data: any) {
    try {
      await localforage.setItem("token", data);
    } catch {
      /* empty */
    }
  }

  private async login(data: any) {
    const url = this.BASEURL + "auth-token/";
    data.username = data.email;

    const res: any = await axios.post(url, data);
    return res;
  }

  private async register(data: any) {
    const url = this.BASEURL + "users/auth-register/";
    const res: any = await axios.post(url, data);
    return res;
  }

  private addQueryParams(filters?: URLSearchParams) {
    if (filters) {
      return "?" + filters.toString();
    }
    return "/";
  }

  async auth(data: any, login: boolean) {
    try {
      let res = null;
      if (login) {
        res = await this.login(data);
      } else {
        res = await this.register(data);
      }
      await this.setToken({ val: res.data.token, email: data.email });
      res = await this.get(`users/${data.email}`);
      return res;
    } catch (e) {
      return null;
    }
  }

  async logout() {
    try {
      await localforage.removeItem("token");
    } catch {
      // empty
    }
  }

  async post(path: string, data: unknown) {
    let res: AxiosResponse<any, any> | null = null;
    try {
      const token: any = await this.getToken();
      const config = {
        headers: {
          Authorization: `Token ${token.val}`,
        },
      };
      const url = this.BASEURL + `${path}/`;
      res = await axios.post(url, data, config);
    } catch (e: any) {
      res = e.response;
    }
    return res;
  }

  async get(path: string, override?: boolean, filters?: URLSearchParams) {
    let res: AxiosResponse<unknown, unknown> | null = null;
    try {
      let config = {};
      if (!override) {
        const token: any = await this.getToken();
        config = {
          headers: {
            Authorization: `Token ${token.val}`,
          },
        };
      }
      const url = this.BASEURL + `${path}` + this.addQueryParams(filters);

      res = await axios.get(url, config);
    } catch (e: any) {
      res = e.response;
    }
    return res;
  }

  async update(path: string, data: unknown) {
    let res: AxiosResponse<any, any> | null = null;
    try {
      const token: any = await this.getToken();
      const config = {
        headers: {
          Authorization: `Token ${token.val}`,
        },
      };
      const url = this.BASEURL + `${path}/`;
      res = await axios.patch(url, data, config);
    } catch (e: any) {
      res = e.response;
    }
    return res;
  }

  async delete(path: string) {
    let res: AxiosResponse<any, any> | null = null;
    try {
      const token: any = await this.getToken();
      const config = {
        headers: {
          Authorization: `Token ${token.val}`,
        },
      };
      const url = this.BASEURL + `${path}/`;
      res = await axios.delete(url, config);
    } catch (e: any) {
      res = e.response;
    }
    return res;
  }
}
