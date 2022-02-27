import { useEffect, useState } from "react";
import styledNative from "styled-components/native";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { cardList } from "./mock";
import CardMapList from "./CardMapList";

type cardList = {
  id: number;
  value: string;
  match: boolean;
};

const CardGrid = styledNative.View`
display:grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-gap: 8px;
width: fit-content;
`;

const styles = StyleSheet.create({
  flexStyle: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    top: 40,
  },
  btnStyle: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#05C2CF",
    borderRadius: 4,
    width: "fit-content",
  },
  btnTextStyle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  matchTextStyle: {
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 14,
  },
  trunTextStyle: {
    marginRight: 16,
    fontWeight: "bold",
    fontSize: 14,
  },
  centerAlign: {
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
  restartBtn: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 40,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    // marginTop: 40,
  },
});

const CardContainer = () => {
  const [isStart, setStart] = useState(false);
  const [isCard, setCard] = useState<cardList[]>([]);
  const [isTurn, setTurn] = useState(0);
  const [isChoice, setChoice] = useState<cardList | any>(null);
  const [isChoiceOne, setChoiceOne] = useState<cardList | any>(null);
  const [isDisabled, setDisabeld] = useState(false);
  const [isMatchCount, setMatchCount] = useState(0);

  const shuffleCard = () => {
    const shuffleCard = [...cardList, ...cardList]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCard(shuffleCard);
    setChoice(null);
    setChoiceOne(null);
    setTurn(0);
    setMatchCount(0);
  };

  const hanldeChoice = (card: cardList) => {
    isChoice ? setChoiceOne(card) : setChoice(card);
  };

  const handleReset = () => {
    setChoice(null);
    setChoiceOne(null);
    setTurn((pre) => pre + 1);
    setDisabeld(false);
  };

  useEffect(() => {
    if (isChoice && isChoiceOne) {
      setDisabeld(true);
      if (isChoice.value === isChoiceOne.value) {
        setMatchCount((pre) => pre + 1);
        setCard((preCard: any) => {
          return preCard.map((cardList: any) => {
            if (cardList.value === isChoice.value) {
              return { ...cardList, match: true };
            } else {
              return cardList;
            }
          });
        });
        handleReset();
      } else {
        setTimeout(() => {
          handleReset();
        }, 500);
      }
    }
  }, [isChoice, isChoiceOne]);

  useEffect(() => {
    shuffleCard();
  }, []);

  const handleStartGame = () => {
    setStart(true);
  };

  return (
    <View style={{ height: "100%", padding: 20 }}>
      <Text style={styles.textStyle}>Memory Game</Text>
      {isStart && (
        <View style={styles.flexStyle}>
          <Text style={styles.trunTextStyle}>Number of Attempts: {isTurn}</Text>
          <Text style={styles.matchTextStyle}>Match Count: {isMatchCount}</Text>
        </View>
      )}
      {!isStart && (
        <View style={styles.centerAlign}>
          <TouchableOpacity style={styles.btnStyle} onPress={handleStartGame}>
            <Text style={styles.btnTextStyle}>Start Game</Text>
          </TouchableOpacity>
        </View>
      )}

      {isStart && (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <CardGrid>
            {isCard.map((list) => (
              <CardMapList
                key={list.id}
                list={list}
                hanldeChoice={hanldeChoice}
                showCard={
                  list === isChoice || list === isChoiceOne || list.match
                }
                isDisabled={isDisabled}
              />
            ))}
          </CardGrid>

          <View style={styles.restartBtn}>
            <TouchableOpacity style={styles.btnStyle} onPress={shuffleCard}>
              <Text style={styles.btnTextStyle}>Restart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CardContainer;
