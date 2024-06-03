import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Icons
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Styles
import styles from "./styles";

// Utils
import { formatDate } from "../../utils/utils";

export default function ActivityCard({ activity }) {
  const [showComment, setShowComment] = useState(false);

  const handleCommentSwitch = () => {
    setShowComment(!showComment);
  };

  return (
    <View style={styles.container_one}>
      <View style={styles.container_two}>
        <Text style={styles.text_one}>Expense Added</Text>
        <View style={styles.container_three}>
          <TouchableOpacity onPress={handleCommentSwitch}>
            {showComment ? (
              <MaterialIcons name="details" size={18} color="#00A9FF" />
            ) : (
              <MaterialCommunityIcons
                name="details"
                size={18}
                color="#00A9FF"
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign
              name="delete"
              size={15}
              color="#FC819E"
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.text_two}>
        Added {activity.expense_amount} &#165; to {activity.expense_reason}
      </Text>
      {showComment &&
        (activity.expense_comment ? (
          <Text style={styles.text_two}>{activity.expense_comment}</Text>
        ) : (
          <Text style={styles.text_two}>No comment</Text>
        ))}
      <Text style={styles.text_three}>{formatDate(activity.expense_date)}</Text>
    </View>
  );
}
