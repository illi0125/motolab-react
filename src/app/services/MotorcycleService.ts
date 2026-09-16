import axios from "axios";
import { serverApi } from "../../lib/config";
import type { Motorcycle, MotorcycleInquiry } from "../../lib/types/motorcycle";

class MotorcycleService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getMotorcycles(input: MotorcycleInquiry): Promise<Motorcycle[]> {
    try {
      let url = `${this.path}/motorcycle/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.motorcycleCollection)
        url += `&motorcycleCollection=${input.motorcycleCollection}`;
      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url);
      console.log("getMotorcycles:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getMotorcycles:", err);
      throw err;
    }
  }

  public async getMotorcycle(productId: string): Promise<Motorcycle> {
    try {
      const url = `${this.path}/motorcycle/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("getMotorcycle:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getMotorcycle:", err);
      throw err;
    }
  }
}

export default MotorcycleService;
