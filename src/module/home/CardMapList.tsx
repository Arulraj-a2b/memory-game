import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

type list = {
  id: number;
  value: string;
  match: boolean;
};
type Props = {
  list: list;
  hanldeChoice: (arg: list) => void;
  showCard: boolean;
  isDisabled: boolean;
};

const styles = StyleSheet.create({
  listStyle: {
    height: 50,
    width: 50,
    borderRadius: 4,
    backgroundColor: "aqua",
    alignItems: "center",
    justifyContent: "center",
  },
  hideStyle: {
    backgroundColor: "red",
    height: 50,
    width: 50,
    borderRadius: 4,
    position: "absolute",
  },
  showCard: {
    backgroundColor: "red",
    height: 50,
    width: 50,
    borderRadius: 4,
    position: "absolute",
    zIndex: -1,
  },
});

const CardMapList = ({ list, hanldeChoice, showCard, isDisabled }: Props) => {
  const cardShowStyle = showCard ? styles.showCard : styles.hideStyle;

  const handleClickCard = () => {
    if (!isDisabled) {
      hanldeChoice(list);
    }
  };
  return (
    <View
      style={{
        position: "relative",
        width: width / 5,
        marginBottom: 8,
      }}
    >
      <TouchableOpacity onPress={handleClickCard}>
        <View>
          <View style={styles.listStyle}>
            <Text>{list.value}</Text>
          </View>
          <View style={cardShowStyle} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardMapList;
