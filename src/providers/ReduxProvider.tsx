import { store } from "@/redux/store";
import { Provider } from "react-redux";
import SessionProvider from "./SessionProvider";
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
}
