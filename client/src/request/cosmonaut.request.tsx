import { Cosmonaut } from "../model/cosmonaut.model";

const apiUrl = "http://localhost:3000/cosmonauts";

export const fetchCosmonautData = async (): Promise<Cosmonaut[]> => {
  const response = await fetch(`${apiUrl}`);
  return await response.json();
};

export const deleteCosmonaut = async (id: string | number) => {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
};

export const patchCosmonaut = async (
  id: string | number,
  body: boolean
): Promise<Cosmonaut> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      inSpace: !body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
};

export const postCosmonaut = async (
  body: Omit<Cosmonaut, "id" | "namespace" | "inSpace">
): Promise<Cosmonaut> => {
  const response = await fetch(`${apiUrl}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  return json;
};
