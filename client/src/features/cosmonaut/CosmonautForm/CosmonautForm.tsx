import { Cosmonaut } from "../../../model/cosmonaut.model";

type cosmonautPayload = Omit<Cosmonaut, "id" | "namespace" | "inSpace">;

export default function ComponentForm({ handleAdd }: any) {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      firstname: { value: string };
      lastname: { value: string };
      craft: { value: string };
    };
    const createNewCosmonaut: cosmonautPayload = {
      firstname: target.firstname.value,
      lastname: target.lastname.value,
      craft: target.craft.value,
    };
    handleAdd(createNewCosmonaut);
    const resetForm = e.target as HTMLFormElement;
    resetForm.reset();
  };

  return (
    <form action="submit" method="post" onSubmit={handleSubmit}>
      <input type="text" name="firstname" placeholder="Prénom" required />
      <input type="text" name="lastname" placeholder="Nom" required />
      <input type="text" name="craft" placeholder="Mission" required />
      <button>Ajouter</button>
    </form>
  );
}
