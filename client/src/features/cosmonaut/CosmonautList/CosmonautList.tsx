import { FC, useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import { Cosmonaut } from "../../../model/cosmonaut.model";
import Button from "../../../components/Button/Button";
import {
  deleteCosmonaut,
  fetchCosmonautData,
  patchCosmonaut,
  postCosmonaut,
} from "../../../request/cosmonaut.request";
import ComponentForm from "../CosmonautForm/CosmonautForm";
import * as S from "./CosmonautList.styles";



const CosmonautList: FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cosmonautData, setCosmonautData] = useState<Cosmonaut[]>([]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const data = await fetchCosmonautData();
        setCosmonautData(data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id: string | number) => {
    await deleteCosmonaut(id);
    const filteredCosmonauts = cosmonautData.filter((c) => c.id !== id);
    setCosmonautData(filteredCosmonauts);
  };

  const handlePosition = async (id: string | number, inSpace: boolean) => {
    const updatedCosmonaut = await patchCosmonaut(id, inSpace);
    const newCosmonautData = cosmonautData.map((c) => {
      if (c.id === updatedCosmonaut.id) {
        return updatedCosmonaut;
      } else {
        return c;
      }
    });
    setCosmonautData(newCosmonautData);
  };

  const handleAdd = async (
    newCosmonaut: Omit<Cosmonaut, "id" | "namespace" | "inSpace">
  ) => {
    const createdCosmonaut = await postCosmonaut(newCosmonaut);
    const cosmonautDataCopy = [...cosmonautData];
    cosmonautDataCopy.unshift(createdCosmonaut);
    setCosmonautData(cosmonautDataCopy);
  };

  if (error) {
    return <p>Oups, il y a une erreur</p>;
  } else if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <S.UlElt>
        <S.LiElt key={"dfddvfvd"}>
          <Card title={"Ajouter un cosmonaute"}>
            <ComponentForm handleAdd={handleAdd} />
          </Card>
        </S.LiElt>
        {cosmonautData.map((cosmo: Cosmonaut) => (
          <S.LiElt key={cosmo.namespace}>
            <Card
              title={`${cosmo.firstname} ${cosmo.lastname}`}
              paragraph={`Mission : ${cosmo.craft}`}
            >
              <S.BtnContainer>
                <Button
                  text={
                    cosmo.inSpace
                      ? "Retour à la maison"
                      : "Envoyer dans l'espace"
                  }
                  onClick={() => handlePosition(cosmo.id, cosmo.inSpace)}
                  theme={cosmo.inSpace ? "classic" : "success"}
                ></Button>
                <Button
                  text={"L'heure de la retraite"}
                  theme="danger"
                  onClick={() => handleDelete(cosmo.id)}
                ></Button>
              </S.BtnContainer>
            </Card>
          </S.LiElt>
        ))}
      </S.UlElt>
    );
  }
}

export default CosmonautList;