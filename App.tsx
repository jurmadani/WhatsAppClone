import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigator/StackNavigator";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </ApplicationProvider>
      </PaperProvider>
    </Provider>
  );
}
