import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Button,
  LogBox,
} from "react-native";
import { DarkTheme, NavigationContainer, CommonActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Login from "./screens/Login";
import CreateAccount from "./screens/CreateAccount";
import CreateAppointmentScreen from "./screens/CreateAppointmentScreen";
import HistoryBox from "./screens/History";
import AppointmentsBox from "./screens/FutureAppointments";
import AppointmentDetails from "./screens/AppointmentDetails";

const futureData = [
  { id:1,
    appointmentType:'Physical Exam',
    appointmentDate:' 12/19/2021',
    appointmentTime:'10:20 AM',
    doctor:'MD Dantonio',
    modality:'In Person',
    notes:'Annual Physical',
  },
  { id:2,
    appointmentType:'Perscription Renewall',
    appointmentDate:' 12/12/2021',
    appointmentTime:'3:20 PM',
    doctor:'MD Dantonio',
    modality:'Online',
    notes:'Albuterol refill',
  },
  { id:3,
    appointmentType:'Dental Exam',
    appointmentDate:' 12/23/2021',
    appointmentTime:'08:45 AM',
    doctor:'DDS Zhou',
    modality:'In Person',
    notes:'Pain in molars, explorative exam. Hopefully no root canal',
  },
  { id:4,
    appointmentType:'Physical Exam',
    appointmentDate:' 12/26/2021',
    appointmentTime:'11:45 AM',
    doctor:'MD Jimenz',
    modality:'In Person',
    notes:'Mid year check in, better safe than sorry',
  },
];
//test data
const DATA = [
  { id:1,
    appointmentType:'Eye Exam',
    appointmentDate:' 03/05/2021',
    appointmentTime:'09:00 AM',
    doctor:'OD Hovanesian',
    modality:'In Person',
    notes:'Check in for Sciatica, need to get reference for surgery',
  },
  { id:2,
    appointmentType:'Physical Exam',
    appointmentDate:' 11/06/2021',
    appointmentTime:'10:00 AM',
    doctor:'MD Dantonio',
    modality:'In Person',
    notes:'Check in for Sciatica, need to get reference for surgery',
  },
  { id:3,
    appointmentType:'Physical Therapy',
    appointmentDate:' 10/11/2021',
    appointmentTime:'3:30 PM',
    doctor:'Staff',
    modality:'In Person',
    notes:'Sciatica therapy, first session.',
  },
  { id:4,
    appointmentType:'Physical Exam',
    appointmentDate:' 05/05/2021',
    appointmentTime:'8:30 AM',
    doctor:'MD Dantonio',
    modality:'In Person',
    notes:'Annual Physical, bring up knee problems',
  },
];

function HomeScreen({ navigation }) {
  const [demoList, setdemoList] = useState([...futureData]);
  const [sortType, setSortType] = useState("id");

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        id: "id",
        appointmentDate: "appointmentDate",
        appointmentType: "appointmentType",
      };
      const sortProperty = types[type];
      const sorted = [...futureData].sort(
        (a, b) => a[sortProperty] > b[sortProperty] ? 1 : -1
      );
      setdemoList(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  const changeSortType = (value) => setSortType(value);

  return (
    <View style={styles.appointmentContainer}>
      <FlatList
        data={demoList}
        renderItem={({item})=>(
          <AppointmentsBox>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Appointment Details', {
                item: item,
              });
            }}>
            <Text style={styles.text}>{item.appointmentType}</Text>
            <Text style={styles.text}>{item.appointmentDate}</Text>
            <Text style={styles.text}>{item.appointmentTime}</Text>
            <Text style={styles.text}>{item.doctor}</Text>
            <Text style={styles.text}>Modality: {item.modality}</Text>
            </TouchableOpacity>
          </AppointmentsBox>
        )}
        keyExtractor={(item) => item.id} //id for props
        extraData={sortType}
      />
      <View style={styles.filterContainer}>
        <View style={{flex: 1, paddingLeft: 10}}>
          <Button
            title={"date"}
            color="#ec5990"
            onPress={() => {
              changeSortType("appointmentDate");
            }}
          />
        </View>
        <View style={{flex: 1, paddingLeft: 10}}>
          <Button
            title={"id"}
            color="#ec5990"
            onPress={() => {
              changeSortType("id");
            }}
          />
        </View>
        <View style={{flex: 1, paddingLeft: 10}}>
          <Button
            title={"abc"}
            color="#ec5990"
            onPress={() => {
              changeSortType("appointmentType");
            }}
          />
        </View>
      </View>
    </View>
  );
}

//flatlist need list with item and id
function HistoryScreen({ navigation }) {
  const [demoList, setdemoList] = useState([...DATA]);
  const [sortType, setSortType] = useState("id");

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        id: "id",
        appointmentDate: "appointmentDate",
        appointmentType: "appointmentType",
      };
      const sortProperty = types[type];
      const sorted = [...DATA].sort((a, b) =>
        a[sortProperty] > b[sortProperty] ? 1 : -1
      );
      setdemoList(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  const changeSortType = (value) => setSortType(value);

  return (
    <View style={styles.appointmentContainer}>
      <FlatList
        data={demoList}
        renderItem={({ item }) => (
          <HistoryBox>
             <TouchableOpacity onPress={() => {
              navigation.navigate('Appointment Details', {
                item: item,
              });
            }}>
            <Text style={styles.text}>{item.appointmentType}</Text>
            <Text style={styles.text}>{item.appointmentDate}</Text>
            <Text style={styles.text}>{item.appointmentTime}</Text>
            <Text style={styles.text}>{item.doctor}</Text>
            <Text style={styles.text}>Modality: {item.modality}</Text>
            </TouchableOpacity>
          </HistoryBox>
        )}
        keyExtractor={(item) => item.id} //id for props
        extraData={sortType}
      />
      <View style={styles.filterContainer}>
        <View style={{flex: 1, paddingLeft: 10}}>
          <Button
            title={"date"}
            color="#ec5990"
            onPress={() => {
              changeSortType("appointmentDate");
            }}
          />
        </View>
        <View style={{flex: 1, paddingLeft: 10}}>
          <Button
            title={"id"}
            color="#ec5990"
            onPress={() => {
              changeSortType("id");
            }}
          />
        </View>
        <View style={{flex: 1, paddingLeft: 10}}>
          <Button
            title={"abc"}
            color="#ec5990"
            onPress={() => {
              changeSortType("appointmentType");
            }}
          />
        </View>
      </View>
    </View>
  );
}

function TabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#E91E63",
      }}
    >
      <Tab.Screen
        name="Create Appointment"
        component={CreateAppointmentScreen}
        options={{
          tabBarLabel: "Create Appointment",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-clock"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Create Account" component={CreateAccount} />
        <Stack.Screen
          name="Tab Screen"
          component={TabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Appointment Details" component={AppointmentDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0e101c",
  },
  appointmentContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#0e101c",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
