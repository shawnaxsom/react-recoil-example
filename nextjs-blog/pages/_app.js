import React from "react";
import { RecoilRoot } from 'recoil';

import { CharacterCounter } from "../components/character-counter";
import { TodoList } from "../components/todo-list";

export default function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />

      <br />
      <hr />
      <br />
      
      <TodoList />
    </RecoilRoot>
  );
}

// export default function App({ Component, pageProps }) {
//   const store = useStore(pageProps.initialReduxState)

//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   )
// }
