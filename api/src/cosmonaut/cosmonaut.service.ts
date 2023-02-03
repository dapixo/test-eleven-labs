import { cosmonaut } from "~/data";
import { BadRequestException, NotFoundException } from "~/utils";
import { CosmonautType } from "~~/model/ cosmonaut";

export class CosmonautService {
  cosmonauts: CosmonautType[] = cosmonaut;

  findAll(): CosmonautType[] {
    return this.cosmonauts;
  }

  findOne(id: number) {
    if (!Number.isInteger(id)) {
      throw new BadRequestException("invalid ID");
    }

    const cosmonaut = this.cosmonauts.find((cosmonaut) => cosmonaut.id === id);

    if (!cosmonaut) {
      throw new NotFoundException("not found cosmonaut");
    }
    return cosmonaut;
  }

  create(cosmonautData: Partial<CosmonautType>) {
    if (
      cosmonautData.firstname &&
      cosmonautData.firstname !== undefined &&
      cosmonautData.lastname &&
      cosmonautData.lastname !== undefined &&
      cosmonautData.craft &&
      cosmonautData.craft !== undefined
    ) {
      const newCosmonaut: CosmonautType = {
        id: new Date().getTime(),
        firstname: cosmonautData.firstname,
        lastname: cosmonautData.lastname,
        namespace: cosmonautData.firstname
          .toLowerCase()
          .concat(cosmonautData.lastname.toLowerCase()),
        craft: cosmonautData.craft,
        inSpace: false,
      };
      this.cosmonauts.unshift(newCosmonaut);
      return newCosmonaut;
    } else {
      throw new BadRequestException("invalid data");
    }
  }

  update(cosmonautData: Partial<CosmonautType>, id: number) {
    if (!Number.isInteger(id)) {
      throw new BadRequestException("invalid ID");
    }

    const keys = Object.keys(cosmonautData);
    const cosmonautToUpdate = this.findOne(id);
    for (const k of keys) {
      if (k in cosmonautToUpdate === false) {
        throw new BadRequestException("invalid argument");
      }
    }

    const index = this.cosmonauts.findIndex((cosmonaut) => cosmonaut.id === id);
    if (index === -1) {
      throw new NotFoundException("not found cosmonaut");
    }

    this.cosmonauts[index] = { ...this.cosmonauts[index], ...cosmonautData };
    return this.cosmonauts[index];
  }

  delete(id: number) {
    if (!Number.isInteger(id)) {
      throw new BadRequestException("invalid ID");
    }
    const cosmonaut = this.findOne(id);

    if (!cosmonaut) {
      throw new NotFoundException("not found cosmonaut");
    }
    this.cosmonauts = this.cosmonauts.filter(
      (cosmonaut) => cosmonaut.id !== id
    );
  }
}
