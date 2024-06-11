import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WaitingScreen from "../Src/screens/WaitingScreen/WaitingScreen";
import ScreenNames from "../Src/screens/ScreenNames";
import WelcomeScreen from "../Src/screens/WelcomeScreen/WelcomeScreen";
import SignUpScreen from "../Src/screens/SignUp/SignUpScreen";
import ForgotPasswordScreen from "../Src/screens/LogIn/ForgotPasswordScreen";
import AppointmentRegistration from "../Src/Components/AppointmentRegistration";
import ChangePassword from "../Src/screens/LogIn/ChangePassword";
import NewPassword from "../Src/screens/LogIn/NewPassword";
import Confirm from "../Src/screens/LogIn/Confirm";
import SelectBtn from "../Src/screens/Home/SelectBtn";
import TestCar from "../Src/screens/TEZT/TestCar";
import InformationTest from "../Src/screens/TEZT/InformationTest";
import PaymentCard from "../Src/screens/Payment/PaymentCard";
import CardInformation from "../Src/screens/Payment/CardInformation";
import CarWash from "../Src/screens/CarWash/CarWash";
import InformationCarWash from "../Src/screens/CarWash/InformationCarWash";
import DiscountWash from "../Src/screens/CarWash/DiscountWash";
import DiscountTest from "../Src/screens/TEZT/DiscountTest";
import CustomDropDownPicker from "../Src/Components/CustomDropDownPicker";
import InformationReception from "../Src/screens/Payment/InformationReception";



const MainNavigation = () => {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}
                initialRouteName={ScreenNames.WaitingScreen} >
                <Stack.Screen name={ScreenNames.WaitingScreen} component={WaitingScreen} />
                <Stack.Screen name={ScreenNames.SignUpScreen} component={SignUpScreen} />
                <Stack.Screen name={ScreenNames.ForgotPasswordScreen} component={ForgotPasswordScreen} />
                <Stack.Screen name={ScreenNames.WelcomeScreen} component={WelcomeScreen} />
                <Stack.Screen name={ScreenNames.ChangePassword} component={ChangePassword} />
                <Stack.Screen name={ScreenNames.NewPassword} component={NewPassword} />
                <Stack.Screen name={ScreenNames.Confirm} component={Confirm} />
                <Stack.Screen name={ScreenNames.AppointmentRegistration} component={AppointmentRegistration} />
                <Stack.Screen name={ScreenNames.SelectBtn} component={SelectBtn} />
                <Stack.Screen name={ScreenNames.TestCar} component={TestCar} />
                <Stack.Screen name={ScreenNames.InformationTest} component={InformationTest} />
                <Stack.Screen name={ScreenNames.PaymentCard} component={PaymentCard} />
                <Stack.Screen name={ScreenNames.CardInformation} component={CardInformation} />
                <Stack.Screen name={ScreenNames.CarWash} component={CarWash} />
                <Stack.Screen name={ScreenNames.InformationCarWash} component={InformationCarWash} />
                <Stack.Screen name={ScreenNames.DiscountWash} component={DiscountWash} />
                <Stack.Screen name={ScreenNames.DiscountTest} component={DiscountTest} />
                <Stack.Screen name={ScreenNames.CustomDropDownPicker} component={CustomDropDownPicker} />
                <Stack.Screen name={ScreenNames.InformationReception} component={InformationReception} />

                {/* <Stack.Screen name="CardInformation" component={CardInformation} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default MainNavigation;
