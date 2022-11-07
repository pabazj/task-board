import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import App from "./App";

configure({ adapter: new Adapter() });

describe("App", () => {
 it("renders correctly", () => {
   shallow(<App />);
 });
});

// describe('addList', ()=>{
//   test('should add tasks to the list', () => {
//      const startTodos = [        
//         { id: 1, title: 'one', taskList: []},        
//         { id: 2, title: 'two', taskList: []}
//      ]     
     
//      const newTodo = { id: 3, title: 'test', taskList: []} 
//      const expected =[
//         { id: 3, title: 'test', taskList: []},        
//         { id: 1, title: 'one', taskList: []},        
//         { id: 2, title: 'two', taskList: []}
//      ]
//      const result = addList(newTodo)
//      expect(result).toEqual(expected)
//   })
// })
