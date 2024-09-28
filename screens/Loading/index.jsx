import { View, Image, ActivityIndicator } from "react-native";

import styles from "./styles";

const LoadingScreen = () => {
    return(
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                <Image source={require("../../assets/icon.png")} style={styles.image}/>
                <ActivityIndicator color="blue" size={24}/>
            </View>
        </View>
    );
}

export default LoadingScreen;