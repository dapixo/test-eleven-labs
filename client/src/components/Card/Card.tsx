import { FC, ReactNode } from "react";
import * as S from "./Card.styles";

type CardProps = {
  title?: string;
  paragraph?: string;
  children?: ReactNode;
};


const Card: FC<CardProps> = ({ title, paragraph, children }) => {
  return (
    <S.CardContainer>
      <S.TitleCard>{title}</S.TitleCard>
      <S.ParagraphCard>{paragraph}</S.ParagraphCard>
      {children}
    </S.CardContainer>
  );
};

export default Card;
