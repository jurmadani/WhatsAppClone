import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigator/StackNavigator";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { LogBox } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import CustomToastNotification from "./src/controllers/CustomToastNotification";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <ToastProvider
              duration={2500}
              renderToast={(toastOptions) => (
                <CustomToastNotification toast={toastOptions} />
              )}
              offsetTop={40}
            >
              <StackNavigator />
            </ToastProvider>
          </NavigationContainer>
        </ApplicationProvider>
      </PaperProvider>
    </Provider>
  );
}
