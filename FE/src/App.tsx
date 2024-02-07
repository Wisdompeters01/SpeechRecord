import { useState } from "react";
import pix from "./Assets/775118.jpg";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router/Router";
import { Provider } from "react-redux";
import { store } from "./global/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function App() {
  let persistor = persistStore(store);
  return (
    <>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <RouterProvider router={Router} />
        </Provider>
      </PersistGate>
    </>
  );
}

export default App;
